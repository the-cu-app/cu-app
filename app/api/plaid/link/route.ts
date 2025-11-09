import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Plaid API keys (sandbox)
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID!;
const PLAID_SECRET = process.env.PLAID_SECRET!;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

/**
 * Link a Plaid account
 * POST /api/plaid/link
 */
export async function POST(req: NextRequest) {
  try {
    const { public_token, member_id, account_id } = await req.json();

    if (!public_token || !member_id || !account_id) {
      return NextResponse.json(
        { error: 'Missing required fields: public_token, member_id, account_id' },
        { status: 400 }
      );
    }

    // Exchange public token for access token (Plaid API)
    const exchangeResponse = await fetch('https://sandbox.plaid.com/item/public_token/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        public_token: public_token,
      }),
    });

    if (!exchangeResponse.ok) {
      const error = await exchangeResponse.json();
      return NextResponse.json(
        { error: 'Plaid token exchange failed', details: error },
        { status: 400 }
      );
    }

    const { access_token, item_id } = await exchangeResponse.json();

    // Get account details from Plaid
    const accountsResponse = await fetch('https://sandbox.plaid.com/accounts/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        access_token: access_token,
      }),
    });

    if (!accountsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch account details from Plaid' },
        { status: 400 }
      );
    }

    const accountsData = await accountsResponse.json();
    const account = accountsData.accounts.find((acc: any) => acc.account_id === account_id);

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Store in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('plaid_accounts')
      .upsert({
        member_id: member_id,
        plaid_item_id: item_id,
        plaid_access_token: access_token, // In production, encrypt this
        institution_id: account.institution_id,
        institution_name: account.institution_name || 'Unknown',
        account_id: account.account_id,
        account_name: account.name,
        account_type: account.type,
        account_subtype: account.subtype,
        mask: account.mask,
        verification_status: 'pending',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'member_id,account_id'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save Plaid account', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      account: data,
      message: 'Plaid account linked successfully. Micro-deposits will be sent for verification.'
    });

  } catch (error: any) {
    console.error('Plaid link error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}



