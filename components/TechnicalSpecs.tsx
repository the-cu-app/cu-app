import type { CSSProperties } from 'react';
import type { AdapterSpecs } from '@/lib/adapters-data';

interface TechnicalSpecsProps {
  specs: AdapterSpecs;
}

export default function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  return (
    <section className="border-b border-white/10 bg-white/5">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4">Technical specifications</h2>
          <p className="text-xl text-white/60">Production-tested and battle-hardened</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="scroll-reveal" style={{ '--reveal-delay': '0.05s' } as CSSProperties}>
            <h3 className="text-2xl font-bold mb-6">Database Schema</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Tables</span>
                <span className="font-bold">{specs.tables} tables</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Views</span>
                <span className="font-bold">{specs.views} views</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Functions</span>
                <span className="font-bold">{specs.functions} functions</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Stored Procedures</span>
                <span className="font-bold">{specs.procedures} procedures</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/60">Row Level Security</span>
                <span className="font-bold">✓ Enabled</span>
              </li>
            </ul>
          </div>

          <div className="scroll-reveal" style={{ '--reveal-delay': '0.1s' } as CSSProperties}>
            <h3 className="text-2xl font-bold mb-6">API Endpoints</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">RESTful APIs</span>
                <span className="font-bold">{specs.endpoints} endpoints</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Real-time Subscriptions</span>
                <span className="font-bold">✓ Supported</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Rate Limiting</span>
                <span className="font-bold">✓ Configured</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Authentication</span>
                <span className="font-bold">OAuth 2.0 + JWT</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/60">Documentation</span>
                <span className="font-bold">OpenAPI 3.0</span>
              </li>
            </ul>
          </div>

          <div className="scroll-reveal" style={{ '--reveal-delay': '0.15s' } as CSSProperties}>
            <h3 className="text-2xl font-bold mb-6">Performance</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">API Response Time</span>
                <span className="font-bold">{specs.response_time}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Throughput</span>
                <span className="font-bold">{specs.throughput}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Uptime SLA</span>
                <span className="font-bold">{specs.uptime}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Data Replication</span>
                <span className="font-bold">Multi-region</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/60">Backup Frequency</span>
                <span className="font-bold">Every 5 minutes</span>
              </li>
            </ul>
          </div>

          <div className="scroll-reveal" style={{ '--reveal-delay': '0.2s' } as CSSProperties}>
            <h3 className="text-2xl font-bold mb-6">What&apos;s Included</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Complete source code access</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Docker deployment configs</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Kubernetes manifests</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>CI/CD pipeline templates</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Sample client SDKs (JS, Swift, Kotlin)</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Postman collection</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
