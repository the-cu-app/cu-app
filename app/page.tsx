import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { adaptersData } from '@/lib/adapters-data';

export default function HomePage() {
  return (
    <main className="bg-black text-white antialiased">
      <Navigation />

      {/* Hero */}
      <section className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block border border-white/20 px-4 py-2 rounded-full mb-6 animate-fadeInUp">
              <span className="text-sm font-medium">PRODUCTION-READY ADAPTERS</span>
            </div>

            <h1 className="text-7xl font-bold tracking-tight mb-6 animate-fadeInUp delay-100">
              Deploy your credit union in days, not years
            </h1>

            <p className="text-2xl text-white/60 mb-12 animate-fadeInUp delay-200">
              11 battle-tested adapters. One platform. Zero technical debt.
            </p>

            <div className="flex gap-4 justify-center animate-fadeInUp delay-300">
              <Link
                href="/checkout"
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
              >
                Get Complete Suite - $50K
              </Link>
              <button className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Adapters Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Choose your adapters</h2>
            <p className="text-xl text-white/60">Buy individually or get the complete suite</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adaptersData.map((adapter) => (
              <Link
                key={adapter.id}
                href={`/adapters/${adapter.id}`}
                className="border border-white/10 rounded-lg p-8 hover:border-white/30 transition-all hover:scale-105 duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 border border-white/10 rounded flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {adapter.price_onetime < 1000
                        ? `$${adapter.price_onetime}`
                        : `$${(adapter.price_onetime / 1000).toFixed(0)}K`}
                    </div>
                    <div className="text-xs text-white/60">one-time</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{adapter.name}</h3>
                <p className="text-white/60 text-sm mb-4">{adapter.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{adapter.deploy_days} day deploy</span>
                  <span className="text-white font-medium">View details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Suite CTA */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Get the complete suite</h2>
            <p className="text-xl text-white/60 mb-8">
              All 11 adapters for $50,000. Perpetual license. No monthly fees.
            </p>

            <div className="bg-black border-2 border-white rounded-2xl p-12 mb-8">
              <div className="text-6xl font-bold mb-4">$50,000</div>
              <div className="text-white/60 mb-8">one-time perpetual license</div>

              <ul className="grid md:grid-cols-2 gap-4 text-left mb-8">
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>All 11 adapters included</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lifetime access</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>No monthly fees</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lifetime updates & support</span>
                </li>
              </ul>

              <Link
                href="/checkout"
                className="inline-block bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-colors"
              >
                Purchase Complete Suite
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
