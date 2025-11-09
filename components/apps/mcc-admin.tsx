"use client"

export function MCCAdmin() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
              <path d="M8 7h8M8 11h8M8 15h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">MCC Admin</h2>
          <p className="text-gray-600 mb-6">
            Next.js CMS for managing Flutter mobile app content, design tokens, and configuration across all credit unions.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Content management</li>
                <li>• Design token editor</li>
                <li>• Feature flags & A/B testing</li>
                <li>• Push notifications</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Controls</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Deep link configuration</li>
                <li>• Multi-tenant isolation</li>
                <li>• Version control</li>
                <li>• Real-time preview</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Launch CMS Builder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
