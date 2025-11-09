"use client"

export function EmployeeHandbook() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Employee Handbook Admin</h2>
          <p className="text-gray-600 mb-6">
            Multi-tenant admin portal for managing employee handbooks, training modules, and onboarding workflows across credit unions.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5-step onboarding wizard</li>
                <li>• Training module management</li>
                <li>• Email campaigns</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Tech Stack</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 14</li>
                <li>• TypeScript</li>
                <li>• Supabase</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Launch Full Application
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
