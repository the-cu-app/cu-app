"use client"

export function DesignSystem() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197m0 0h4.102c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.102M10.5 8.197V21m10.125-12.75h-2.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Omni Design System</h2>
          <p className="text-gray-600 mb-6">
            Unified design & content token system with Material 3, supporting dynamic theming, A/B testing, and real-time CMS updates.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Design Tokens</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Colors (semantic light/dark)</li>
                <li>• Spacing scale</li>
                <li>• Typography</li>
                <li>• Motion & animations</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 36+ custom widgets</li>
                <li>• Material 3 compliance</li>
                <li>• Runtime theming</li>
                <li>• CMS integration</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 space-x-3">
            <button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium">
              Open Token Editor
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              View Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
