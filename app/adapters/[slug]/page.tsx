import { notFound } from 'next/navigation';
import { getAdapterBySlug, adaptersData } from '@/lib/adapters-data';
import Navigation from '@/components/Navigation';
import AdapterHero from '@/components/AdapterHero';
import AdapterFeatures from '@/components/AdapterFeatures';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import AdapterPricing from '@/components/AdapterPricing';
import Footer from '@/components/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  return adaptersData.map((adapter) => ({
    slug: adapter.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adapter = getAdapterBySlug(slug);

  if (!adapter) {
    return {
      title: 'Adapter Not Found - CU.APP',
    };
  }

  return {
    title: `${adapter.name} - CU.APP`,
    description: adapter.description,
  };
}

export default async function AdapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adapter = getAdapterBySlug(slug);

  if (!adapter) {
    notFound();
  }

  const badgeText = adapter.name.replace(' Adapter', '').toUpperCase();

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white antialiased">
      <Navigation />

      <AdapterHero
        badge={badgeText}
        title={adapter.tagline}
        description={adapter.description}
        price={adapter.price_onetime}
      />

      <AdapterFeatures features={adapter.features} />

      <TechnicalSpecs specs={adapter.specs} />

      <AdapterPricing
        adapterName={adapter.name}
        priceOnetime={adapter.price_onetime}
        priceMonthly={adapter.price_monthly}
        deployDays={adapter.deploy_days}
      />

      {/* CTA Section */}
      <section className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="scroll-reveal">
            <h2 className="text-5xl font-bold mb-6">Ready to deploy?</h2>
            <p className="text-xl text-black/60 dark:text-white/60 mb-12 max-w-2xl mx-auto">
              Production-ready banking infrastructure. Deploy in days, not years.
            </p>
            <div className="flex gap-6 justify-center">
              <Link
                href="/checkout"
                className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
              >
                Purchase Now
              </Link>
              <button className="border border-black/20 dark:border-white/20 text-black dark:text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
