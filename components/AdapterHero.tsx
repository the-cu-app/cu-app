'use client';

import Link from 'next/link';

interface AdapterHeroProps {
  badge: string;
  title: string;
  description: string;
  price: number;
}

export default function AdapterHero({ badge, title, description, price }: AdapterHeroProps) {
  const formatPrice = (priceValue: number) => {
    if (priceValue < 1000) return `$${priceValue}`;
    return `$${(priceValue / 1000).toFixed(0)}K`;
  };

  return (
    <section className="bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-4xl">
          <div className="inline-block border border-black/20 dark:border-white/20 px-4 py-2 rounded-full mb-6 animate-fadeInUp">
            <span className="text-sm font-medium text-black dark:text-white">{badge}</span>
          </div>

          <div className="flex items-start justify-between gap-8 mb-6 animate-fadeInUp delay-100">
            <h1 className="text-7xl font-bold tracking-tight text-black dark:text-white">
              {title}
            </h1>
            <div className="text-right shrink-0">
              <div className="text-6xl font-bold text-black dark:text-white">{formatPrice(price)}</div>
              <div className="text-sm text-black/60 dark:text-white/60">one-time</div>
            </div>
          </div>

          <p className="text-2xl text-black/60 dark:text-white/60 mb-12 animate-fadeInUp delay-200">
            {description}
          </p>

          <div className="flex gap-4 animate-fadeInUp delay-300">
            <Link
              href="/checkout"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
            >
              Purchase Adapter
            </Link>
            <button className="border border-black/20 dark:border-white/20 text-black dark:text-white px-8 py-4 rounded-full font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
