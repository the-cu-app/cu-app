"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2, Sparkles, Minimize2 } from "lucide-react"
import type { User } from "./login-screen"
import { getRoleDisplayName } from "@/lib/permissions"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  toolCalls?: Array<{
    name: string
    args: any
    result?: any
  }>
}

interface AIAssistantProps {
  user: User
  onClose: () => void
}

// Simulated AI responses based on user role
const getSimulatedResponse = (userMessage: string, role: string): { content: string; toolCalls?: any[] } => {
  const lowerMessage = userMessage.toLowerCase()

  // Member lookup
  if (lowerMessage.includes("look up") || lowerMessage.includes("find member") || lowerMessage.includes("search")) {
    return {
      content: "I'll look up that member for you.",
      toolCalls: [
        {
          name: "lookupMember",
          args: { searchTerm: "John Smith", searchType: "name" },
          result: {
            memberId: "M-12345",
            name: "John Smith",
            accountNumber: "ACC-789456",
            status: "Active",
            joinDate: "2020-03-15",
            balance: "$15,234.56",
          },
        },
      ],
    }
  }

  // Transaction processing
  if (lowerMessage.includes("deposit") || lowerMessage.includes("withdrawal") || lowerMessage.includes("transfer")) {
    return {
      content: "I'll process that transaction for you.",
      toolCalls: [
        {
          name: "processDeposit",
          args: { accountNumber: "12345", amount: 500, type: "cash" },
          result: {
            transactionId: "TXN-98765",
            status: "Success",
            newBalance: "$15,734.56",
            timestamp: new Date().toISOString(),
          },
        },
      ],
    }
  }

  // KPIs and reports
  if (lowerMessage.includes("kpi") || lowerMessage.includes("report") || lowerMessage.includes("metrics")) {
    return {
      content: "Here are today's key performance indicators:",
      toolCalls: [
        {
          name: "viewKPIs",
          args: { period: "today", category: "all" },
          result: {
            newMembers: 12,
            totalTransactions: 1847,
            loanApplications: 8,
            memberSatisfaction: "94%",
            systemUptime: "99.9%",
          },
        },
      ],
    }
  }

  // System health
  if (lowerMessage.includes("system") || lowerMessage.includes("health") || lowerMessage.includes("status")) {
    return {
      content: "System health check complete. All systems operational.",
      toolCalls: [
        {
          name: "checkSystemHealth",
          args: { component: "all" },
          result: {
            api: "Healthy",
            database: "Healthy",
            frontend: "Healthy",
            integrations: "Healthy",
            uptime: "99.9%",
            responseTime: "45ms",
          },
        },
      ],
    }
  }

  // Default response
  return {
    content: `I'm your AI assistant for the Credit Union OS. I can help you with:

• Member lookups and account information
• Processing transactions (deposits, withdrawals, transfers)
• Viewing KPIs and generating reports
• System health checks and diagnostics
• And more based on your role: ${getRoleDisplayName(role as any)}

What would you like help with?`,
  }
}

export function AIAssistant({ user, onClose }: AIAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const response = getSimulatedResponse(input, user.role)
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.content,
        toolCalls: response.toolCalls,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-24 right-4 z-[10000]">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-black text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 hover:bg-gray-900 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">AI Assistant</span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">AI Assistant</h2>
              <p className="text-xs text-gray-300">
                {getRoleDisplayName(user.role)} • {user.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Minimize2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-black/40" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I help you today?</h3>
              <p className="text-sm text-gray-600 mb-6">
                I can help you with member lookups, transactions, reports, and more.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() => handleSuggestionClick("Look up member John Smith")}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                >
                  <div className="font-medium text-sm mb-1">Look up a member</div>
                  <div className="text-xs text-gray-600">Search by name, account, or SSN</div>
                </button>
                <button
                  onClick={() => handleSuggestionClick("Show me today's KPIs")}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                >
                  <div className="font-medium text-sm mb-1">View KPIs</div>
                  <div className="text-xs text-gray-600">See performance metrics</div>
                </button>
                <button
                  onClick={() => handleSuggestionClick("Process a $500 cash deposit for account 12345")}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                >
                  <div className="font-medium text-sm mb-1">Process transaction</div>
                  <div className="text-xs text-gray-600">Deposits, withdrawals, transfers</div>
                </button>
                <button
                  onClick={() => handleSuggestionClick("Check system health")}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                >
                  <div className="font-medium text-sm mb-1">System status</div>
                  <div className="text-xs text-gray-600">View health and diagnostics</div>
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                {message.toolCalls && message.toolCalls.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.toolCalls.map((tool, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="font-medium text-xs text-gray-600 mb-2 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" />
                          Tool: {tool.name}
                        </div>
                        {tool.result && (
                          <div className="text-xs">
                            <div className="font-mono bg-gray-50 rounded p-2">
                              {Object.entries(tool.result).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-1">
                                  <span className="text-gray-600">{key}:</span>
                                  <span className="font-medium">{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
