// Supabase Edge Function: Account Transfer Service
// Called by Flutter app - proxies to Next.js API
// This is the "bridge" between Flutter and Next.js

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Next.js API endpoint (the other "building")
const NEXTJS_API_URL = Deno.env.get('NEXTJS_API_URL') || 'https://your-nextjs-app.vercel.app/api'

interface TransferRequest {
  member_id: string
  from_account_id: string
  to_account_id: string
  amount: number
  transfer_type: 'single' | 'recurring' | 'automatic_payment'
  effective_date?: string
  frequency?: string
  expiration_date?: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get auth token from request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify user session
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

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request
    const transferRequest: TransferRequest = await req.json()

    // Validate request
    if (!transferRequest.member_id || !transferRequest.from_account_id || !transferRequest.to_account_id || !transferRequest.amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log the transfer request (trapping the event)
    await supabaseClient.from('transfer_requests').insert({
      user_id: user.id,
      member_id: transferRequest.member_id,
      from_account_id: transferRequest.from_account_id,
      to_account_id: transferRequest.to_account_id,
      amount: transferRequest.amount,
      transfer_type: transferRequest.transfer_type,
      status: 'pending',
      created_at: new Date().toISOString()
    }).catch(err => {
      console.warn('Failed to log transfer request:', err)
      // Don't fail if logging fails
    })

    // Forward to Next.js API (the other building)
    const nextjsResponse = await fetch(`${NEXTJS_API_URL}/account-maintenance/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('NEXTJS_API_KEY') || ''}`,
        'X-User-Id': user.id,
        'X-Member-Id': transferRequest.member_id
      },
      body: JSON.stringify(transferRequest)
    })

    const result = await nextjsResponse.json()

    // Log the response (trapping the result)
    if (nextjsResponse.ok) {
      await supabaseClient.from('transfer_requests')
        .update({ 
          status: 'completed',
          response_data: result,
          completed_at: new Date().toISOString()
        })
        .eq('member_id', transferRequest.member_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .catch(err => console.warn('Failed to update transfer log:', err))
    } else {
      // Trap the error
      await supabaseClient.from('transfer_errors').insert({
        user_id: user.id,
        member_id: transferRequest.member_id,
        error_type: 'transfer_failed',
        error_message: result.error || 'Unknown error',
        request_data: transferRequest,
        response_data: result,
        created_at: new Date().toISOString()
      }).catch(err => console.warn('Failed to log error:', err))
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: nextjsResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Transfer function error:', error)
    
    // Trap the exception
    try {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )
      
      await supabaseClient.from('transfer_errors').insert({
        error_type: 'function_exception',
        error_message: error.message,
        stack_trace: error.stack,
        created_at: new Date().toISOString()
      })
    } catch (logError) {
      console.error('Failed to log exception:', logError)
    }

    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})



