import type { CSSProperties } from 'react';
import Link from 'next/link';

interface AdapterPricingProps {
  adapterId?: string;
  adapterName: string;
  priceOnetime: number;
  priceMonthly: number;
  deployDays: number;
}

export default function AdapterPricing({
  adapterId,
  adapterName,
  priceOnetime,
  priceMonthly,
  deployDays
}: AdapterPricingProps) {
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-6">Choose your option</h2>
          <p className="text-xl text-white/60">Buy this adapter individually or get the complete suite</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Individual Adapter */}
          <div
            className="scroll-reveal bg-white/5 border-2 border-white/20 rounded-2xl p-12 hover:scale-105 transition-transform duration-300"
            style={{ '--reveal-delay': '0.05s' } as CSSProperties}
          >
            <div className="text-center mb-8">
              <div className="text-sm font-bold text-white/60 mb-4">INDIVIDUAL ADAPTER</div>
              <h3 className="text-2xl font-bold mb-6">{adapterName}</h3>
              <div className="flex justify-center gap-6 mb-6">
                <div>
                  <div className="text-5xl font-bold mb-2">${(priceOnetime / 1000).toFixed(0)}K</div>
                  <div className="text-white/60 text-sm">one-time</div>
                </div>
                <div className="border-l border-white/20"></div>
                <div>
                  <div className="text-5xl font-bold mb-2">${priceMonthly}</div>
                  <div className="text-white/60 text-sm">per month</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 mb-8">
              <ul className="space-y-4 text-left">
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{adapterName} only</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>All core features included</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>24/7 technical support</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Monthly platform updates</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{deployDays} day deployment</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <Link href={`/checkout?adapter=${adapterId || 'suite'}`} className="text-center bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-colors">
                Purchase Adapter - ${(priceOnetime / 1000).toFixed(0)}K
              </Link>
              <button className="border-2 border-white/20 px-12 py-5 rounded-full font-bold text-xl hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>

          {/* Complete Suite */}
          <div
            className="scroll-reveal border-2 border-white rounded p-12 hover:border-white/80 transition-colors"
            style={{ '--reveal-delay': '0.1s' } as CSSProperties}
          >
            <div className="text-center mb-8">
              <div className="text-sm font-bold text-white/60 mb-4">COMPLETE SUITE</div>
              <h3 className="text-2xl font-bold mb-6">All 10 Adapters</h3>
              <div className="mb-6">
                <div className="text-6xl font-bold mb-2">$50,000</div>
                <div className="text-white/60 text-sm">one-time perpetual license</div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 mb-8">
              <ul className="space-y-4 text-left">
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>All 10 adapters included</strong></span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lifetime access - no expiration</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>No monthly maintenance fees</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lifetime updates & support</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priority white-glove onboarding</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/checkout?adapter=suite" className="text-center bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-colors">
                Get Complete Suite - $50K
              </Link>
              <Link href="/" className="text-center border-2 border-white/40 px-12 py-5 rounded-full font-bold text-xl hover:border-white hover:bg-white/5 transition-all duration-300">
                View All Adapters
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
