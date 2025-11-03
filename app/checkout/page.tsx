'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      alert(
        'Demo Mode: In production, this would process the $50K payment via Stripe.\n\n' +
        'Next steps:\n' +
        '1. Create Stripe Payment Intent on backend\n' +
        '2. Confirm payment with Stripe\n' +
        '3. Activate license in database\n' +
        '4. Send confirmation email'
      );
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <main className="bg-black text-white antialiased min-h-screen">
      <Navigation />

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h1 className="text-4xl font-bold mb-8">Order Summary</h1>

              <div className="border border-white/10 rounded p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">Complete Suite</h3>
                    <p className="text-sm text-white/60">All 10 Adapters - Perpetual License</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$50,000</div>
                    <div className="text-xs text-white/60">one-time</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  <ul className="space-y-2 text-sm text-white/60">
                    <li>✓ Digital Banking Core</li>
                    <li>✓ ISO20022 Payments</li>
                    <li>✓ Compliance & Risk</li>
                    <li>✓ Financial Wellness</li>
                    <li>✓ Card Management</li>
                    <li>✓ Loan Origination</li>
                    <li>✓ Investment Platform</li>
                    <li>✓ Design System</li>
                    <li>✓ Communications</li>
                    <li>✓ Analytics & Insights</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded p-6">
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">Subtotal</span>
                  <span>$50,000.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Due</span>
                    <span>$50,000.00</span>
                  </div>
                  <p className="text-xs text-white/60 mt-2">One-time payment. No recurring charges.</p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Payment Details</h2>

              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                    required
                  />
                </div>

                {/* Card Information */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-bold mb-4">Payment Method</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                      placeholder="4242 4242 4242 4242"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVC</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Billing Zip Code</label>
                    <input
                      type="text"
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:border-white/30 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Pay $50,000'}
                </button>

                <p className="text-xs text-white/60 text-center mt-4">
                  Secure payment powered by Stripe. Your payment information is encrypted.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
