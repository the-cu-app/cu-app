# 🗄️ SUPABASE DATABASE FULL MAP

**Project:** svaiikywglmwedraxyda.supabase.co
**Total Tables:** 316+

---

## 🔐 CONNECTION INFO

```dart
// Flutter/Dart
await Supabase.initialize(
  url: 'https://svaiikywglmwedraxyda.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWlpa3l3Z2xtd2VkcmF4eWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA1MTcsImV4cCI6MjA3NDQyNjUxN30.sJG8nabJTySS93LrZaoBPvQUSpFK1U-MzMguWqWZSaQ',
);
```

```bash
# cURL
curl -X GET 'https://svaiikywglmwedraxyda.supabase.co/rest/v1/TABLE_NAME?select=*' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWlpa3l3Z2xtd2VkcmF4eWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA1MTcsImV4cCI6MjA3NDQyNjUxN30.sJG8nabJTySS93LrZaoBPvQUSpFK1U-MzMguWqWZSaQ" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWlpa3l3Z2xtd2VkcmF4eWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA1MTcsImV4cCI6MjA3NDQyNjUxN30.sJG8nabJTySS93LrZaoBPvQUSpFK1U-MzMguWqWZSaQ"
```

```javascript
// JavaScript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://svaiikywglmwedraxyda.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWlpa3l3Z2xtd2VkcmF4eWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA1MTcsImV4cCI6MjA3NDQyNjUxN30.sJG8nabJTySS93LrZaoBPvQUSpFK1U-MzMguWqWZSaQ'
)
```

```python
# Python
from supabase import create_client

supabase = create_client(
  "https://svaiikywglmwedraxyda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWlpa3l3Z2xtd2VkcmF4eWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA1MTcsImV4cCI6MjA3NDQyNjUxN30.sJG8nabJTySS93LrZaoBPvQUSpFK1U-MzMguWqWZSaQ"
)
```

```sql
-- PostgreSQL Direct Connection
postgres://postgres.svaiikywglmwedraxyda:i6BffGQMkGellTTV@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

---

## 📊 TABLE CATEGORIES

### 👤 MEMBER & USER MANAGEMENT
- `members` - Core member records
- `members_2024`, `members_2025`, `members_2026` - Partitioned member data
- `member_profiles` - Extended profile info
- `member_preferences` - User preferences
- `member_sessions` - Active sessions
- `member_devices` - Registered devices
- `member_backup_codes` - 2FA backup codes
- `member_biometrics` - Biometric auth data
- `member_security_events` - Security audit trail
- `users` - System users
- `profiles` - User profiles
- `user_sessions` - User session tracking
- `user_settings` - User configuration
- `user_security` - User security settings
- `user_analytics` - User behavior analytics

### 💰 ACCOUNTS & TRANSACTIONS
- `accounts` - Financial accounts
- `account_holders` - Account ownership
- `account_types` - Account type definitions
- `account_statements` - Account statements
- `account_beneficiaries` - Account beneficiaries
- `account_limits` - Account limits/restrictions
- `account_alerts` - Account-based alerts
- `account_fees` - Account fee tracking
- `account_payees` - Saved payees
- `account_services` - Account services
- `transactions` - All transactions
- `transaction_categories` - Transaction categorization
- `transaction_alerts` - Transaction alerts
- `transaction_disputes` - Dispute management
- `transaction_enrichment` - Enhanced transaction data
- `transaction_fees` - Transaction fees
- `balance_history` - Account balance history
- `spending_patterns` - Spending analysis

### 💳 CARDS
- `cards` - Payment cards
- `credit_cards` - Credit card accounts
- `credit_card_transactions` - Credit card transactions

### 🏦 PAYMENTS & TRANSFERS
- `payments` - Payment records
- `payment_methods` - Payment methods
- `transfers` - Fund transfers
- `recurring_transfers` - Scheduled recurring transfers
- `scheduled_payments` - Scheduled payments
- `recurring_transactions` - Recurring transaction templates
- `ach_transfers` - ACH transfer records
- `wire_transfers` - Wire transfer records
- `deposits` - Deposit records
- `withdrawals` - Withdrawal records
- `mobile_deposits` - Mobile check deposits
- `check_images` - Check images
- `check_processing_results` - Check processing status

### 💸 BILL PAY & PAYEES
- `bill_pay` - Bill payment records
- `bill_payments` - Bill payment history
- `bill_pay_recipients` - Bill pay recipients
- `bill_pay_schedules` - Scheduled bill payments
- `payees` - Payee management

### 📱 ZELLE
- `zelle_payment_requests` - Zelle payment requests
- `zelle_recipients` - Zelle recipients
- `zelle_recurring_payments` - Zelle recurring payments

### 🏦 LOANS & CREDIT
- `loans` - Loan accounts
- `loan_applications` - Loan applications
- `loan_payments` - Loan payment history
- `credit_scores` - Credit score tracking
- `interest_rates` - Interest rate management
- `member_debt_tracking` - Debt tracking

### 💼 INVESTMENTS & INSURANCE
- `investment_accounts` - Investment accounts
- `investment_holdings` - Investment portfolio
- `member_investment_holdings` - Member investment data
- `member_investment_portfolio` - Portfolio management
- `insurance_policies` - Insurance policies
- `insurance_claims` - Insurance claims
- `member_insurance_policies` - Member insurance
- `member_insurance_claims` - Member claim history

### 🎯 FINANCIAL WELLNESS
- `financial_goals` - Financial goal tracking
- `member_financial_goals` - Member goals
- `member_savings_goals` - Savings goals
- `member_goals_tracking` - Goal progress
- `budgets` - Budget management
- `budget_categories` - Budget categories
- `financial_wellness_scores` - Wellness scoring
- `member_financial_wellness` - Member wellness data
- `financial_recommendations` - AI recommendations
- `member_financial_recommendations` - Member recommendations
- `insights` - Financial insights
- `cash_flow_forecasts` - Cash flow predictions

### 📊 FINANCIAL TRACKING
- `expenses` - Expense tracking
- `expense_categories` - Expense categories
- `expense_reports` - Expense reports
- `expense_report_items` - Report line items
- `expense_requests` - Expense requests
- `member_spending_categories` - Spending categories
- `member_spending_transactions` - Spending transactions
- `member_financial_profile` - Financial profile
- `member_financial_reports` - Financial reports

### 🧮 CALCULATORS & EDUCATION
- `financial_calculators` - Calculator tools
- `member_financial_calculators` - Member calculator usage
- `calculator_usage` - Calculator analytics
- `financial_education` - Education content
- `member_financial_education` - Member education progress
- `member_education_progress` - Progress tracking
- `member_faqs` - Member FAQ interactions
- `design_faqs` - Design system FAQs
- `developer_faqs` - Developer FAQs
- `staff_training_faqs` - Staff training FAQs

### 🏛️ CREDIT UNION DATA
- `credit_unions` - CU directory
- `federally_insured_cus` - Federally insured CUs
- `ncua_minimal` - NCUA data
- `_stg_ncua_minimal` - Staging NCUA data
- `cu_configurations` - CU configurations
- `cu_feature_flags` - CU feature flags
- `cu_subscriptions` - CU subscriptions
- `cu_api_endpoints` - CU API endpoints
- `cu_usage_logs` - CU usage tracking
- `cu_monthly_usage` - Monthly usage metrics
- `cu_admins` - CU administrators
- `cu_product_marketing_configs` - Product marketing configs
- `cu_animation_chunks` - Animation assets

### 🏢 TENANTS & ORGANIZATIONS
- `tenants` - Multi-tenant data
- `tenant_users` - Tenant users
- `tenant_string_overrides` - String customization
- `tenant_onboarding_steps` - Onboarding flow
- `tenant_domain_verifications` - Domain verification
- `tenant_benchmarks` - Performance benchmarks
- `organizations` - Organization management
- `org_usage_counters` - Usage counters

### 🏪 PRODUCTS & CATALOG
- `product_catalog` - Product catalog
- `product_categories` - Product categories
- `product_features` - Product features
- `product_applications` - Product applications
- `financial_products` - Financial products
- `subscription_plans` - Subscription plans

### 📍 LOCATIONS & BRANCHES
- `branch_locations` - Branch locations
- `atm_locations` - ATM locations
- `states` - State data

### 🎨 DESIGN SYSTEM & COMPONENTS
- `component_catalog` - Component catalog
- `component_definitions` - Component definitions
- `component_props` - Component properties
- `component_system` - Component system
- `component_composition` - Composition rules
- `component_tokens` - Component tokens
- `component_test_summary` - Test results
- `composition_instances` - Component instances
- `flattened_composition_tree` - Composition tree
- `design_tokens` - Design token system
- `token_versions` - Token versions
- `token_overrides` - Token overrides
- `token_dependencies` - Token dependencies
- `token_inheritance` - Token inheritance
- `pattern_tokens` - Pattern tokens
- `screen_tokens` - Screen tokens
- `object_tokens` - Object tokens
- `design_system_tests` - Design system tests

### 🌐 CMS & CONTENT
- `cms_content` - CMS content
- `cms_tokens` - CMS tokens
- `content_blocks` - Content blocks
- `screen_content` - Screen content
- `ui_strings` - UI strings
- `ui_component_strings` - Component strings
- `translation_strings` - Translation keys
- `translation_values` - Translation values
- `string_ab_tests` - String A/B tests
- `feature_content_cache` - Content cache

### 🧪 A/B TESTING & ANALYTICS
- `ab_test_configurations` - A/B test configs
- `ab_test_results` - Test results
- `widget_ab_tests` - Widget tests
- `feature_flag_evaluations` - Feature flag evals
- `widget_analytics` - Widget analytics
- `widget_analytics_events` - Widget events
- `global_widget_analytics` - Global widget data
- `session_analytics` - Session analytics
- `member_analytics` - Member analytics
- `platform_metrics` - Platform metrics
- `user_analytics` - User analytics

### 🎛️ FEATURE FLAGS & TOGGLES
- `feature_flags` - Feature flags
- `feature_toggles` - Feature toggles
- `features_device` - Device features
- `features_member` - Member features
- `cu_feature_flags` - CU feature flags

### 🚨 NOTIFICATIONS & ALERTS
- `notifications` - Notification system
- `sent_notifications` - Sent notifications
- `notification_templates` - Notification templates
- `member_alerts` - Member alerts
- `member_financial_alerts` - Financial alerts
- `fraud_alerts` - Fraud alerts
- `communication_preferences` - Notification preferences

### 💬 MESSAGING & CHAT
- `messages` - Message system
- `chat_messages` - Chat messages
- `chat_conversations` - Conversations
- `chat_sessions` - Chat sessions
- `chat_participants` - Chat participants
- `chat_permissions` - Chat permissions
- `chat_permission_audit` - Permission audit
- `chat_channel_limits` - Channel limits
- `chat_session_limits` - Session limits
- `chats` - Chat records
- `conversations` - Conversation threads
- `banking_messages` - Banking messages
- `sheesh_messages` - Sheesh messages
- `typing_indicators` - Typing indicators
- `rooms` - Chat rooms

### 📞 SUPPORT & TICKETS
- `tickets` - Support tickets
- `cases` - Case management
- `shared_cases` - Shared cases
- `service_requests` - Service requests
- `call_logs` - Call logs
- `call_routing` - Call routing

### 📧 EMAIL & COMMUNICATIONS
- `member_feedback` - Member feedback
- `survey_responses` - Survey responses
- `member_surveys` - Member surveys

### 🔒 AUTHENTICATION & SECURITY
- `mfa_enrollments` - MFA enrollments
- `mfa_tokens` - MFA tokens
- `oauth_clients` - OAuth clients
- `oauth_access_tokens` - Access tokens
- `oauth_refresh_tokens` - Refresh tokens
- `oauth_authorization_codes` - Auth codes
- `api_tokens` - API tokens
- `api_keys` - API keys
- `revoked_tokens` - Revoked tokens
- `verification_attempts` - Verification attempts
- `auth_anomalies` - Auth anomalies
- `kyc_events` - KYC events

### 🔐 PRIVACY & CONSENT
- `consent_registry` - Consent management
- `member_consent_records` - Member consent
- `member_privacy_settings` - Privacy settings
- `terms_acceptances` - Terms acceptance
- `data_retention_policies` - Retention policies
- `data_access_events` - Data access logs
- `data_export_requests` - Export requests
- `authorized_third_parties` - Third party access

### 📜 COMPLIANCE & REGULATORY
- `cfpb_1033_data_requests` - CFPB 1033 requests
- `cfpb_1033_audit_log` - CFPB audit log
- `cfpb_1033_export_formats` - Export formats
- `cfpb_1033_third_party_access` - Third party access
- `compliance_reports` - Compliance reports
- `sanctions_hits` - Sanctions screening
- `risk_assessments` - Risk assessments
- `risk_decisions` - Risk decisions

### 🌍 ISO20022 PAYMENTS
- `iso20022_messages` - ISO20022 messages
- `iso20022_payment_initiations` - Payment initiations
- `iso20022_payment_status` - Payment status
- `iso20022_credit_transfers` - Credit transfers
- `iso20022_direct_debits` - Direct debits
- `iso20022_account_statements` - Account statements
- `iso20022_statement_entries` - Statement entries
- `iso20022_validation_rules` - Validation rules

### 🔍 FRAUD & ANOMALIES
- `anomalies` - Anomaly detection
- `fraud_signals` - Fraud signals
- `behavioral_events` - Behavioral analysis

### 📊 AUDIT & LOGGING
- `audit_logs` - System audit logs
- `audit_trails` - Audit trails
- `admin_audit_log` - Admin audit logs
- `member_activity_logs` - Member activity
- `usage_logs` - Usage logs
- `system_logs` - System logs
- `api_request_logs` - API request logs
- `api_events` - API events
- `event_store` - Event sourcing
- `event_snapshots` - Event snapshots
- `event_subscriptions` - Event subscriptions
- `application_events` - Application events
- `banking_events` - Banking events
- `member_events` - Member events
- `cursor_events` - Cursor events
- `widget_analytics_events` - Widget events
- `license_validation_logs` - License validation
- `validation_logs` - Validation logs

### 🔧 SYSTEM & CONFIGURATION
- `app_configs` - App configuration
- `system_configurations` - System config
- `system_health_checks` - Health checks
- `preferences` - System preferences
- `tool_registry` - Tool registry

### 🛠️ API & WEBHOOKS
- `api_endpoints` - API endpoints
- `api_rate_limits` - Rate limiting
- `rate_limits` - Rate limit rules
- `webhooks` - Webhook config
- `webhook_endpoints` - Webhook endpoints
- `webhook_events` - Webhook events
- `webhook_deliveries` - Webhook delivery logs

### 💳 STRIPE INTEGRATION
- `stripe_customers` - Stripe customers
- `stripe_subscriptions` - Stripe subscriptions
- `stripe_invoices` - Stripe invoices
- `billing_meter_events` - Billing events

### 🏦 VENDORS & PARTNERS
- `vendors` - Vendor directory
- `vendor_api_keys` - Vendor API keys
- `vendor_domains` - Vendor domains
- `vendor_subscriptions` - Vendor subscriptions
- `vendor_branding_assets` - Branding assets
- `vendor_brand_guidelines` - Brand guidelines
- `vendor_logos` - Vendor logos
- `financial_institutions` - Financial institutions
- `merchants` - Merchant directory

### 📦 DOCUMENT MANAGEMENT
- `document_storage` - Document storage
- `document_management` - Document management
- `document_metadata` - Document metadata
- `archived_data` - Archived data
- `audio_files` - Audio files

### 🔄 BACKGROUND JOBS & PROCESSING
- `background_jobs` - Background jobs
- `job_execution_history` - Job history
- `message_queue` - Message queue
- `saga_instances` - Saga instances
- `saga_steps` - Saga steps
- `export_jobs` - Export jobs
- `transformation_requests` - Transformation requests

### 👥 EMPLOYEES & STAFF
- `employees` - Employee records
- `employee_directory` - Employee directory
- `admin_users` - Admin users
- `v_org_staff` - Organization staff view
- `teachers` - Teacher records

### 🏅 REWARDS & REFERRALS
- `member_rewards` - Member rewards
- `member_referrals` - Referral program
- `member_milestones` - Member milestones
- `advocate_profiles` - Advocate profiles

### 📊 WIDGET SYSTEM
- `widget_templates` - Widget templates
- `widget_instances` - Widget instances
- `widget_versions` - Widget versions

### 🎯 TRACKING & SESSIONS
- `tracking_sessions` - Tracking sessions
- `playback_sessions` - Playback sessions
- `online_users` - Online users
- `member_location_history` - Location history

### 🗳️ VOTING & GOVERNANCE
- `votes` - Voting system
- `event_registrations` - Event registrations

### 🤖 AI & ML
- `ai_feedback` - AI feedback
- `ai_model_metrics` - Model metrics

### 📋 FEES & SCHEDULES
- `fees` - Fee definitions
- `fee_schedules` - Fee schedules
- `stop_payments` - Stop payment requests

### 📑 CATEGORIES & TAXONOMY
- `categories` - General categories
- `enum_labels` - Enum labels

### 🗺️ GEOSPATIAL (PostGIS)
- `geography_columns` - Geography columns
- `geometry_columns` - Geometry columns
- `spatial_ref_sys` - Spatial reference systems

### 📊 SQL METADATA
- `sql_features` - SQL features
- `sql_implementation_info` - SQL implementation
- `sql_languages` - SQL languages
- `sql_packages` - SQL packages
- `sql_parts` - SQL parts
- `sql_sizing` - SQL sizing
- `sql_sizing_profiles` - SQL sizing profiles

### 🔑 KEY-VALUE STORE
- `kv_store_32a1062e` - Key-value store

### 📋 VIEWS
- `export_accounts_view` - Account export view
- `export_transactions_view` - Transaction export view
- `v_tenant_active_subscription` - Active subscription view
- `v_tenant_entitlements` - Tenant entitlements view
- `v_user_entitlements` - User entitlements view

### 🎨 MARKETING & PROMOTIONS
- `promotion_manifest` - Promotion manifest
- `pillars` - Marketing pillars
- `pillars_public` - Public pillars

### 📊 OMNI CHANNEL
- `omni_channel_mappings` - Channel mappings

### 🗄️ PARTITIONING & UTILITIES
- `query_log` - Query log
- `validation_message_templates` - Validation templates
- `export_rate_limits` - Export rate limits
- `parties` - Party records

---

## 🚀 QUERY PATTERNS

### Flutter/Dart Examples

```dart
// GET all members
final response = await supabase.from('members').select();

// GET member by ID
final member = await supabase
  .from('members')
  .select()
  .eq('id', memberId)
  .single();

// GET accounts with transactions
final accounts = await supabase
  .from('accounts')
  .select('*, transactions(*)');

// INSERT new transaction
await supabase.from('transactions').insert({
  'member_id': memberId,
  'amount': 100.00,
  'type': 'debit',
  'description': 'Payment'
});

// UPDATE account
await supabase
  .from('accounts')
  .update({'balance': newBalance})
  .eq('id', accountId);

// DELETE (soft delete preferred)
await supabase
  .from('notifications')
  .update({'deleted_at': DateTime.now().toIso8601String()})
  .eq('id', notificationId);

// Real-time subscription
supabase
  .from('transactions')
  .stream(primaryKey: ['id'])
  .listen((data) {
    print('New transaction: $data');
  });
```

### JavaScript Examples

```javascript
// GET with filters
const { data, error } = await supabase
  .from('transactions')
  .select('*')
  .gte('amount', 100)
  .order('created_at', { ascending: false })
  .limit(10);

// GET with joins
const { data } = await supabase
  .from('members')
  .select(`
    *,
    accounts (*),
    transactions (*)
  `)
  .eq('id', memberId);

// Real-time
supabase
  .channel('public:messages')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => console.log(payload)
  )
  .subscribe();
```

### Python Examples

```python
# SELECT
response = supabase.table('members').select("*").execute()

# INSERT
data = supabase.table('transactions').insert({
  "member_id": member_id,
  "amount": 100.00
}).execute()

# UPDATE
supabase.table('accounts').update({
  "balance": new_balance
}).eq('id', account_id).execute()

# DELETE
supabase.table('items').delete().eq('id', item_id).execute()
```

### SQL Direct Access

```sql
-- Connect via psql
psql "postgres://postgres.svaiikywglmwedraxyda:i6BffGQMkGellTTV@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"

-- Query examples
SELECT * FROM members WHERE email = 'user@example.com';
SELECT * FROM accounts WHERE member_id = 'abc123';
SELECT * FROM transactions WHERE created_at > NOW() - INTERVAL '30 days';
```

---

## 🔑 KEY RELATIONSHIPS

```
members
  ├── accounts
  │   ├── transactions
  │   ├── account_statements
  │   └── balance_history
  ├── cards
  ├── loans
  │   └── loan_payments
  ├── investment_accounts
  │   └── investment_holdings
  ├── member_profiles
  ├── member_preferences
  └── member_devices

tenants
  ├── tenant_users
  ├── cu_configurations
  └── tenant_string_overrides

transactions
  ├── transaction_categories
  ├── transaction_disputes
  └── transaction_enrichment
```

---

## 📡 REST API ENDPOINTS

All tables accessible via:
```
GET    /rest/v1/{table_name}
POST   /rest/v1/{table_name}
PATCH  /rest/v1/{table_name}
DELETE /rest/v1/{table_name}
```

**Example:**
```bash
# List transactions
GET https://svaiikywglmwedraxyda.supabase.co/rest/v1/transactions?select=*

# Get specific member
GET https://svaiikywglmwedraxyda.supabase.co/rest/v1/members?id=eq.123

# Filter with operators
GET https://svaiikywglmwedraxyda.supabase.co/rest/v1/transactions?amount=gte.100&created_at=gte.2025-01-01
```

---

## 🎯 COMMON USE CASES

### 1. Member Financial Dashboard
```dart
final data = await supabase.from('members').select('''
  *,
  accounts (*),
  transactions (*, transaction_categories (*)),
  loans (*),
  credit_scores (*)
''').eq('id', memberId).single();
```

### 2. Transaction History with Categories
```dart
final transactions = await supabase
  .from('transactions')
  .select('*, transaction_categories(*), merchants(*)')
  .eq('member_id', memberId)
  .order('created_at', ascending: false)
  .limit(50);
```

### 3. Budget Tracking
```dart
final budgets = await supabase
  .from('budgets')
  .select('*, budget_categories(*), expenses(*)')
  .eq('member_id', memberId);
```

### 4. Payment Initiation
```dart
await supabase.from('payments').insert({
  'member_id': memberId,
  'account_id': accountId,
  'amount': amount,
  'payee_id': payeeId,
  'status': 'pending'
});
```

### 5. Real-time Notifications
```dart
supabase
  .from('notifications')
  .stream(primaryKey: ['id'])
  .eq('member_id', memberId)
  .listen((notification) {
    showNotification(notification);
  });
```

---

## 🔒 SECURITY NOTES

- **Row Level Security (RLS)** should be enabled on all tables
- Use **service_role_key** for admin operations only
- **anon_key** for client-side operations
- Never expose service_role_key in client code
- Implement proper auth checks via Supabase Auth

---

## 📚 USEFUL LINKS

- [Supabase Dashboard](https://supabase.com/dashboard/project/svaiikywglmwedraxyda)
- [API Docs](https://supabase.com/dashboard/project/svaiikywglmwedraxyda/api)
- [Table Editor](https://supabase.com/dashboard/project/svaiikywglmwedraxyda/editor)
- [SQL Editor](https://supabase.com/dashboard/project/svaiikywglmwedraxyda/sql)
- [Auth Settings](https://supabase.com/dashboard/project/svaiikywglmwedraxyda/auth/users)

---

## 🎨 INTEGRATION WITH CU.APP

This database powers the entire CU.APP ecosystem:
- Member financial management
- Multi-tenant CU platform
- Design system + component library
- Real-time banking operations
- Compliance + regulatory tracking
- ISO20022 payment standards
- CFPB 1033 data portability
- AI-powered financial insights

---

**Generated:** 2025-11-03
**Platform:** cu.app
**Database:** svaiikywglmwedraxyda.supabase.co
