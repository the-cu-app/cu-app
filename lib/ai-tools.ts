import type { UserRole } from "@/components/login-screen"
import type { CoreTool } from "ai"

// Tool definitions for Member Advocate MCC
export const mccTools = {
  lookupMember: {
    description: "Search for a credit union member by name, account number, or SSN",
    parameters: {
      type: "object",
      properties: {
        searchTerm: {
          type: "string",
          description: "Name, account number, or SSN to search for",
        },
        searchType: {
          type: "string",
          enum: ["name", "account", "ssn"],
          description: "Type of search to perform",
        },
      },
      required: ["searchTerm", "searchType"],
    },
  },
  viewMemberHistory: {
    description: "Get interaction history for a member",
    parameters: {
      type: "object",
      properties: {
        memberId: {
          type: "string",
          description: "Member ID to retrieve history for",
        },
        days: {
          type: "number",
          description: "Number of days of history to retrieve (default 30)",
        },
      },
      required: ["memberId"],
    },
  },
  createServiceTicket: {
    description: "Create a support ticket for a member issue",
    parameters: {
      type: "object",
      properties: {
        memberId: {
          type: "string",
          description: "Member ID",
        },
        category: {
          type: "string",
          enum: ["account", "card", "loan", "technical", "other"],
          description: "Ticket category",
        },
        description: {
          type: "string",
          description: "Detailed description of the issue",
        },
        priority: {
          type: "string",
          enum: ["low", "medium", "high", "urgent"],
          description: "Ticket priority level",
        },
      },
      required: ["memberId", "category", "description"],
    },
  },
  checkAccountStatus: {
    description: "View account status and balances for a member",
    parameters: {
      type: "object",
      properties: {
        accountNumber: {
          type: "string",
          description: "Account number to check",
        },
      },
      required: ["accountNumber"],
    },
  },
}

// Tool definitions for Member Advocate Teller
export const tellerTools = {
  ...mccTools,
  processDeposit: {
    description: "Process a cash or check deposit",
    parameters: {
      type: "object",
      properties: {
        accountNumber: {
          type: "string",
          description: "Account number for deposit",
        },
        amount: {
          type: "number",
          description: "Deposit amount",
        },
        type: {
          type: "string",
          enum: ["cash", "check"],
          description: "Type of deposit",
        },
        checkNumber: {
          type: "string",
          description: "Check number (if applicable)",
        },
      },
      required: ["accountNumber", "amount", "type"],
    },
  },
  processWithdrawal: {
    description: "Process a withdrawal with verification",
    parameters: {
      type: "object",
      properties: {
        accountNumber: {
          type: "string",
          description: "Account number for withdrawal",
        },
        amount: {
          type: "number",
          description: "Withdrawal amount",
        },
        idVerified: {
          type: "boolean",
          description: "Whether ID has been verified",
        },
      },
      required: ["accountNumber", "amount", "idVerified"],
    },
  },
  transferFunds: {
    description: "Transfer funds between accounts",
    parameters: {
      type: "object",
      properties: {
        fromAccount: {
          type: "string",
          description: "Source account number",
        },
        toAccount: {
          type: "string",
          description: "Destination account number",
        },
        amount: {
          type: "number",
          description: "Transfer amount",
        },
      },
      required: ["fromAccount", "toAccount", "amount"],
    },
  },
  verifyIdentity: {
    description: "Verify member identity using ID documents",
    parameters: {
      type: "object",
      properties: {
        memberId: {
          type: "string",
          description: "Member ID to verify",
        },
        idType: {
          type: "string",
          enum: ["drivers-license", "passport", "state-id"],
          description: "Type of ID presented",
        },
        idNumber: {
          type: "string",
          description: "ID number",
        },
      },
      required: ["memberId", "idType", "idNumber"],
    },
  },
  printReceipt: {
    description: "Generate and print transaction receipt",
    parameters: {
      type: "object",
      properties: {
        transactionId: {
          type: "string",
          description: "Transaction ID to print receipt for",
        },
      },
      required: ["transactionId"],
    },
  },
}

// Tool definitions for Digital Transformation
export const digitalTools = {
  checkSystemHealth: {
    description: "View system status and health metrics",
    parameters: {
      type: "object",
      properties: {
        component: {
          type: "string",
          enum: ["all", "api", "database", "frontend", "integrations"],
          description: "System component to check",
        },
      },
      required: [],
    },
  },
  deployFeature: {
    description: "Deploy or toggle feature flags",
    parameters: {
      type: "object",
      properties: {
        featureName: {
          type: "string",
          description: "Name of the feature flag",
        },
        enabled: {
          type: "boolean",
          description: "Whether to enable or disable the feature",
        },
        environment: {
          type: "string",
          enum: ["development", "staging", "production"],
          description: "Environment to deploy to",
        },
      },
      required: ["featureName", "enabled", "environment"],
    },
  },
  viewLogs: {
    description: "Access system logs for debugging",
    parameters: {
      type: "object",
      properties: {
        service: {
          type: "string",
          description: "Service name to view logs for",
        },
        level: {
          type: "string",
          enum: ["error", "warn", "info", "debug"],
          description: "Log level to filter by",
        },
        minutes: {
          type: "number",
          description: "Number of minutes of logs to retrieve (default 60)",
        },
      },
      required: ["service"],
    },
  },
  runDiagnostics: {
    description: "Run system diagnostics and health checks",
    parameters: {
      type: "object",
      properties: {
        testType: {
          type: "string",
          enum: ["connectivity", "performance", "security", "full"],
          description: "Type of diagnostic test to run",
        },
      },
      required: ["testType"],
    },
  },
}

// Tool definitions for Executive
export const executiveTools = {
  viewKPIs: {
    description: "View strategic key performance indicators",
    parameters: {
      type: "object",
      properties: {
        period: {
          type: "string",
          enum: ["today", "week", "month", "quarter", "year"],
          description: "Time period for KPIs",
        },
        category: {
          type: "string",
          enum: ["all", "growth", "retention", "revenue", "satisfaction"],
          description: "KPI category to view",
        },
      },
      required: ["period"],
    },
  },
  generateReport: {
    description: "Generate custom analytics reports",
    parameters: {
      type: "object",
      properties: {
        reportType: {
          type: "string",
          enum: ["financial", "member-growth", "branch-performance", "loan-portfolio", "custom"],
          description: "Type of report to generate",
        },
        startDate: {
          type: "string",
          description: "Start date for report (YYYY-MM-DD)",
        },
        endDate: {
          type: "string",
          description: "End date for report (YYYY-MM-DD)",
        },
        format: {
          type: "string",
          enum: ["pdf", "excel", "csv"],
          description: "Report output format",
        },
      },
      required: ["reportType", "startDate", "endDate"],
    },
  },
  viewBranchPerformance: {
    description: "View performance metrics for branches",
    parameters: {
      type: "object",
      properties: {
        branchId: {
          type: "string",
          description: "Specific branch ID (optional, shows all if not provided)",
        },
        metric: {
          type: "string",
          enum: ["all", "transactions", "new-members", "loans", "satisfaction"],
          description: "Metric to view",
        },
      },
      required: [],
    },
  },
  approveRequest: {
    description: "Approve or deny pending requests",
    parameters: {
      type: "object",
      properties: {
        requestId: {
          type: "string",
          description: "Request ID to approve/deny",
        },
        action: {
          type: "string",
          enum: ["approve", "deny"],
          description: "Action to take",
        },
        notes: {
          type: "string",
          description: "Optional notes for the decision",
        },
      },
      required: ["requestId", "action"],
    },
  },
}

// Tool definitions for Admin
export const adminTools = {
  ...tellerTools,
  ...digitalTools,
  ...executiveTools,
  manageUsers: {
    description: "Manage user accounts (create, update, delete)",
    parameters: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["create", "update", "delete", "list"],
          description: "User management action",
        },
        userId: {
          type: "string",
          description: "User ID (for update/delete)",
        },
        userData: {
          type: "object",
          description: "User data (for create/update)",
        },
      },
      required: ["action"],
    },
  },
  configurePermissions: {
    description: "Configure role-based permissions",
    parameters: {
      type: "object",
      properties: {
        role: {
          type: "string",
          enum: ["member-advocate-mcc", "member-advocate-teller", "digital-transformation", "executive", "admin"],
          description: "Role to configure",
        },
        permissions: {
          type: "array",
          items: { type: "string" },
          description: "Array of permission strings",
        },
      },
      required: ["role", "permissions"],
    },
  },
  viewAuditLog: {
    description: "View security audit logs",
    parameters: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "Filter by specific user ID",
        },
        action: {
          type: "string",
          description: "Filter by action type",
        },
        startDate: {
          type: "string",
          description: "Start date (YYYY-MM-DD)",
        },
        endDate: {
          type: "string",
          description: "End date (YYYY-MM-DD)",
        },
      },
      required: [],
    },
  },
  systemConfiguration: {
    description: "Modify system configuration settings",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["security", "integrations", "features", "notifications", "general"],
          description: "Configuration category",
        },
        setting: {
          type: "string",
          description: "Setting name to modify",
        },
        value: {
          type: "string",
          description: "New value for the setting",
        },
      },
      required: ["category", "setting", "value"],
    },
  },
}

// Get tools for a specific role
export function getToolsForRole(role: UserRole): Record<string, CoreTool> {
  switch (role) {
    case "member-advocate-mcc":
      return mccTools as Record<string, CoreTool>
    case "member-advocate-teller":
      return tellerTools as Record<string, CoreTool>
    case "digital-transformation":
      return digitalTools as Record<string, CoreTool>
    case "executive":
      return executiveTools as Record<string, CoreTool>
    case "admin":
      return adminTools as Record<string, CoreTool>
    default:
      return {}
  }
}
