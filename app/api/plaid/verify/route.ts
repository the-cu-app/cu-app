import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID!;
const PLAID_SECRET = process.env.PLAID_SECRET!;

/**
 * Verify Plaid account with micro-deposits
 * POST /api/plaid/verify
 */
export async function POST(req: NextRequest) {
  try {
    const { member_id, account_id, micro_deposit_1, micro_deposit_2 } = await req.json();

    if (!member_id || !account_id || !micro_deposit_1 || !micro_deposit_2) {
      return NextResponse.json(
        { error: 'Missing required fields: member_id, account_id, micro_deposit_1, micro_deposit_2' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Plaid account
    const { data: plaidAccount, error: fetchError } = await supabase
      .from('plaid_accounts')
      .select('*')
      .eq('member_id', member_id)
      .eq('account_id', account_id)
      .single();

    if (fetchError || !plaidAccount) {
      return NextResponse.json(
        { error: 'Plaid account not found' },
        { status: 404 }
      );
    }

    // Verify micro-deposits with Plaid
    const verifyResponse = await fetch('https://sandbox.plaid.com/auth/microdeposits/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        access_token: plaidAccount.plaid_access_token,
        account_id: account_id,
        amounts: [parseFloat(micro_deposit_1), parseFloat(micro_deposit_2)],
      }),
    });

    if (!verifyResponse.ok) {
      const error = await verifyResponse.json();
      return NextResponse.json(
        { error: 'Micro-deposit verification failed', details: error },
        { status: 400 }
      );
    }

    // Update verification status
    const { data: updatedAccount, error: updateError } = await supabase
      .from('plaid_accounts')
      .update({
        verification_status: 'verified',
        micro_deposit_1: parseFloat(micro_deposit_1),
        micro_deposit_2: parseFloat(micro_deposit_2),
        verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', plaidAccount.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update verification status', details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      account: updatedAccount,
      message: 'Plaid account verified successfully'
    });

  } catch (error: any) {
    console.error('Plaid verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}



