"use client"

import { useState } from "react"

type EmployeeRole = "admin" | "manager" | "teller" | "member-advocate"

interface IVRSession {
  id: string
  memberName: string
  phone: string
  duration: string
  status: "active" | "pending-approval" | "completed"
  requestType: string
  amount?: number
  assignedTo?: string
  transcript: Array<{ speaker: string; text: string; time: string }>
  memberContext?: {
    checking: number
    savings: number
    lastLogin: string
  }
}

const mockSessions: IVRSession[] = [
  {
    id: "1",
    memberName: "John Doe",
    phone: "+1-813-555-0123",
    duration: "1m 23s",
    status: "pending-approval",
    requestType: "Transfer $500 CHK→SAV",
    amount: 500,
    assignedTo: "Sarah (Teller)",
    transcript: [
      { speaker: "HUME", text: "Welcome to Suncoast Credit Union. How can I help you?", time: "14:34:12" },
      { speaker: "John", text: "What's my checking balance?", time: "14:34:18" },
      { speaker: "HUME", text: "Your checking balance is $2,345.67. Anything else?", time: "14:34:20" },
      { speaker: "John", text: "Transfer $500 to savings", time: "14:34:28" },
      { speaker: "HUME", text: "I'll need a teller to approve that. Connecting you now...", time: "14:34:30" },
    ],
    memberContext: {
      checking: 2345.67,
      savings: 12890.45,
      lastLogin: "Today 9:15 AM",
    },
  },
  {
    id: "2",
    memberName: "Jane Smith",
    phone: "+1-813-555-0456",
    duration: "0m 45s",
    status: "active",
    requestType: "Balance inquiry",
    assignedTo: "Mike (Teller)",
    transcript: [
      { speaker: "HUME", text: "Welcome to Suncoast Credit Union. How can I help you?", time: "14:35:01" },
      { speaker: "Jane", text: "I need my savings balance", time: "14:35:08" },
      { speaker: "HUME", text: "Your savings balance is $8,234.12. Is there anything else?", time: "14:35:10" },
    ],
    memberContext: {
      checking: 1523.45,
      savings: 8234.12,
      lastLogin: "Yesterday 2:30 PM",
    },
  },
  {
    id: "3",
    memberName: "Robert Johnson",
    phone: "+1-813-555-0789",
    duration: "2m 15s",
    status: "pending-approval",
    requestType: "Withdrawal $7,500",
    amount: 7500,
    assignedTo: "Manager approval needed",
    transcript: [
      { speaker: "HUME", text: "Welcome to Suncoast Credit Union. How can I help you?", time: "14:32:45" },
      { speaker: "Robert", text: "I need to withdraw $7,500", time: "14:33:02" },
      { speaker: "HUME", text: "This amount requires manager approval. Please hold...", time: "14:33:05" },
    ],
    memberContext: {
      checking: 45230.89,
      savings: 123456.78,
      lastLogin: "Today 11:22 AM",
    },
  },
]

export function OneScope() {
  const [role, setRole] = useState<EmployeeRole>("teller")
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const getRoleColor = (role: EmployeeRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "teller":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "member-advocate":
        return "bg-orange-100 text-orange-800 border-orange-300"
    }
  }

  const getRolePermissions = (role: EmployeeRole) => {
    switch (role) {
      case "admin":
        return "Full system access • All IVR sessions • Unlimited approvals"
      case "manager":
        return "Department oversight • Approvals up to $10,000"
      case "teller":
        return "Active sessions only • Approvals up to $5,000"
      case "member-advocate":
        return "Customer support • Cannot approve transactions"
    }
  }

  const canViewSession = (session: IVRSession, role: EmployeeRole) => {
    if (role === "admin") return true
    if (role === "manager") return true
    if (role === "teller") return session.status !== "completed"
    if (role === "member-advocate") return session.requestType.includes("inquiry")
    return false
  }

  const canApprove = (amount: number | undefined, role: EmployeeRole) => {
    if (!amount) return true
    if (role === "admin") return true
    if (role === "manager") return amount <= 10000
    if (role === "teller") return amount <= 5000
    return false
  }

  const visibleSessions = mockSessions.filter((session) => canViewSession(session, role))

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">OneScope</h1>
            <p className="text-sm text-gray-600">Employee Control Panel + HUME EVI IVR Monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">Logged in as</div>
              <div className="text-sm font-semibold text-gray-900">
                {role === "admin" && "Admin User"}
                {role === "manager" && "Department Manager"}
                {role === "teller" && "Sarah Johnson"}
                {role === "member-advocate" && "Support Agent"}
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm ${getRoleColor(role)}`}>
              {role.toUpperCase().replace("-", " ")}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">{getRolePermissions(role)}</div>
      </div>

      {/* Role Selector (Demo Mode) */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-yellow-900">Demo Mode - Switch Role:</span>
          <button
            onClick={() => setRole("admin")}
            className={`px-3 py-1 rounded text-xs font-medium ${
              role === "admin" ? "bg-purple-600 text-white" : "bg-white text-purple-700 hover:bg-purple-50"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("manager")}
            className={`px-3 py-1 rounded text-xs font-medium ${
              role === "manager" ? "bg-blue-600 text-white" : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
          >
            Manager
          </button>
          <button
            onClick={() => setRole("teller")}
            className={`px-3 py-1 rounded text-xs font-medium ${
              role === "teller" ? "bg-emerald-600 text-white" : "bg-white text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            Teller
          </button>
          <button
            onClick={() => setRole("member-advocate")}
            className={`px-3 py-1 rounded text-xs font-medium ${
              role === "member-advocate" ? "bg-orange-600 text-white" : "bg-white text-orange-700 hover:bg-orange-50"
            }`}
          >
            Member Advocate
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* IVR Session List */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Active IVR Sessions</h2>
            <p className="text-xs text-gray-500 mt-1">
              {visibleSessions.length} {role === "admin" || role === "manager" ? "total" : "available to you"}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {visibleSessions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No sessions available</p>
                <p className="text-xs mt-2">
                  {role === "member-advocate" && "You can only view balance inquiries"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {visibleSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedSession === session.id ? "bg-emerald-50 border-l-4 border-emerald-600" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-gray-900">{session.memberName}</div>
                      <div className="text-xs text-gray-500">{session.duration}</div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{session.phone}</div>
                    <div className="text-sm text-gray-700 mb-2">{session.requestType}</div>
                    {session.status === "pending-approval" && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">
                          ⚠️ PENDING APPROVAL
                        </span>
                        {session.amount && !canApprove(session.amount, role) && (
                          <span className="text-xs text-red-600 font-semibold">Requires {role === "teller" ? "Manager" : "Admin"}</span>
                        )}
                      </div>
                    )}
                    {session.status === "active" && (
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                          🟢 IN PROGRESS
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">Assigned: {session.assignedTo}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Session Details */}
        <div className="flex-1 overflow-y-auto">
          {selectedSession ? (
            (() => {
              const session = mockSessions.find((s) => s.id === selectedSession)
              if (!session) return null

              return (
                <div className="p-6">
                  {/* Member Context Card */}
                  {session.memberContext && (role === "teller" || role === "manager" || role === "admin") ? (
                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-300 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Member Context</h3>
                        <span className="text-xs text-gray-600">Auto-expires when call ends</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-xs text-gray-500 mb-1">Checking Balance</div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${session.memberContext.checking.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-xs text-gray-500 mb-1">Savings Balance</div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${session.memberContext.savings.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-xs text-gray-500 mb-1">Last Login</div>
                          <div className="text-sm font-semibold text-gray-900">{session.memberContext.lastLogin}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    role === "member-advocate" && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-orange-900">
                          🔒 You do not have permission to view account balances. Balance inquiries are read-only.
                        </p>
                      </div>
                    )
                  )}

                  {/* Live Transcript */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Live Transcript</h3>
                    <div className="space-y-3">
                      {session.transcript.map((line, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-3 ${line.speaker === "HUME" ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-md px-4 py-3 rounded-lg ${
                              line.speaker === "HUME"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <div className="text-xs font-semibold mb-1">
                              {line.speaker} <span className="text-gray-500">• {line.time}</span>
                            </div>
                            <div className="text-sm">{line.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Approval Actions */}
                  {session.status === "pending-approval" && (
                    <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-amber-900 mb-2">⚠️ Approval Required</h3>
                      <p className="text-sm text-amber-800 mb-4">
                        {session.requestType}
                        {session.amount && ` - Amount: $${session.amount.toLocaleString()}`}
                      </p>

                      {canApprove(session.amount, role) ? (
                        <div className="flex gap-3">
                          <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
                            ✓ Approve Transaction
                          </button>
                          <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                            ✗ Deny Transaction
                          </button>
                          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                            ? Request More Info
                          </button>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-sm text-red-900 font-semibold">
                            🚫 You do not have permission to approve this transaction.
                          </p>
                          <p className="text-xs text-red-700 mt-2">
                            {role === "teller" &&
                              session.amount &&
                              session.amount > 5000 &&
                              "Amounts over $5,000 require Manager approval."}
                            {role === "manager" &&
                              session.amount &&
                              session.amount > 10000 &&
                              "Amounts over $10,000 require Admin approval."}
                            {role === "member-advocate" && "Member Advocates cannot approve financial transactions."}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notes Section */}
                  <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Add Note to Member Profile</h3>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"
                      rows={3}
                      placeholder="Add internal notes about this interaction (visible to all staff)..."
                    />
                    <button className="mt-3 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                      Save Note
                    </button>
                  </div>
                </div>
              )
            })()
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
                </svg>
                <p className="text-sm">Select an IVR session to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
