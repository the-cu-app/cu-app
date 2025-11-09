// Purpose System Client Library
// Wrapper for purpose-based activation in Next.js
// Ensures features only activate when purpose is declared

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://svaiikywglmwedraxyda.supabase.co';

export interface PurposeRequest {
  feature: string;
  action: string;
  member_id?: string;
  requested_pii?: string[];
  context?: Record<string, any>;
}

export interface PurposeValidationResult {
  allowed: boolean;
  purpose?: string;
  authorized_pii?: string[];
  plaid_verified?: boolean;
  stripe_verified?: boolean;
  behavior_formed?: boolean;
  reason?: string;
  message?: string;
}

/**
 * Validate purpose before activating feature or loading PII
 * This is the "gatekeeper" that enforces Apple-style purpose-based activation
 */
export async function validatePurpose(
  request: PurposeRequest
): Promise<PurposeValidationResult> {
  try {
    const response = await fetch('/api/purpose/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Purpose validation error:', error);
    return {
      allowed: false,
      reason: 'VALIDATION_ERROR',
      message: error.message
    };
  }
}

/**
 * Register a new purpose (admin function)
 * Like Apple's Privacy Manifest - declares why a feature needs PII
 */
export async function registerPurpose(
  feature: string,
  action: string,
  purpose: string,
  requiredPII: string[] = [],
  optionalPII: string[] = [],
  behaviorFormation?: { patternCount: number; timeWindow: number },
  plaidEnabled: boolean = false,
  stripeEnabled: boolean = false
) {
  try {
    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '');
    
    const { data, error } = await supabase
      .from('purpose_registry')
      .upsert({
        feature,
        action,
        purpose,
        required_pii: requiredPII,
        optional_pii: optionalPII,
        behavior_formation: behaviorFormation,
        plaid_enabled: plaidEnabled,
        stripe_enabled: stripeEnabled,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'feature,action'
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Purpose registration error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get trapped events (the "bugs" we've caught)
 * These are events that tried to activate without purpose, Plaid, or Stripe verification
 */
export async function getTrappedEvents(
  feature?: string,
  memberId?: string,
  limit: number = 100
) {
  try {
    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '');
    
    let query = supabase
      .from('trapped_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (feature) {
      query = query.eq('feature', feature);
    }
    if (memberId) {
      query = query.eq('member_id', memberId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Get trapped events error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if behavior has been formed (repeated patterns)
 * Like addiction - repeated patterns create behaviors
 */
export async function isBehaviorFormed(
  feature: string,
  action: string,
  memberId: string
): Promise<boolean> {
  try {
    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '');
    
    const { data, error } = await supabase
      .from('formed_behaviors')
      .select('behavior_formed')
      .eq('feature', feature)
      .eq('action', action)
      .eq('member_id', memberId)
      .eq('behavior_formed', true)
      .single();

    if (error || !data) return false;
    return data.behavior_formed || false;
  } catch (error) {
    console.error('Behavior check error:', error);
    return false;
  }
}

