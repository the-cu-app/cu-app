"use client"

import type { User } from "../login-screen"
import { BarChart3, Users, DollarSign, TrendingUp, Activity, Shield, Settings, FileText } from "lucide-react"

interface DashboardProps {
  user: User
}

export function Dashboard({ user }: DashboardProps) {
  const renderMemberAdvocateMCCDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Member Advocate MCC Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Users className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">247</div>
          <div className="text-sm">Active Members</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Activity className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">18</div>
          <div className="text-sm">Pending Requests</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <TrendingUp className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">94%</div>
          <div className="text-sm">Satisfaction Rate</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-black p-6">
        <h2 className="text-xl font-bold mb-4">Recent Member Interactions</h2>
        <div className="space-y-3">
          {[
            { name: "Sarah Johnson", type: "Account Inquiry", time: "10 mins ago", status: "Resolved" },
            { name: "Michael Chen", type: "Balance Check", time: "25 mins ago", status: "Resolved" },
            { name: "Emily Davis", type: "Card Activation", time: "1 hour ago", status: "In Progress" },
            { name: "David Park", type: "Account Update", time: "2 hours ago", status: "Resolved" },
          ].map((interaction, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{interaction.name}</div>
                <div className="text-sm text-gray-600">{interaction.type}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{interaction.time}</div>
                <div
                  className={`text-xs font-medium ${interaction.status === "Resolved" ? "text-green-600" : "text-yellow-600"}`}
                >
                  {interaction.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMemberAdvocateTellerDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Teller Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <DollarSign className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">$45.2K</div>
          <div className="text-sm opacity-70">Today's Transactions</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Activity className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">32</div>
          <div className="text-sm opacity-70">Transactions Processed</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Users className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">28</div>
          <div className="text-sm opacity-70">Members Served</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <TrendingUp className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">$2.1K</div>
          <div className="text-sm opacity-70">Avg Transaction</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              { member: "John Smith", type: "Deposit", amount: "$1,250.00", time: "5 mins ago" },
              { member: "Lisa Anderson", type: "Withdrawal", amount: "$500.00", time: "12 mins ago" },
              { member: "Robert Taylor", type: "Transfer", amount: "$3,200.00", time: "18 mins ago" },
              { member: "Maria Garcia", type: "Deposit", amount: "$850.00", time: "25 mins ago" },
            ].map((txn, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{txn.member}</div>
                  <div className="text-sm text-gray-600">{txn.type}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600">{txn.amount}</div>
                  <div className="text-xs text-gray-500">{txn.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {[
              { member: "Alex Johnson", type: "Loan Application", amount: "$15,000", priority: "High" },
              { member: "Emma Wilson", type: "Account Opening", amount: "$5,000", priority: "Medium" },
              { member: "Chris Brown", type: "Credit Increase", amount: "$2,500", priority: "Low" },
            ].map((approval, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{approval.member}</div>
                  <div className="text-sm text-gray-600">{approval.type}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{approval.amount}</div>
                  <div
                    className={`text-xs font-medium ${
                      approval.priority === "High"
                        ? "text-red-600"
                        : approval.priority === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {approval.priority} Priority
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderDigitalTransformationDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Digital Transformation Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Activity className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">99.8%</div>
          <div className="text-sm opacity-70">System Uptime</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <BarChart3 className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">1.2M</div>
          <div className="text-sm opacity-70">API Calls Today</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <TrendingUp className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">45ms</div>
          <div className="text-sm opacity-70">Avg Response Time</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Shield className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm opacity-70">Security Incidents</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">Active Projects</h2>
          <div className="space-y-3">
            {[
              { name: "Mobile App v2.0", progress: 75, status: "On Track", team: "5 developers" },
              { name: "API Gateway Upgrade", progress: 60, status: "On Track", team: "3 developers" },
              { name: "AI Chatbot Integration", progress: 40, status: "In Progress", team: "4 developers" },
              { name: "Security Audit", progress: 90, status: "Nearly Complete", team: "2 developers" },
            ].map((project, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-gray-600">{project.progress}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{project.status}</span>
                  <span>{project.team}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">System Health</h2>
          <div className="space-y-4">
            {[
              { service: "Core Banking API", status: "Healthy", uptime: "99.9%", color: "green" },
              { service: "Mobile Backend", status: "Healthy", uptime: "99.8%", color: "green" },
              { service: "Payment Gateway", status: "Healthy", uptime: "100%", color: "green" },
              { service: "Analytics Engine", status: "Warning", uptime: "98.5%", color: "yellow" },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${service.color === "green" ? "bg-green-500" : "bg-yellow-500"}`}
                  />
                  <div>
                    <div className="font-medium">{service.service}</div>
                    <div className="text-sm text-gray-600">{service.status}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{service.uptime}</div>
                  <div className="text-xs text-gray-500">Uptime</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderExecutiveDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Executive Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <DollarSign className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">$12.4M</div>
          <div className="text-sm opacity-70">Total Assets</div>
          <div className="text-xs opacity-60 mt-1">+8.2% from last month</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Users className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">8,547</div>
          <div className="text-sm opacity-70">Total Members</div>
          <div className="text-xs opacity-60 mt-1">+124 this month</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <TrendingUp className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">$2.8M</div>
          <div className="text-sm opacity-70">Loan Portfolio</div>
          <div className="text-xs opacity-60 mt-1">+12.5% growth</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <BarChart3 className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">$485K</div>
          <div className="text-sm opacity-70">Monthly Revenue</div>
          <div className="text-xs opacity-60 mt-1">+6.8% vs target</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">Key Performance Indicators</h2>
          <div className="space-y-4">
            {[
              { metric: "Member Satisfaction", value: "94%", target: "90%", status: "above" },
              { metric: "Loan Approval Rate", value: "87%", target: "85%", status: "above" },
              { metric: "Digital Adoption", value: "76%", target: "80%", status: "below" },
              { metric: "Cost-to-Income Ratio", value: "62%", target: "65%", status: "above" },
            ].map((kpi, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{kpi.metric}</div>
                  <div className={`text-sm font-bold ${kpi.status === "above" ? "text-green-600" : "text-yellow-600"}`}>
                    {kpi.value}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Target: {kpi.target}</span>
                  <span className={kpi.status === "above" ? "text-green-600" : "text-yellow-600"}>
                    {kpi.status === "above" ? "↑ Above Target" : "↓ Below Target"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">Strategic Initiatives</h2>
          <div className="space-y-3">
            {[
              { initiative: "Digital Banking Expansion", status: "On Track", completion: 65 },
              { initiative: "Branch Network Optimization", status: "On Track", completion: 80 },
              { initiative: "Member Experience Program", status: "In Progress", completion: 45 },
              { initiative: "Cybersecurity Enhancement", status: "On Track", completion: 90 },
            ].map((initiative, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{initiative.initiative}</div>
                  <div className="text-xs text-gray-600">{initiative.completion}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${initiative.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Users className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">142</div>
          <div className="text-sm opacity-70">Active Users</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Shield className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm opacity-70">Security Alerts</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <Activity className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">99.9%</div>
          <div className="text-sm opacity-70">System Health</div>
        </div>
        <div className="bg-black text-white p-6 rounded-xl border-2 border-white">
          <FileText className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm opacity-70">Audit Logs Today</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <div className="space-y-3">
            {[
              { name: "Sarah Johnson", role: "Member Advocate MCC", status: "Active", lastLogin: "2 mins ago" },
              { name: "Michael Chen", role: "Teller", status: "Active", lastLogin: "15 mins ago" },
              { name: "Alex Rivera", role: "Digital Transformation", status: "Active", lastLogin: "1 hour ago" },
              { name: "Jennifer Williams", role: "Executive", status: "Inactive", lastLogin: "2 days ago" },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.role}</div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs font-medium ${user.status === "Active" ? "text-green-600" : "text-gray-500"}`}
                  >
                    {user.status}
                  </div>
                  <div className="text-xs text-gray-500">{user.lastLogin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-4">System Configuration</h2>
          <div className="space-y-3">
            {[
              { setting: "Feature Toggles", value: "12 active", icon: Settings },
              { setting: "Security Policies", value: "All compliant", icon: Shield },
              { setting: "Backup Status", value: "Last: 2 hours ago", icon: Activity },
              { setting: "API Rate Limits", value: "Normal", icon: BarChart3 },
            ].map((config, i) => {
              const Icon = config.icon
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div className="font-medium">{config.setting}</div>
                  </div>
                  <div className="text-sm text-gray-600">{config.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-black p-6">
        <h2 className="text-xl font-bold mb-4">Recent Audit Logs</h2>
        <div className="space-y-2">
          {[
            { action: "User Login", user: "sarah.johnson@cu.com", time: "2 mins ago", status: "Success" },
            { action: "Permission Change", user: "admin@cu.com", time: "15 mins ago", status: "Success" },
            { action: "Failed Login Attempt", user: "unknown@email.com", time: "1 hour ago", status: "Failed" },
            { action: "System Configuration", user: "admin@cu.com", time: "2 hours ago", status: "Success" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${log.status === "Success" ? "bg-green-500" : "bg-red-500"}`} />
                <div>
                  <span className="font-medium">{log.action}</span>
                  <span className="text-gray-600"> by {log.user}</span>
                </div>
              </div>
              <div className="text-gray-500">{log.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case "member-advocate-mcc":
      return renderMemberAdvocateMCCDashboard()
    case "member-advocate-teller":
      return renderMemberAdvocateTellerDashboard()
    case "digital-transformation":
      return renderDigitalTransformationDashboard()
    case "executive":
      return renderExecutiveDashboard()
    case "admin":
      return renderAdminDashboard()
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user.name}</p>
        </div>
      )
  }
}
