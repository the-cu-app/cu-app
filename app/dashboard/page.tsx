'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { getSession, getUser, checkPlanAccess, signOut } from '@/lib/supabase';

interface UserData {
  email: string;
  id_verified: boolean;
  plan_type: string;
  adapters_purchased: string[];
  adapters_enabled: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const session = await getSession();

    if (!session) {
      router.push('/auth/login');
      return;
    }

    const currentUser = await getUser();
    const planData = await checkPlanAccess();

    setUser({
      email: currentUser?.email || '',
      id_verified: currentUser?.user_metadata?.id_verified || false,
      plan_type: planData.plan_type || 'free',
      adapters_purchased: planData.adapters_purchased || [],
      adapters_enabled: planData.adapters_enabled || [],
    });

    setLoading(false);
  }

  async function handleSignOut() {
    await signOut();
    localStorage.removeItem('cu_session');
    localStorage.removeItem('cu_user');
    router.push('/');
  }

  if (loading) {
    return (
      <main className="bg-black text-white antialiased min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const adapters = [
    { id: 'demo-starter', name: 'Demo Starter', price: '$1' },
    { id: 'banking-core', name: 'Digital Banking Core', price: '$15K' },
    { id: 'iso20022', name: 'ISO20022 Payments', price: '$12K' },
    { id: 'compliance', name: 'Compliance & Risk', price: '$10K' },
    { id: 'financial-wellness', name: 'Financial Wellness', price: '$8K' },
    { id: 'cards', name: 'Card Management', price: '$9K' },
    { id: 'loans', name: 'Loan Origination', price: '$18K' },
    { id: 'investments', name: 'Investment Platform', price: '$20K' },
    { id: 'design-system', name: 'Design System', price: '$5K' },
    { id: 'communications', name: 'Communications', price: '$6K' },
    { id: 'analytics', name: 'Analytics & Insights', price: '$7K' },
  ];

  return (
    <main className="bg-black text-white antialiased min-h-screen">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-white/60">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="border border-white/20 px-6 py-3 rounded-full font-medium hover:bg-white/5 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* ID Verification Status */}
          {!user.id_verified && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-500 mb-1">ID Verification Pending</h3>
                  <p className="text-sm text-white/60 mb-4">
                    Complete ID verification to unlock full access to all adapters
                  </p>
                  <button className="bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-colors">
                    Verify Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Current Plan */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border border-white/10 rounded-lg p-6">
              <div className="text-sm text-white/60 mb-1">Current Plan</div>
              <div className="text-3xl font-bold capitalize">{user.plan_type}</div>
            </div>
            <div className="border border-white/10 rounded-lg p-6">
              <div className="text-sm text-white/60 mb-1">Adapters Owned</div>
              <div className="text-3xl font-bold">{user.adapters_purchased.length}/11</div>
            </div>
            <div className="border border-white/10 rounded-lg p-6">
              <div className="text-sm text-white/60 mb-1">ID Status</div>
              <div className="flex items-center gap-2">
                {user.id_verified ? (
                  <>
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-green-500">Verified</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-yellow-500">Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Upgrade to Perpetual */}
          {user.plan_type !== 'perpetual' && (
            <div className="bg-white/5 border-2 border-white rounded-lg p-8 mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Upgrade to Complete Suite</h2>
                  <p className="text-white/60 mb-4">
                    Get all 10 adapters for $50,000. Perpetual license. No monthly fees.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold">$50,000</div>
                    <div className="text-sm text-white/60">one-time</div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          )}

          {/* My Adapters */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">My Adapters</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adapters.map((adapter) => {
                const isOwned =
                  user.plan_type === 'perpetual' ||
                  user.adapters_purchased.includes(adapter.id) ||
                  user.adapters_enabled.includes(adapter.id);

                return (
                  <div
                    key={adapter.id}
                    className={`border rounded-lg p-6 ${
                      isOwned
                        ? 'border-white/30 bg-white/5'
                        : 'border-white/10 opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-lg">{adapter.name}</h3>
                      {isOwned ? (
                        <svg
                          className="w-6 h-6 text-green-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-white/20 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )}
                    </div>

                    {isOwned ? (
                      <Link
                        href={`/adapters/${adapter.id}`}
                        className="block bg-white text-black px-4 py-2 rounded-full text-sm font-bold text-center hover:bg-white/90 transition-colors"
                      >
                        View Adapter
                      </Link>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold mb-2">{adapter.price}</div>
                        <button className="w-full border border-white/20 px-4 py-2 rounded-full text-sm font-bold hover:bg-white/5 transition-colors">
                          Purchase
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
