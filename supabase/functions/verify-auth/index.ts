// Supabase Edge Function: Verify Authentication & ID Check
// Deploy: supabase functions deploy verify-auth

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerifyAuthRequest {
  email: string
  password?: string
  action: 'signup' | 'login' | 'verify' | 'check-plan'
  id_document?: string // Base64 encoded ID for verification
  cu_id?: string
}

serve(async (req) => {
  // Handle CORS
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

    const { email, password, action, id_document, cu_id }: VerifyAuthRequest = await req.json()

    // SIGNUP: Create account + verify ID
    if (action === 'signup') {
      if (!password || !id_document) {
        return new Response(
          JSON.stringify({ error: 'Password and ID document required for signup' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // 1. Create Supabase Auth user
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          id_verified: false,
          id_verification_pending: true
        }
      })

      if (authError) {
        return new Response(
          JSON.stringify({ error: authError.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // 2. Verify ID document (mock - in production use real ID verification service)
      const idVerified = await verifyIDDocument(id_document)

      // 3. Update user metadata
      await supabaseClient.auth.admin.updateUserById(authData.user.id, {
        user_metadata: {
          id_verified: idVerified,
          id_verification_date: new Date().toISOString()
        }
      })

      // 4. Create user record in cu_themes or users table
      if (cu_id) {
        await supabaseClient.from('cu_themes').insert({
          cu_id: cu_id,
          cu_name: email.split('@')[0],
          plan_type: 'free',
          created_at: new Date().toISOString()
        })
      }

      return new Response(
        JSON.stringify({
          success: true,
          user: authData.user,
          id_verified: idVerified,
          message: idVerified ? 'Account created and ID verified' : 'Account created. ID verification pending.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // LOGIN: Authenticate + check ID status
    if (action === 'login') {
      if (!password) {
        return new Response(
          JSON.stringify({ error: 'Password required for login' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Authenticate user
      const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        return new Response(
          JSON.stringify({ error: authError.message }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Get user's plan and adapters
      const { data: cuTheme } = await supabaseClient
        .from('cu_themes')
        .select('*')
        .eq('cu_id', authData.user.email.split('@')[0])
        .single()

      return new Response(
        JSON.stringify({
          success: true,
          user: authData.user,
          session: authData.session,
          cu_theme: cuTheme,
          id_verified: authData.user.user_metadata?.id_verified ?? false
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // VERIFY: Re-verify ID document
    if (action === 'verify') {
      if (!id_document) {
        return new Response(
          JSON.stringify({ error: 'ID document required for verification' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const authHeader = req.headers.get('Authorization')!
      const token = authHeader.replace('Bearer ', '')

      const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

      if (userError || !user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Verify ID
      const idVerified = await verifyIDDocument(id_document)

      // Update user
      await supabaseClient.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          id_verified: idVerified,
          id_verification_date: new Date().toISOString()
        }
      })

      return new Response(
        JSON.stringify({
          success: true,
          id_verified: idVerified,
          message: idVerified ? 'ID verified successfully' : 'ID verification failed'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // CHECK-PLAN: Check user's plan and adapter access
    if (action === 'check-plan') {
      const authHeader = req.headers.get('Authorization')!
      const token = authHeader.replace('Bearer ', '')

      const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

      if (userError || !user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Get user's CU theme
      const { data: cuTheme } = await supabaseClient
        .from('cu_themes')
        .select('*')
        .eq('cu_id', user.email.split('@')[0])
        .single()

      return new Response(
        JSON.stringify({
          success: true,
          plan_type: cuTheme?.plan_type ?? 'free',
          adapters_purchased: cuTheme?.adapters_purchased ?? [],
          adapters_enabled: cuTheme?.adapters_enabled ?? [],
          has_perpetual: cuTheme?.plan_type === 'perpetual'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Mock ID verification (replace with real service like Persona, Onfido, etc.)
async function verifyIDDocument(base64Document: string): Promise<boolean> {
  // In production, integrate with:
  // - Persona.com
  // - Onfido
  // - Stripe Identity
  // - Jumio
  // - Trulioo

  // For demo: simple validation
  if (!base64Document || base64Document.length < 100) {
    return false
  }

  // Mock: Check if valid base64 image
  const isValidBase64 = /^data:image\/(png|jpeg|jpg);base64,/.test(base64Document)

  // Mock verification delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // In production: call actual ID verification API
  return isValidBase64
}
