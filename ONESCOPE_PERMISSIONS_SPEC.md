# OneScope Employee Permission Specification
## Multi-Level RBAC for Credit Union Staff + HUME EVI IVR Integration

**Date:** 2025-11-08
**Status:** Active Implementation

---

## Overview

OneScope is the employee control panel for credit union staff, providing role-based access to:
- Teller transaction processing
- Member account management
- HUME EVI voice AI IVR monitoring
- Compliance oversight
- Payment processing

**Key Principle:** Employees DO NOT control the UI directly. They troubleshoot member issues via monitored IVR sessions and approve transactions through permission-gated workflows.

---

## Employee Role Hierarchy

### 1. Admin (Level 4)
**Access:** Full system control

**Permissions:**
- ✅ View all IVR sessions (real-time + historical)
- ✅ Access all member accounts
- ✅ Override transaction limits
- ✅ Approve/deny all transaction types
- ✅ Configure HUME EVI settings
- ✅ Manage employee roles
- ✅ Export compliance reports
- ✅ Access audit logs

**IVR Capabilities:**
- Monitor all active calls
- Join calls to assist (supervisor mode)
- Review call transcripts
- Configure HUME AI responses
- Set transaction approval thresholds

**UI Components:**
- Full dashboard access
- IVR monitoring panel (all agents)
- Transaction approval queue (unlimited)
- Compliance dashboard
- System settings

---

### 2. Manager (Level 3)
**Access:** Department oversight

**Permissions:**
- ✅ View IVR sessions for their department
- ✅ Access member accounts (read-only unless approved)
- ✅ Approve transactions up to $10,000
- ✅ Monitor teller activity
- ✅ Review call quality metrics
- ❌ Cannot configure HUME settings
- ❌ Cannot modify employee roles
- ✅ Export department reports

**IVR Capabilities:**
- Monitor department calls only
- Review transcripts for their team
- Escalate complex issues to Admin
- Quality assurance scoring

**UI Components:**
- Department dashboard
- IVR monitoring panel (department filter)
- Transaction approval queue (up to $10k)
- Team performance metrics

---

### 3. Teller (Level 2)
**Access:** Transaction processing

**Permissions:**
- ✅ View active IVR sessions they're assisting
- ✅ Access member accounts during active session only
- ✅ Process transactions up to $5,000
- ✅ Verify member identity
- ❌ Cannot monitor other teller calls
- ❌ Cannot access historical transcripts
- ❌ Cannot export reports

**IVR Capabilities:**
- See when member requests teller assistance
- View member context (name, account balances, recent transactions)
- Approve/deny transactions during call
- Add notes to member profile
- Session expires when call ends

**UI Components:**
- Active call notification panel
- Member context card (temporary)
- Transaction approval buttons
- Quick actions (deposit, withdrawal, transfer)

---

### 4. Member Advocate (Level 1)
**Access:** Customer support

**Permissions:**
- ✅ View IVR sessions they're assigned to
- ✅ Access member contact info + limited account data
- ✅ Cannot approve transactions
- ✅ Can escalate to Teller/Manager
- ❌ Cannot process payments
- ❌ Cannot see full account balances

**IVR Capabilities:**
- Answer member questions
- Explain account features
- Troubleshoot app issues
- Escalate financial transactions
- View sanitized call transcripts

**UI Components:**
- Support queue
- Member profile (limited view)
- Knowledge base search
- Escalation button

---

## HUME EVI IVR Integration

### Architecture

```
Member calls +1-813-736-5086
    ↓
Twilio receives call
    ↓
Webhook → /ivr/incoming (OneScope backend)
    ↓
Authenticate member (voice PIN or phone number)
    ↓
Connect to HUME EVI WebSocket
    ↓
HUME greets: "Welcome to [Credit Union]. How can I help you today?"
    ↓
Member speaks: "What's my checking balance?"
    ↓
HUME understands intent → Calls tool: check_balance
    ↓
OneScope API → /api/ivr/check-balance (requires session auth)
    ↓
Supabase query: SELECT balance FROM accounts WHERE member_id = ?
    ↓
Return: { "account": "Checking", "balance": 2345.67 }
    ↓
HUME responds: "Your checking account balance is $2,345.67. Anything else?"
    ↓
Member: "Transfer $500 to savings"
    ↓
HUME: "I'll need a teller to approve that. Connecting you now..."
    ↓
OneScope notifies available Teller (Level 2+)
    ↓
Teller sees: [Member: John Doe | Request: Transfer $500 CHK→SAV]
    ↓
Teller clicks "Approve" in OneScope UI
    ↓
HUME: "Your transfer has been approved. $500 is now in your savings."
```

### Real-Time Employee Dashboard

**For Tellers (Level 2):**
```
┌─────────────────────────────────────────────────┐
│  Active IVR Session - John Doe                  │
├─────────────────────────────────────────────────┤
│  Phone: +1-813-555-0123                         │
│  Session Started: 2:34 PM (1m 23s ago)          │
│                                                  │
│  Member Context:                                │
│  • Checking: $2,345.67                          │
│  • Savings: $12,890.45                          │
│  • Last login: Today 9:15 AM                    │
│                                                  │
│  Live Transcript:                               │
│  [HUME]: How can I help you?                    │
│  [John]: Transfer $500 to savings               │
│  [HUME]: I'll need approval. Connecting teller. │
│                                                  │
│  ⚠️ PENDING APPROVAL                            │
│  Transfer: $500.00 Checking → Savings           │
│                                                  │
│  [Approve] [Deny] [Request More Info]           │
└─────────────────────────────────────────────────┘
```

**For Managers (Level 3):**
```
┌─────────────────────────────────────────────────┐
│  Department IVR Activity (5 active calls)       │
├─────────────────────────────────────────────────┤
│  Teller: Sarah    | Member: John Doe            │
│  Status: Awaiting approval | Amount: $500       │
│  [Monitor Call] [Override]                      │
├─────────────────────────────────────────────────┤
│  Teller: Mike     | Member: Jane Smith          │
│  Status: In progress | Request: Balance inquiry │
│  [Monitor Call]                                 │
└─────────────────────────────────────────────────┘
```

---

## Safe Integration from SHEESH-pay-ai

### What We're Adapting

**From SHEESH-pay-ai:**
- ✅ `/api/ivr/check-balance` → Check member account balance
- ✅ `/api/ivr/recent-transactions` → Get last 5 transactions
- ✅ `/api/ivr/transfer` → Process transfer between accounts
- ✅ HUME EVI tool definitions
- ✅ Twilio webhook handling

**What We're Adding for OneScope:**
1. **Employee Authentication Layer**
   - Every IVR API call includes `employee_session_id`
   - Supabase RLS policies enforce role-based access
   - Example: Tellers can only see accounts during active IVR session

2. **Audit Logging**
   ```sql
   CREATE TABLE ivr_employee_actions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     employee_id UUID REFERENCES employees(id),
     member_id UUID REFERENCES members(id),
     action TEXT, -- 'approved_transfer', 'denied_transfer', 'viewed_balance'
     session_id UUID REFERENCES ivr_sessions(id),
     timestamp TIMESTAMPTZ DEFAULT NOW(),
     ip_address TEXT,
     role TEXT -- 'teller', 'manager', 'admin'
   );
   ```

3. **Real-Time Notifications**
   - When HUME needs approval → Broadcast to Supabase real-time channel
   - Available Tellers see notification instantly
   - First to claim the session gets exclusive access

4. **Session-Based Data Access**
   ```sql
   -- Tellers can only access member data during active call
   CREATE POLICY "tellers_active_sessions" ON accounts
   FOR SELECT
   USING (
     auth.role() = 'teller' AND
     EXISTS (
       SELECT 1 FROM ivr_sessions
       WHERE member_id = accounts.member_id
       AND assigned_employee_id = auth.uid()
       AND status = 'active'
       AND ended_at IS NULL
     )
   );
   ```

---

## Security Safeguards

### Data Minimization
- **Tellers:** Only see member data during active call + 2 minutes after
- **Member Advocates:** Never see full account balances (show "Available" instead)
- **Managers:** Read-only access unless specifically approving transaction

### Multi-Factor Approval
```typescript
// For transactions > $5,000
if (amount > 5000) {
  // Teller initiates
  await createApprovalRequest({
    teller_id: currentEmployee.id,
    member_id: session.member_id,
    amount,
    type: 'transfer'
  })

  // Manager must approve
  // HUME tells member: "This requires manager approval. Please hold."

  // Notify managers via WebSocket
  supabase.channel('manager-approvals').send({
    type: 'approval_needed',
    request_id: approvalRequest.id
  })
}
```

### Automatic Session Expiry
```typescript
// Close IVR session when call ends
twilioClient.on('call-ended', async (callSid) => {
  const session = await getSessionByCallSid(callSid)

  // Mark session ended
  await supabase
    .from('ivr_sessions')
    .update({
      ended_at: new Date(),
      status: 'completed'
    })
    .eq('call_sid', callSid)

  // Revoke teller access immediately
  await revokeTemporaryAccess(session.assigned_employee_id, session.member_id)
})
```

### IP Whitelisting
- IVR API endpoints only accessible from:
  - CU-OS frontend (authenticated employees)
  - Twilio IP ranges
  - HUME EVI service IPs

---

## IVR API Endpoints (Secured)

### POST /api/ivr/check-balance
**Auth Required:** Employee session OR active IVR call
**Rate Limited:** 10/minute per member

**Request:**
```json
{
  "member_id": "uuid",
  "account_type": "checking",
  "employee_session_id": "uuid", // if employee-initiated
  "ivr_session_id": "uuid" // if HUME-initiated
}
```

**Response:**
```json
{
  "success": true,
  "account": "Checking",
  "balance": 2345.67,
  "available": 2345.67,
  "employee_access_expires": "2025-11-08T14:37:00Z"
}
```

**Permissions:**
- Admin/Manager: Anytime
- Teller: Only during active IVR session
- Member Advocate: Never (redirects to Teller)

---

### POST /api/ivr/transfer
**Auth Required:** Teller+ with active session
**Rate Limited:** 5/minute per member

**Request:**
```json
{
  "member_id": "uuid",
  "from_account": "checking",
  "to_account": "savings",
  "amount": 500.00,
  "employee_id": "uuid",
  "approval_note": "Member verified via voice PIN"
}
```

**Approval Flow:**
1. Amount ≤ $5,000 → Teller approves instantly
2. Amount $5,001-$10,000 → Manager approval required
3. Amount > $10,000 → Admin approval required

**Response:**
```json
{
  "success": true,
  "transaction_id": "uuid",
  "new_balances": {
    "checking": 1845.67,
    "savings": 13390.45
  },
  "approved_by": "Sarah Johnson (Teller)",
  "timestamp": "2025-11-08T14:35:22Z"
}
```

---

## OneScope UI Components

### 1. IVR Monitoring Panel
**File:** `components/apps/onescope/ivr-monitor.tsx`

**Features:**
- Live call list (filtered by role)
- Click to view member context
- Approve/deny transactions
- Add notes to member profile
- Escalate to higher role

### 2. Transaction Approval Queue
**File:** `components/apps/onescope/approval-queue.tsx`

**Features:**
- Pending approvals sorted by urgency
- One-click approve/deny
- Request more information from member
- Audit trail visible

### 3. Member Context Card
**File:** `components/apps/onescope/member-context.tsx`

**Features:**
- Shown ONLY during active IVR session
- Auto-hides when call ends
- Shows: Name, account balances, recent transactions (5), last login
- Permission-based field masking

---

## HUME Configuration Changes

### Tool Definitions for OneScope

```typescript
const humeTools = [
  {
    name: "check_balance",
    description: "Check member account balance. Always available.",
    parameters: {
      account_type: "checking | savings | money_market"
    },
    handler: async (params, session) => {
      // Direct call to Supabase
      const { data } = await supabase
        .from('accounts')
        .select('balance, available_balance')
        .eq('member_id', session.member_id)
        .eq('type', params.account_type)
        .single()

      return data
    }
  },
  {
    name: "transfer_funds",
    description: "Transfer money between accounts. REQUIRES TELLER APPROVAL.",
    parameters: {
      from_account: "string",
      to_account: "string",
      amount: "number"
    },
    handler: async (params, session) => {
      // Notify available tellers
      const approval = await requestTellerApproval({
        session_id: session.id,
        member_id: session.member_id,
        ...params
      })

      // HUME waits for teller response (via WebSocket)
      const result = await waitForApproval(approval.id, timeout: 60000)

      if (result.approved) {
        // Process transfer
        return await processTransfer(params, result.approved_by)
      } else {
        return { error: "Transfer denied by teller", reason: result.denial_reason }
      }
    }
  },
  {
    name: "connect_to_teller",
    description: "Connect member directly to live teller for complex issues",
    handler: async (params, session) => {
      // Find available teller
      const teller = await findAvailableTeller(session.credit_union_id)

      // Assign session
      await assignSession(session.id, teller.id)

      // Notify teller via real-time channel
      supabase.channel('teller-queue').send({
        type: 'new_session',
        session_id: session.id,
        member_name: session.member_name
      })

      return { message: "Connecting to teller...", teller_name: teller.name }
    }
  }
]
```

---

## Compliance & Audit

### Required Logging

**Every employee action logs:**
- Who (employee ID + role)
- What (action type)
- When (timestamp)
- Why (reason/note)
- Where (IP address)
- Which member (member ID)
- Session context (IVR session ID)

**Retention:**
- IVR call recordings: 7 years (NCUA requirement)
- Transcripts: 7 years
- Employee action logs: Indefinite
- Member data access logs: 7 years

### Reports

**Daily:**
- IVR session count by credit union
- Average handle time
- Approval/denial rates
- Employee utilization

**Monthly:**
- Quality assurance scores
- Member satisfaction (post-call survey)
- Fraud detection metrics
- Compliance violations

---

## Next Steps

1. **Create Supabase Tables**
   - `ivr_sessions`
   - `ivr_employee_actions`
   - `approval_requests`

2. **Implement RLS Policies**
   - Session-based access for Tellers
   - Department-based access for Managers
   - Audit logging for all roles

3. **Build OneScope UI Components**
   - IVR monitoring panel
   - Transaction approval queue
   - Member context card

4. **Integrate HUME EVI**
   - Copy tool handlers from SHEESH-pay-ai
   - Add employee approval workflow
   - Configure Twilio webhooks

5. **Testing**
   - Test call flow for each role
   - Verify RLS policies work
   - Load test with 100+ concurrent calls

---

**End of OneScope Permissions Specification**
