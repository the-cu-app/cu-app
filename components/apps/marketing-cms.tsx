"use client"

export function MarketingCMS() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Marketing CMS</h2>
          <p className="text-gray-600 mb-6">
            Strapi-based headless CMS for managing cu.app marketing website content, landing pages, and promotional campaigns.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Content Types</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Landing pages</li>
                <li>• Blog posts</li>
                <li>• Feature highlights</li>
                <li>• Testimonials</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• WYSIWYG editor</li>
                <li>• Media library</li>
                <li>• SEO management</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
              Open Strapi Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
