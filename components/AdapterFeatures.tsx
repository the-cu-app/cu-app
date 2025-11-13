import type { CSSProperties } from 'react';
import type { AdapterFeature } from '@/lib/adapters-data';

interface AdapterFeaturesProps {
  features: AdapterFeature[];
}

export default function AdapterFeatures({ features }: AdapterFeaturesProps) {
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4">Everything you need</h2>
          <p className="text-xl text-white/60">Production-ready banking features out of the box</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="scroll-reveal border border-white/10 rounded p-8 hover:border-white/30 transition-colors"
              style={{ '--reveal-delay': `${index * 0.05}s` } as CSSProperties}
            >
              <div className="w-12 h-12 border border-white/10 rounded flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60 mb-4">{feature.description}</p>
              <ul className="space-y-2 text-sm text-white/60">
                {feature.items.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
