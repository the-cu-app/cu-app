"use client"

import type React from "react"
import { User, CreditCard, Zap, BarChart3, Settings } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export type UserRole =
  | "member-advocate-mcc"
  | "member-advocate-teller"
  | "digital-transformation"
  | "executive"
  | "admin"

interface LoginScreenProps {
  onLogin: (user: any) => void
}

// Demo users for each role
const DEMO_USERS: Record<UserRole, any> = {
  "member-advocate-mcc": {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@creditunion.com",
    role: "member-advocate-mcc",
  },
  "member-advocate-teller": {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@creditunion.com",
    role: "member-advocate-teller",
  },
  "digital-transformation": {
    id: "3",
    name: "Alex Rivera",
    email: "alex.rivera@creditunion.com",
    role: "digital-transformation",
  },
  executive: {
    id: "4",
    name: "Jennifer Williams",
    email: "jennifer.williams@creditunion.com",
    role: "executive",
  },
  admin: {
    id: "5",
    name: "David Park",
    email: "david.park@creditunion.com",
    role: "admin",
  },
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Demo login - match email to role
    const user = Object.values(DEMO_USERS).find((u) => u.email === email)

    if (user && password === "demo") {
      onLogin(user)
    } else {
      setError("Invalid credentials. Use any demo email with password: demo")
    }

    setIsLoading(false)
  }

  const handleQuickLogin = (role: UserRole) => {
    onLogin(DEMO_USERS[role])
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white mb-4">
            <Image
              src="/placeholder-logo.svg"
              alt="CU OS Logo"
              width={64}
              height={64}
              priority
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CU OS</h1>
          <p className="text-gray-400">Credit Union Operating System</p>
          <p className="text-sm text-gray-500 mt-1">Powered by FinUX.dev</p>
        </div>

        {/* Login Form - HIGH CONTRAST, ZERO SHADOWS, OUTLINE CARDS */}
        <div className="bg-black rounded-2xl border-2 border-white p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@creditunion.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-2 border-white text-white placeholder:text-gray-400 focus:ring-0 focus:border-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-2 border-white text-white placeholder:text-gray-400 focus:ring-0 focus:border-white"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-white bg-black border-2 border-red-500 rounded-lg p-3 font-medium">{error}</div>
            )}

            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 border-2 border-white font-bold" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Quick Login Options */}
          <div className="mt-8 pt-6 border-t-2 border-white">
            <p className="text-sm text-white font-semibold mb-4 text-center">Quick Login (Demo)</p>
            <div className="space-y-2">
              <Button
                onClick={() => handleQuickLogin("member-advocate-mcc")}
                variant="outline"
                className="w-full justify-start bg-black border-2 border-white text-white hover:bg-white hover:text-black font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                Member Advocate MCC
              </Button>
              <Button
                onClick={() => handleQuickLogin("member-advocate-teller")}
                variant="outline"
                className="w-full justify-start bg-black border-2 border-white text-white hover:bg-white hover:text-black font-medium"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Member Advocate Teller
              </Button>
              <Button
                onClick={() => handleQuickLogin("digital-transformation")}
                variant="outline"
                className="w-full justify-start bg-black border-2 border-white text-white hover:bg-white hover:text-black font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                Digital Transformation
              </Button>
              <Button
                onClick={() => handleQuickLogin("executive")}
                variant="outline"
                className="w-full justify-start bg-black border-2 border-white text-white hover:bg-white hover:text-black font-medium"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Executive
              </Button>
              <Button
                onClick={() => handleQuickLogin("admin")}
                variant="outline"
                className="w-full justify-start bg-black border-2 border-white text-white hover:bg-white hover:text-black font-medium"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Password: <code className="text-gray-400">demo</code>
        </p>
      </div>
    </div>
  )
}
