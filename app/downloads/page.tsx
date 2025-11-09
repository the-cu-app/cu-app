'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { getAdapterBySlug, adaptersData } from '@/lib/adapters-data';
import { createSupabaseClient } from '@/lib/supabase';

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
}

export default function DownloadsPage() {
  const [packages, setPackages] = useState<DownloadPackage[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseClient();

      // Get user's purchases
      const { data: purchasesData, error: purchasesError } = await supabase
        .from('purchases')
        .select('*')
        .eq('payment_status', 'completed')
        .eq('is_active', true);

      if (purchasesError) throw purchasesError;

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

        if (packagesError) throw packagesError;
        setPackages(packagesData || []);
      }

      setError(null);
    } catch (err) {
      console.error('Error loading downloads:', err);
      setError('Failed to load downloads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (packageId: string, fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(`/api/download?packageId=${packageId}&fileName=${encodeURIComponent(fileName)}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get the blob and create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reload to update download count
      loadDownloads();
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download. Please try again.');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

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
  };

  if (loading) {
    return (
      <main className="bg-black text-white antialiased min-h-screen">
        <Navigation />
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">Loading your downloads...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-black text-white antialiased min-h-screen">
      <Navigation />

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">My Downloads</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded p-4 mb-6">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {purchases.length === 0 ? (
            <div className="border border-white/10 rounded p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">No Purchases Yet</h2>
              <p className="text-white/60 mb-8">
                Purchase an adapter or the complete suite to access downloads.
              </p>
              <Link
                href="/"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors inline-block"
              >
                Browse Adapters
              </Link>
            </div>
          ) : packages.length === 0 ? (
            <div className="border border-white/10 rounded p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">No Downloads Available</h2>
              <p className="text-white/60">
                Download packages will be available here once they're configured.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {packages.map((pkg) => {
                const adapter = getAdapterBySlug(pkg.adapter_id);
                return (
                  <div
                    key={pkg.id}
                    className="border border-white/10 rounded p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">
                            {adapter?.name || pkg.adapter_id}
                          </h3>
                          <span className="text-xs bg-white/10 px-2 py-1 rounded">
                            v{pkg.version}
                          </span>
                          <span className="text-xs bg-white/10 px-2 py-1 rounded">
                            {getPackageTypeLabel(pkg.package_type)}
                          </span>
                        </div>
                        <p className="text-white/60 mb-2">{pkg.description || pkg.package_name}</p>
                        <div className="flex gap-4 text-sm text-white/40">
                          <span>{formatFileSize(pkg.file_size_bytes)}</span>
                          <span>•</span>
                          <span>{pkg.download_count} downloads</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(pkg.id, pkg.file_name, pkg.file_name)}
                        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-white/90 transition-colors shrink-0"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {purchases.length > 0 && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <h2 className="text-2xl font-bold mb-4">Your Purchases</h2>
              <div className="space-y-4">
                {purchases.map((purchase) => {
                  const adapter = purchase.adapter_id === 'suite' 
                    ? null 
                    : getAdapterBySlug(purchase.adapter_id);
                  return (
                    <div
                      key={purchase.id}
                      className="border border-white/10 rounded p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold">
                          {purchase.adapter_id === 'suite' 
                            ? 'Complete Suite' 
                            : adapter?.name || purchase.adapter_id}
                        </h3>
                        <p className="text-sm text-white/60">
                          ${purchase.price_paid.toLocaleString()} • {purchase.license_type} license
                        </p>
                        <p className="text-xs text-white/40 mt-1">
                          Purchased {new Date(purchase.license_start_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          Active
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

