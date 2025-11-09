// Next.js API Route: Account Transfer
// Called by Supabase Edge Function (which was called by Flutter)
// This is the "service layer" that actually processes transfers

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://svaiikywglmwedraxyda.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

interface TransferRequest {
  member_id: string;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  transfer_type: 'single' | 'recurring' | 'automatic_payment';
  effective_date?: string;
  frequency?: string;
  expiration_date?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Verify API key (from Supabase Edge Function)
    const apiKey = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (apiKey !== process.env.NEXTJS_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const transferRequest: TransferRequest = await req.json();
    const userId = req.headers.get('X-User-Id');
    const memberId = req.headers.get('X-Member-Id');

    // PURPOSE VALIDATION - Apple-style purpose check before loading PII
    const purposeValidation = await fetch(`${req.nextUrl.origin}/api/purpose/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        feature: 'account_transfer',
        action: 'execute',
        member_id: memberId,
        requested_pii: ['account_number', 'member_id', 'routing_number'],
        context: {
          from_account: transferRequest.from_account_id,
          to_account: transferRequest.to_account_id,
          amount: transferRequest.amount
        }
      })
    });

    const purposeResult = await purposeValidation.json();

    if (!purposeResult.allowed) {
      // Purpose not validated - don't load PII, don't process
      return NextResponse.json(
        {
          error: 'Purpose validation failed',
          reason: purposeResult.reason,
          message: purposeResult.message
        },
        { status: 403 }
      );
    }

    // Validate request
    if (!transferRequest.from_account_id || !transferRequest.to_account_id || !transferRequest.amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log the transfer attempt (trapping)
    await supabase.from('transfer_executions').insert({
      user_id: userId,
      member_id: memberId,
      from_account_id: transferRequest.from_account_id,
      to_account_id: transferRequest.to_account_id,
      amount: transferRequest.amount,
      transfer_type: transferRequest.transfer_type,
      status: 'processing',
      created_at: new Date().toISOString()
    });

    // TODO: Integrate with actual core banking system
    // For now, simulate the transfer
    const transferResult = await executeTransfer(transferRequest);

    // Update execution log
    await supabase.from('transfer_executions')
      .update({
        status: transferResult.success ? 'completed' : 'failed',
        result_data: transferResult,
        completed_at: new Date().toISOString()
      })
      .eq('member_id', memberId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (!transferResult.success) {
      // Trap the error
      await supabase.from('transfer_errors').insert({
        user_id: userId,
        member_id: memberId,
        error_type: 'execution_failed',
        error_message: transferResult.error,
        request_data: transferRequest,
        created_at: new Date().toISOString()
      });
    }

    return NextResponse.json(transferResult);

  } catch (error: any) {
    console.error('Transfer API error:', error);

    // Trap the exception
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase.from('transfer_errors').insert({
        error_type: 'api_exception',
        error_message: error.message,
        stack_trace: error.stack,
        created_at: new Date().toISOString()
      });
    } catch (logError) {
      console.error('Failed to log exception:', logError);
    }

    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Simulate transfer execution (replace with actual core banking integration)
async function executeTransfer(request: TransferRequest): Promise<any> {
  // TODO: Replace with actual core banking API call
  // This would call your core system (Fiserv, Jack Henry, etc.)
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transaction_id: `TXN-${Date.now()}`,
        from_account: request.from_account_id,
        to_account: request.to_account_id,
        amount: request.amount,
        effective_date: request.effective_date || new Date().toISOString(),
        status: 'completed'
      });
    }, 500);
  });
}

