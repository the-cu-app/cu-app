'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">cu.app</div>
          <div className="flex gap-8 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              All Adapters
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              API Reference
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
