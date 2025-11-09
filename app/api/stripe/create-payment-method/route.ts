import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Stripe initialization (sandbox/test mode)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

/**
 * Create a Stripe payment method
 * POST /api/stripe/create-payment-method
 */
export async function POST(req: NextRequest) {
  try {
    const { member_id, payment_method_id, payment_method_type } = await req.json();

    if (!member_id || !payment_method_id || !payment_method_type) {
      return NextResponse.json(
        { error: 'Missing required fields: member_id, payment_method_id, payment_method_type' },
        { status: 400 }
      );
    }

    // Retrieve payment method from Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(payment_method_id);

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method not found in Stripe' },
        { status: 404 }
      );
    }

    // Get or create Stripe customer
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if customer exists
    const { data: existingPaymentMethod } = await supabase
      .from('stripe_payment_methods')
      .select('stripe_customer_id')
      .eq('member_id', member_id)
      .limit(1)
      .single();

    let customerId = existingPaymentMethod?.stripe_customer_id;

    if (!customerId) {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        metadata: {
          member_id: member_id,
        },
      });
      customerId = customer.id;
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(payment_method_id, {
      customer: customerId,
    });

    // Extract payment method details
    const cardDetails = paymentMethod.card;
    const bankDetails = paymentMethod.us_bank_account || paymentMethod.bank_account;

    // Store in Supabase
    const paymentMethodData: any = {
      member_id: member_id,
      stripe_customer_id: customerId,
      stripe_payment_method_id: payment_method_id,
      payment_method_type: payment_method_type,
      verification_status: 'pending',
      updated_at: new Date().toISOString(),
    };

    if (cardDetails) {
      paymentMethodData.card_brand = cardDetails.brand;
      paymentMethodData.card_last4 = cardDetails.last4;
      paymentMethodData.card_exp_month = cardDetails.exp_month;
      paymentMethodData.card_exp_year = cardDetails.exp_year;
    }

    if (bankDetails) {
      paymentMethodData.bank_account_type = bankDetails.account_type;
      paymentMethodData.bank_account_last4 = bankDetails.last4;
      paymentMethodData.bank_name = bankDetails.bank_name;
    }

    const { data, error } = await supabase
      .from('stripe_payment_methods')
      .upsert(paymentMethodData, {
        onConflict: 'member_id,stripe_payment_method_id'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save payment method', details: error.message },
        { status: 500 }
      );
    }

    // Verify payment method (for cards, immediate; for bank accounts, may require verification)
    let verificationStatus = 'verified';
    if (payment_method_type === 'us_bank_account' || payment_method_type === 'bank_account') {
      // Bank accounts require micro-deposits or instant verification
      verificationStatus = 'pending';
    }

    // Update verification status if needed
    if (verificationStatus !== 'pending') {
      await supabase
        .from('stripe_payment_methods')
        .update({
          verification_status: verificationStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.id);
    }

    return NextResponse.json({
      success: true,
      payment_method: data,
      verification_status: verificationStatus,
      message: payment_method_type === 'card' 
        ? 'Payment method added successfully'
        : 'Payment method added. Verification may be required.'
    });

  } catch (error: any) {
    console.error('Stripe payment method creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}



