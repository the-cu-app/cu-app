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
    <main className="bg-black text-white antialiased">
      <Navigation />

      <AdapterHero
        badge={badgeText}
        title={adapter.tagline}
        description={adapter.description}
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
      <section className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="scroll-reveal">
            <h2 className="text-5xl font-bold mb-6">Ready to deploy?</h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Production-ready banking infrastructure. Deploy in days, not years.
            </p>
            <div className="flex gap-6 justify-center">
              <Link
                href="/checkout"
                className="bg-white text-black px-12 py-5 rounded font-bold text-xl hover:bg-white/90 transition-colors"
              >
                Purchase Now
              </Link>
              <button className="border border-white/20 px-12 py-5 rounded font-bold text-xl hover:border-white hover:bg-white hover:text-black transition-all">
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
