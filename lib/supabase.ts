import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://svaiikywglmwedraxyda.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWlpa3l3Z2xtd2VkcmF4eWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMDU1ODAsImV4cCI6MjA0NTc4MTU4MH0.pPZ8jQwcGKCH7aXluUdYp9Rg5gMc83CULzs2j8JDy2U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For client components
export function createSupabaseClient() {
  return createClientComponentClient()
}

// Auth helpers
export async function signUp(email: string, password: string, id_document_front: string, id_document_back: string) {
  // First, create the user account via verify-auth (without ID document)
  const authResponse = await fetch(`${supabaseUrl}/functions/v1/verify-auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      email,
      password,
      action: 'signup',
      cu_id: email.split('@')[0],
      // Don't send id_document here - we'll use verify-id separately
    })
  })

  const authData = await authResponse.json()

  if (!authData.success || authData.error) {
    return authData
  }

  // Then, verify the ID using the verify-id edge function with front and back
  const verifyResponse = await fetch(`${supabaseUrl}/functions/v1/verify-id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      id_document_front,
      id_document_back,
      user_id: authData.user?.id
    })
  })

  const verifyData = await verifyResponse.json()

  // Return combined result
  return {
    success: authData.success,
    user: authData.user,
    id_verified: verifyData.verified || verifyData.success || false,
    verification_result: verifyData,
    message: verifyData.verified || verifyData.success 
      ? 'Account created and ID verified' 
      : 'Account created. ID verification pending.'
  }
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${supabaseUrl}/functions/v1/verify-auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      email,
      password,
      action: 'login'
    })
  })

  return await response.json()
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function checkPlanAccess(adapter_id?: string) {
  const session = await getSession()
  if (!session) return { hasAccess: false, plan_type: null }

  const response = await fetch(`${supabaseUrl}/functions/v1/verify-auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify({
      action: 'check-plan'
    })
  })

  const data = await response.json()

  if (adapter_id) {
    const hasAccess =
      data.has_perpetual ||
      data.adapters_purchased?.includes(adapter_id) ||
      data.adapters_enabled?.includes(adapter_id)

    return { ...data, hasAccess }
  }

  return data
}
