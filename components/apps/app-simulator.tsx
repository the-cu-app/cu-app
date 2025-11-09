"use client"

import { useState } from "react"

export function AppSimulator() {
  const [primaryColor, setPrimaryColor] = useState("#1a73e8")
  const [secondaryColor, setSecondaryColor] = useState("#34a853")
  const [accentColor, setAccentColor] = useState("#fbbc04")

  return (
    <div className="h-full flex bg-gray-50">
      {/* Control Panel */}
      <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">App Simulator</h2>
        <p className="text-sm text-gray-600 mb-6">
          Simple controls to customize your Flutter app. Changes apply in real-time.
        </p>

        <div className="space-y-6">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors font-medium text-sm">
              Apply to Flutter App
            </button>
            <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium text-sm">
              Reset to Default
            </button>
          </div>

          {/* Info */}
          <div className="p-3 bg-blue-50 rounded text-xs text-blue-900">
            <strong>Behind the scenes:</strong> These simple controls generate a complete design token JSON that updates Supabase and triggers your Flutter app rebuild.
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* Phone Frame */}
          <div
            className="w-80 h-[600px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden"
            style={{ borderWidth: "12px" }}
          >
            {/* Status Bar */}
            <div className="h-8 bg-gray-900 flex items-center justify-between px-6 text-white text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-3 bg-white rounded-sm" />
                <div className="w-4 h-3 bg-white rounded-sm" />
                <div className="w-4 h-3 bg-white rounded-sm" />
              </div>
            </div>

            {/* App Content */}
            <div className="h-full bg-gray-50 p-6">
              {/* Header */}
              <div
                className="p-4 rounded-lg mb-4 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <h3 className="text-lg font-bold">Welcome to CU.app</h3>
                <p className="text-sm opacity-90">Your credit union, your way</p>
              </div>

              {/* Account Cards */}
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Checking</span>
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: secondaryColor }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$2,345.67</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Savings</span>
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$12,890.45</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full mt-6 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                Transfer Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
