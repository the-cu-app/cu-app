'use client';

interface AdapterHeroProps {
  badge: string;
  title: string;
  description: string;
}

export default function AdapterHero({ badge, title, description }: AdapterHeroProps) {
  return (
    <section className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-4xl">
          <div className="inline-block border border-white/20 px-4 py-2 rounded-full mb-6 animate-fadeInUp">
            <span className="text-sm font-medium">{badge}</span>
          </div>

          <h1 className="text-7xl font-bold tracking-tight mb-6 animate-fadeInUp delay-100">
            {title}
          </h1>

          <p className="text-2xl text-white/60 mb-12 animate-fadeInUp delay-200">
            {description}
          </p>

          <div className="flex gap-4 animate-fadeInUp delay-300">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors">
              View Pricing
            </button>
            <button className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
