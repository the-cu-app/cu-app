'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { getTrappedEvents, isBehaviorFormed } from '@/lib/purpose-system';

interface TrappedEvent {
  id: string;
  feature: string;
  action: string;
  member_id: string;
  event_type: string;
  context: any;
  plaid_account_id?: string;
  stripe_payment_method_id?: string;
  created_at: string;
}

export default function PurposeMonitorPage() {
  const [trappedEvents, setTrappedEvents] = useState<TrappedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string>('');

  useEffect(() => {
    loadTrappedEvents();
  }, [selectedFeature]);

  async function loadTrappedEvents() {
    setLoading(true);
    const result = await getTrappedEvents(selectedFeature || undefined);
    if (result.success) {
      setTrappedEvents(result.data || []);
    }
    setLoading(false);
  }

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white antialiased min-h-screen">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-2">Purpose Monitor</h1>
          <p className="text-black/60 dark:text-white/60 mb-8">
            View trapped events - events that tried to activate without purpose, Plaid, or Stripe verification
          </p>

          {/* Filters */}
          <div className="mb-6">
            <select
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2"
            >
              <option value="">All Features</option>
              <option value="account_transfer">Account Transfer</option>
              <option value="payment_processing">Payment Processing</option>
              <option value="balance_inquiry">Balance Inquiry</option>
              <option value="account_maintenance">Account Maintenance</option>
            </select>
          </div>

          {/* Trapped Events */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-black/60 dark:text-white/60">Loading trapped events...</p>
            </div>
          ) : trappedEvents.length === 0 ? (
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-12 text-center">
              <p className="text-black/60 dark:text-white/60">No trapped events found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trappedEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-black/10 dark:border-white/10 rounded-lg p-6 bg-black/5 dark:bg-white/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        {event.feature} / {event.action}
                      </h3>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        Member: {event.member_id || 'Global'} • Type: {event.event_type}
                      </p>
                    </div>
                    <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded">
                      Trapped
                    </span>
                  </div>

                  {(event.plaid_account_id || event.stripe_payment_method_id) && (
                    <div className="mb-2">
                      <div className="flex items-center gap-2 text-sm">
                        {event.plaid_account_id && (
                          <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs">
                            Plaid Required
                          </span>
                        )}
                        {event.stripe_payment_method_id && (
                          <span className="bg-purple-500/20 text-purple-600 dark:text-purple-400 px-2 py-1 rounded text-xs">
                            Stripe Required
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-black/40 dark:text-white/40">
                    {new Date(event.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

