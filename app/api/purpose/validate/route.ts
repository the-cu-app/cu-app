// Next.js API: Purpose Validation
// Validates feature activation and PII access before allowing operations
// This is the "gatekeeper" that enforces purpose-based activation

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://svaiikywglmwedraxyda.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

interface PurposeValidationRequest {
  feature: string;
  action: string;
  member_id?: string;
  requested_pii?: string[];
  context?: Record<string, any>;
}

export async function POST(req: NextRequest) {
  try {
    const validationRequest: PurposeValidationRequest = await req.json();

    // Call Supabase Edge Function for purpose validation
    const purposeResponse = await fetch(
      `${supabaseUrl}/functions/v1/purpose-registry`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || ''}`
        },
        body: JSON.stringify(validationRequest)
      }
    );

    const purposeResult = await purposeResponse.json();

    if (!purposeResult.allowed) {
      // Purpose validation failed - log the rejection
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      await supabase.from('pii_access_log').insert({
        member_id: validationRequest.member_id || 'unknown',
        feature: validationRequest.feature,
        action: validationRequest.action,
        purpose: 'REJECTED',
        accessed_pii: validationRequest.requested_pii || [],
        access_granted: false,
        accessed_at: new Date().toISOString()
      });

      return NextResponse.json(
        {
          allowed: false,
          reason: purposeResult.reason,
          message: purposeResult.message
        },
        { status: 403 }
      );
    }

    // Purpose validated - log the access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    await supabase.from('pii_access_log').insert({
      member_id: validationRequest.member_id || 'unknown',
      feature: validationRequest.feature,
      action: validationRequest.action,
      purpose: purposeResult.purpose,
      accessed_pii: purposeResult.authorized_pii,
      access_granted: true,
      plaid_verified: purposeResult.plaid_verified || false,
      stripe_verified: purposeResult.stripe_verified || false,
      behavior_formed: purposeResult.behavior_formed,
      accessed_at: new Date().toISOString()
    });

    return NextResponse.json({
      allowed: true,
      purpose: purposeResult.purpose,
      authorized_pii: purposeResult.authorized_pii,
      plaid_verified: purposeResult.plaid_verified,
      stripe_verified: purposeResult.stripe_verified,
      behavior_formed: purposeResult.behavior_formed
    });

  } catch (error: any) {
    console.error('Purpose validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

