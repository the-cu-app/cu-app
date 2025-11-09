// Supabase Edge Function: Purpose Registry
// Apple-style purpose-based activation system
// Only loads PII/activates features when there's a declared purpose

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PurposeRequest {
  feature: string
  action: string
  member_id?: string
  requested_pii?: string[]
  context?: Record<string, any>
}

interface PurposeDefinition {
  feature: string
  action: string
  purpose: string
  required_pii: string[]
  optional_pii: string[]
  behavior_formation?: {
    pattern_count: number
    time_window: number // in hours
  }
  plaid_enabled: boolean
  stripe_enabled: boolean
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const purposeRequest: PurposeRequest = await req.json()

    // Check if purpose exists for this feature/action
    const { data: purposeDef, error: purposeError } = await supabaseClient
      .from('purpose_registry')
      .select('*')
      .eq('feature', purposeRequest.feature)
      .eq('action', purposeRequest.action)
      .single()

    if (purposeError || !purposeDef) {
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'NO_PURPOSE_DEFINED',
          message: 'Feature cannot activate without declared purpose'
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check Plaid requirement
    if (purposeDef.plaid_enabled && purposeRequest.member_id) {
      const { data: plaidAccount, error: plaidError } = await supabaseClient
        .from('plaid_accounts')
        .select('id, verification_status')
        .eq('member_id', purposeRequest.member_id)
        .eq('verification_status', 'verified')
        .limit(1)
        .single()

      if (plaidError || !plaidAccount) {
        // Plaid account not verified - trap the event
        await supabaseClient.from('trapped_events').insert({
          feature: purposeRequest.feature,
          action: purposeRequest.action,
          member_id: purposeRequest.member_id,
          event_type: 'plaid_required',
          context: purposeRequest.context,
          created_at: new Date().toISOString()
        })

        return new Response(
          JSON.stringify({ 
            allowed: false, 
            reason: 'PLAID_REQUIRED',
            message: 'Plaid account linking required for this feature'
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Check Stripe requirement
    if (purposeDef.stripe_enabled && purposeRequest.member_id) {
      const { data: stripePaymentMethod, error: stripeError } = await supabaseClient
        .from('stripe_payment_methods')
        .select('id, verification_status')
        .eq('member_id', purposeRequest.member_id)
        .eq('verification_status', 'verified')
        .limit(1)
        .single()

      if (stripeError || !stripePaymentMethod) {
        // Stripe payment method not verified - trap the event
        await supabaseClient.from('trapped_events').insert({
          feature: purposeRequest.feature,
          action: purposeRequest.action,
          member_id: purposeRequest.member_id,
          event_type: 'stripe_required',
          context: purposeRequest.context,
          created_at: new Date().toISOString()
        })

        return new Response(
          JSON.stringify({ 
            allowed: false, 
            reason: 'STRIPE_REQUIRED',
            message: 'Stripe payment method required for this feature'
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Validate requested PII against purpose
    const requestedPII = purposeRequest.requested_pii || []
    const requiredPII = purposeDef.required_pii || []
    const optionalPII = purposeDef.optional_pii || []
    const allowedPII = [...requiredPII, ...optionalPII]

    const unauthorizedPII = requestedPII.filter(pii => !allowedPII.includes(pii))
    
    if (unauthorizedPII.length > 0) {
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'UNAUTHORIZED_PII',
          unauthorized_pii: unauthorizedPII,
          message: 'Requested PII not authorized for this purpose'
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check behavior formation (repeated patterns)
    if (purposeDef.behavior_formation && purposeRequest.member_id) {
      const { data: behaviorData } = await supabaseClient
        .from('behavior_patterns')
        .select('pattern_count, first_occurrence, last_occurrence')
        .eq('feature', purposeRequest.feature)
        .eq('action', purposeRequest.action)
        .eq('member_id', purposeRequest.member_id)
        .single()

      const timeWindow = purposeDef.behavior_formation.time_window || 24
      const patternCount = behaviorData?.pattern_count || 0
      const lastOccurrence = behaviorData?.last_occurrence 
        ? new Date(behaviorData.last_occurrence)
        : null

      const now = new Date()
      const withinWindow = lastOccurrence 
        ? (now.getTime() - lastOccurrence.getTime()) / (1000 * 60 * 60) < timeWindow
        : false

      if (withinWindow) {
        // Update behavior pattern
        await supabaseClient.from('behavior_patterns').upsert({
          feature: purposeRequest.feature,
          action: purposeRequest.action,
          member_id: purposeRequest.member_id,
          pattern_count: patternCount + 1,
          first_occurrence: behaviorData?.first_occurrence || new Date().toISOString(),
          last_occurrence: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'feature,action,member_id'
        })

        // Behavior formed - allow activation
        if (patternCount + 1 >= purposeDef.behavior_formation.pattern_count) {
          await supabaseClient.from('formed_behaviors').upsert({
            feature: purposeRequest.feature,
            action: purposeRequest.action,
            member_id: purposeRequest.member_id,
            behavior_formed: true,
            formed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'feature,action,member_id'
          })
        }
      } else {
        // Reset pattern (outside time window)
        await supabaseClient.from('behavior_patterns').upsert({
          feature: purposeRequest.feature,
          action: purposeRequest.action,
          member_id: purposeRequest.member_id,
          pattern_count: 1,
          first_occurrence: new Date().toISOString(),
          last_occurrence: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'feature,action,member_id'
        })
      }
    }

    // Purpose validated - allow activation
    return new Response(
      JSON.stringify({ 
        allowed: true,
        purpose: purposeDef.purpose,
        authorized_pii: [...requiredPII, ...optionalPII.filter(pii => requestedPII.includes(pii))],
        plaid_verified: purposeDef.plaid_enabled,
        stripe_verified: purposeDef.stripe_enabled,
        behavior_formed: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Purpose registry error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

