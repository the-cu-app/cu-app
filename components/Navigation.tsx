'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            cu.app
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm hover:text-white/60 transition-colors">
              All Adapters
            </Link>
            <Link href="#" className="text-sm hover:text-white/60 transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-sm hover:text-white/60 transition-colors">
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
