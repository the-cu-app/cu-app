import type { UserRole } from "@/components/login-screen"

// Define all available features in the system
export type Feature =
  | "dashboard"
  | "members"
  | "accounts"
  | "transactions"
  | "loans"
  | "reports"
  | "settings"
  | "user-management"
  | "system-config"
  | "audit-logs"
  | "analytics"
  | "messaging"
  | "calendar"
  | "notes"
  | "terminal"
  | "finder"

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Feature[]> = {
  "member-advocate-mcc": ["dashboard", "members", "accounts", "transactions", "messaging", "calendar", "notes"],
  "member-advocate-teller": ["dashboard", "members", "accounts", "transactions", "loans", "messaging", "calendar"],
  "digital-transformation": [
    "dashboard",
    "analytics",
    "reports",
    "system-config",
    "terminal",
    "finder",
    "notes",
    "settings",
  ],
  executive: [
    "dashboard",
    "reports",
    "analytics",
    "audit-logs",
    "members",
    "accounts",
    "loans",
    "calendar",
    "messaging",
  ],
  admin: [
    "dashboard",
    "members",
    "accounts",
    "transactions",
    "loans",
    "reports",
    "settings",
    "user-management",
    "system-config",
    "audit-logs",
    "analytics",
    "messaging",
    "calendar",
    "notes",
    "terminal",
    "finder",
  ],
}

// Check if a user has permission to access a feature
export function hasPermission(role: UserRole, feature: Feature): boolean {
  return ROLE_PERMISSIONS[role]?.includes(feature) ?? false
}

// Get all permissions for a role
export function getPermissions(role: UserRole): Feature[] {
  return ROLE_PERMISSIONS[role] ?? []
}

// Get role display name
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    "member-advocate-mcc": "Member Advocate MCC",
    "member-advocate-teller": "Member Advocate Teller",
    "digital-transformation": "Digital Transformation & App Dev",
    executive: "Executive",
    admin: "Administrator",
  }
  return names[role]
}

// Get role description
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    "member-advocate-mcc": "Handle member inquiries, account management, and member services",
    "member-advocate-teller": "Process transactions, manage accounts, and assist with loans",
    "digital-transformation": "Develop and maintain digital systems, analytics, and integrations",
    executive: "View reports, analytics, and high-level member insights",
    admin: "Full system access with user management and configuration capabilities",
  }
  return descriptions[role]
}
