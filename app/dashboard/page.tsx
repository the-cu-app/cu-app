'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { getSession, getUser, checkPlanAccess, signOut, createSupabaseClient } from '@/lib/supabase';
import { getAdapterBySlug, adaptersData } from '@/lib/adapters-data';

interface UserData {
  email: string;
  id_verified: boolean;
  plan_type: string;
  adapters_purchased: string[];
  adapters_enabled: string[];
}

interface Purchase {
  id: string;
  adapter_id: string;
  purchase_type: string;
  price_paid: number;
  payment_status: string;
  license_type: string;
  license_start_date: string;
  license_end_date: string | null;
  is_active: boolean;
  created_at: string;
}

interface DownloadPackage {
  id: string;
  adapter_id: string;
  version: string;
  package_name: string;
  package_type: string;
  file_name: string;
  description: string;
  file_size_bytes: number;
  download_count: number;
  file_url: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [downloads, setDownloads] = useState<DownloadPackage[]>([]);
  const [loadingDownloads, setLoadingDownloads] = useState(false);

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

    // Load purchases and downloads
    await loadPurchasesAndDownloads();

    setLoading(false);
  }

  async function loadPurchasesAndDownloads() {
    try {
      setLoadingDownloads(true);
      const supabase = createSupabaseClient();

      // Get user's purchases - handle errors gracefully
      const { data: purchasesData, error: purchasesError } = await supabase
        .from('purchases')
        .select('*')
        .eq('payment_status', 'completed')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // If table doesn't exist or error, just set empty array
      if (purchasesError) {
        console.warn('Purchases table may not exist:', purchasesError.message);
        setPurchases([]);
      } else {
        setPurchases(purchasesData || []);

        // Get adapter IDs user has access to
        const adapterIds = new Set<string>();
        purchasesData?.forEach((purchase) => {
          if (purchase.adapter_id === 'suite') {
            // Add all adapters for suite purchase
            adaptersData.forEach((adapter) => {
              if (adapter.id !== 'demo-starter') {
                adapterIds.add(adapter.id);
              }
            });
          } else {
            adapterIds.add(purchase.adapter_id);
          }
        });

        // Get downloadable packages for these adapters
        const adapterIdsArray = Array.from(adapterIds);
        if (adapterIdsArray.length > 0) {
          const { data: packagesData, error: packagesError } = await supabase
            .from('adapter_downloads')
            .select('*')
            .in('adapter_id', adapterIdsArray)
            .eq('is_latest', true)
            .order('adapter_id', { ascending: true });

          if (packagesError) {
            console.warn('Downloads table may not exist:', packagesError.message);
            setDownloads([]);
          } else {
            setDownloads(packagesData || []);
          }
        } else {
          setDownloads([]);
        }
      }
    } catch (err) {
      console.error('Error loading purchases and downloads:', err);
      // Set empty arrays on error to prevent infinite loading
      setPurchases([]);
      setDownloads([]);
    } finally {
      setLoadingDownloads(false);
    }
  }

  const handleDownload = async (packageId: string, fileUrl: string, fileName: string) => {
    try {
      // Direct download from file_url
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Reload downloads to update count
      await loadPurchasesAndDownloads();
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download. Please try again.');
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }

  const getPackageTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'full': 'Full Package',
      'demo': 'Demo',
      'docs': 'Documentation',
      'source': 'Source Code',
      'database': 'Database Schema',
      'api-specs': 'API Specifications'
    };
    return labels[type] || type;
  }

  async function handleSignOut() {
    await signOut();
    localStorage.removeItem('cu_session');
    localStorage.removeItem('cu_user');
    router.push('/');
  }

  if (loading) {
    return (
      <main className="bg-white dark:bg-black text-black dark:text-white antialiased min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-black/60 dark:text-white/60">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const totalSpent = purchases.reduce((sum, p) => sum + Number(p.price_paid || 0), 0);

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white antialiased min-h-screen">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Executive Profile Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl font-bold mb-2">Executive Profile</h1>
                <p className="text-black/60 dark:text-white/60 text-lg">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="border border-black/20 dark:border-white/20 px-6 py-3 rounded-full font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Sign Out
              </button>
            </div>

          {/* ID Verification Status */}
          {!user.id_verified && (
            <div className="bg-yellow-500/10 dark:bg-yellow-500/10 border border-yellow-500/20 dark:border-yellow-500/20 rounded-lg p-6 mb-8">
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

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 bg-black/5 dark:bg-white/5">
                <div className="text-sm text-black/60 dark:text-white/60 mb-1">Current Plan</div>
                <div className="text-2xl font-bold capitalize">{user.plan_type}</div>
              </div>
              <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 bg-black/5 dark:bg-white/5">
                <div className="text-sm text-black/60 dark:text-white/60 mb-1">Purchases</div>
                <div className="text-2xl font-bold">{purchases.length}</div>
              </div>
              <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 bg-black/5 dark:bg-white/5">
                <div className="text-sm text-black/60 dark:text-white/60 mb-1">Total Invested</div>
                <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              </div>
              <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 bg-black/5 dark:bg-white/5">
                <div className="text-sm text-black/60 dark:text-white/60 mb-1">Downloads Available</div>
                <div className="text-2xl font-bold">{downloads.length}</div>
              </div>
            </div>
          </div>

          {/* My Downloads - Prominent Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">My Downloads</h2>
              <Link
                href="/downloads"
                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm"
              >
                View All →
              </Link>
            </div>

            {loadingDownloads ? (
              <div className="border border-black/10 dark:border-white/10 rounded-lg p-12 text-center">
                <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
                <p className="text-black/60 dark:text-white/60">Loading downloads...</p>
              </div>
            ) : downloads.length === 0 ? (
              <div className="border border-black/10 dark:border-white/10 rounded-lg p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-black/20 dark:text-white/20 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-2">No Downloads Available</h3>
                <p className="text-black/60 dark:text-white/60 mb-6">
                  Download packages will appear here once you make a purchase and packages are configured.
                </p>
                <Link
                  href="/"
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-black/90 dark:hover:bg-white/90 transition-colors inline-block"
                >
                  Browse Adapters
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {downloads.slice(0, 6).map((pkg) => {
                  const adapter = getAdapterBySlug(pkg.adapter_id);
                  return (
                    <div
                      key={pkg.id}
                      className="border border-black/10 dark:border-white/10 rounded-lg p-6 hover:border-black/20 dark:hover:border-white/20 transition-colors bg-black/5 dark:bg-white/5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold">
                              {adapter?.name || pkg.adapter_id}
                            </h3>
                            <span className="text-xs bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                              v{pkg.version}
                            </span>
                          </div>
                          <p className="text-sm text-black/60 dark:text-white/60 mb-2">
                            {pkg.description || pkg.package_name}
                          </p>
                          <div className="flex gap-3 text-xs text-black/40 dark:text-white/40">
                            <span>{formatFileSize(pkg.file_size_bytes)}</span>
                            <span>•</span>
                            <span>{getPackageTypeLabel(pkg.package_type)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(pkg.id, pkg.file_url, pkg.file_name)}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-full font-bold hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* My Purchases */}
          {purchases.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Purchase History</h2>
              <div className="space-y-4">
                {purchases.map((purchase) => {
                  const adapter = purchase.adapter_id === 'suite' 
                    ? null 
                    : getAdapterBySlug(purchase.adapter_id);
                  return (
                    <div
                      key={purchase.id}
                      className="border border-black/10 dark:border-white/10 rounded-lg p-6 bg-black/5 dark:bg-white/5"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">
                              {purchase.adapter_id === 'suite' 
                                ? 'Complete Suite' 
                                : adapter?.name || purchase.adapter_id}
                            </h3>
                            <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                              {purchase.license_type}
                            </span>
                          </div>
                          <p className="text-black/60 dark:text-white/60 mb-2">
                            ${Number(purchase.price_paid).toLocaleString()} • Purchased {new Date(purchase.created_at).toLocaleDateString()}
                          </p>
                          {purchase.license_end_date && (
                            <p className="text-xs text-black/40 dark:text-white/40">
                              License expires {new Date(purchase.license_end_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1 rounded">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upgrade to Perpetual */}
          {user.plan_type !== 'perpetual' && (
            <div className="bg-black/5 dark:bg-white/5 border-2 border-black dark:border-white rounded-lg p-8 mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Upgrade to Complete Suite</h2>
                  <p className="text-black/60 dark:text-white/60 mb-4">
                    Get all 10 adapters for $50,000. Perpetual license. No monthly fees.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold">$50,000</div>
                    <div className="text-sm text-black/60 dark:text-white/60">one-time</div>
                  </div>
                </div>
                <Link
                  href="/checkout?adapter=suite"
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
