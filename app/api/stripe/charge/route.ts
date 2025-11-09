import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

/**
 * Process a payment via Stripe
 * POST /api/stripe/charge
 */
export async function POST(req: NextRequest) {
  try {
    const { member_id, payment_method_id, amount, currency = 'usd', description } = await req.json();

    if (!member_id || !payment_method_id || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: member_id, payment_method_id, amount' },
        { status: 400 }
      );
    }

    // Validate purpose before processing payment
    const purposeValidation = await fetch(`${req.nextUrl.origin}/api/purpose/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        feature: 'stripe_payment',
        action: 'charge',
        member_id: member_id,
        requested_pii: ['member_id'],
        context: {
          amount: amount,
          currency: currency,
          payment_method_id: payment_method_id
        }
      })
    });

    const purposeResult = await purposeValidation.json();

    if (!purposeResult.allowed) {
      return NextResponse.json(
        {
          error: 'Purpose validation failed',
          reason: purposeResult.reason,
          message: purposeResult.message
        },
        { status: 403 }
      );
    }

    // Get payment method from database
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: paymentMethod, error: pmError } = await supabase
      .from('stripe_payment_methods')
      .select('*')
      .eq('member_id', member_id)
      .eq('stripe_payment_method_id', payment_method_id)
      .eq('verification_status', 'verified')
      .single();

    if (pmError || !paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method not found or not verified' },
        { status: 404 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      payment_method: payment_method_id,
      customer: paymentMethod.stripe_customer_id,
      confirmation_method: 'manual',
      confirm: true,
      description: description || `Payment for member ${member_id}`,
      metadata: {
        member_id: member_id,
      },
    });

    if (paymentIntent.status === 'succeeded') {
      return NextResponse.json({
        success: true,
        payment_intent_id: paymentIntent.id,
        status: paymentIntent.status,
        amount: amount,
        currency: currency,
        message: 'Payment processed successfully'
      });
    } else if (paymentIntent.status === 'requires_action') {
      return NextResponse.json({
        success: false,
        requires_action: true,
        client_secret: paymentIntent.client_secret,
        status: paymentIntent.status,
        message: 'Additional authentication required'
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Payment failed', 
          status: paymentIntent.status,
          message: paymentIntent.last_payment_error?.message || 'Unknown error'
        },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('Stripe charge error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}



