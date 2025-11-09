-- Purpose-Driven Privacy System Migration
-- Apple-style purpose-based activation with Plaid integration
-- Only activates features/loads PII when purpose is declared

-- ============================================================================
-- 1. PURPOSE REGISTRY (Like Apple's Privacy Manifest)
-- ============================================================================

CREATE TABLE IF NOT EXISTS purpose_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature TEXT NOT NULL, -- e.g., 'account_transfer', 'payment_processing'
  action TEXT NOT NULL, -- e.g., 'execute', 'view_balance', 'schedule_payment'
  purpose TEXT NOT NULL, -- Human-readable purpose description
  required_pii TEXT[] DEFAULT ARRAY[]::TEXT[], -- PII required for this purpose
  optional_pii TEXT[] DEFAULT ARRAY[]::TEXT[], -- PII optional for this purpose
  behavior_formation JSONB, -- { pattern_count: 3, time_window: 24 } - hours
  plaid_enabled BOOLEAN DEFAULT false, -- Requires Plaid account linking
  stripe_enabled BOOLEAN DEFAULT false, -- Requires Stripe payment processing
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(feature, action)
);

CREATE INDEX IF NOT EXISTS idx_purpose_registry_feature ON purpose_registry(feature);
CREATE INDEX IF NOT EXISTS idx_purpose_registry_action ON purpose_registry(action);

-- ============================================================================
-- 2. PLAID ACCOUNTS (Account Linking via Plaid)
-- ============================================================================

CREATE TABLE IF NOT EXISTS plaid_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  plaid_item_id TEXT NOT NULL,
  plaid_access_token TEXT NOT NULL, -- Encrypted
  institution_id TEXT,
  institution_name TEXT,
  account_id TEXT NOT NULL,
  account_name TEXT,
  account_type TEXT, -- 'checking', 'savings', 'credit', etc.
  account_subtype TEXT,
  mask TEXT, -- Last 4 digits
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  micro_deposit_1 DECIMAL(10,2),
  micro_deposit_2 DECIMAL(10,2),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(member_id, account_id)
);

CREATE INDEX IF NOT EXISTS idx_plaid_accounts_member ON plaid_accounts(member_id);
CREATE INDEX IF NOT EXISTS idx_plaid_accounts_item ON plaid_accounts(plaid_item_id);
CREATE INDEX IF NOT EXISTS idx_plaid_accounts_verification ON plaid_accounts(verification_status);

-- ============================================================================
-- 3. STRIPE PAYMENT METHODS (Stripe Integration)
-- ============================================================================

CREATE TABLE IF NOT EXISTS stripe_payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_payment_method_id TEXT NOT NULL,
  payment_method_type TEXT NOT NULL, -- 'card', 'bank_account', 'us_bank_account'
  card_brand TEXT, -- 'visa', 'mastercard', etc.
  card_last4 TEXT,
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  bank_account_type TEXT, -- 'checking', 'savings'
  bank_account_last4 TEXT,
  bank_name TEXT,
  is_default BOOLEAN DEFAULT false,
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(member_id, stripe_payment_method_id)
);

CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_member ON stripe_payment_methods(member_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_customer ON stripe_payment_methods(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_type ON stripe_payment_methods(payment_method_type);

-- ============================================================================
-- 4. TRAPPED EVENTS (Event Trapping System)
-- ============================================================================

CREATE TABLE IF NOT EXISTS trapped_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature TEXT NOT NULL,
  action TEXT NOT NULL,
  member_id TEXT,
  event_type TEXT NOT NULL, -- 'purpose_denied', 'error', 'behavior_pattern', 'plaid_required', 'stripe_required'
  context JSONB, -- Event context/data
  error_message TEXT,
  stack_trace TEXT,
  plaid_account_id UUID REFERENCES plaid_accounts(id),
  stripe_payment_method_id UUID REFERENCES stripe_payment_methods(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trapped_events_feature ON trapped_events(feature);
CREATE INDEX IF NOT EXISTS idx_trapped_events_member ON trapped_events(member_id);
CREATE INDEX IF NOT EXISTS idx_trapped_events_type ON trapped_events(event_type);
CREATE INDEX IF NOT EXISTS idx_trapped_events_created ON trapped_events(created_at);

-- ============================================================================
-- 5. BEHAVIOR PATTERNS (Repeated Pattern Tracking)
-- ============================================================================

CREATE TABLE IF NOT EXISTS behavior_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature TEXT NOT NULL,
  action TEXT NOT NULL,
  member_id TEXT NOT NULL,
  pattern_count INTEGER DEFAULT 1,
  first_occurrence TIMESTAMPTZ DEFAULT now(),
  last_occurrence TIMESTAMPTZ DEFAULT now(),
  time_window_hours INTEGER DEFAULT 24,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(feature, action, member_id)
);

CREATE INDEX IF NOT EXISTS idx_behavior_patterns_feature ON behavior_patterns(feature);
CREATE INDEX IF NOT EXISTS idx_behavior_patterns_member ON behavior_patterns(member_id);
CREATE INDEX IF NOT EXISTS idx_behavior_patterns_count ON behavior_patterns(pattern_count);

-- ============================================================================
-- 6. FORMED BEHAVIORS (Behaviors That Have Emerged)
-- ============================================================================

CREATE TABLE IF NOT EXISTS formed_behaviors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature TEXT NOT NULL,
  action TEXT NOT NULL,
  member_id TEXT NOT NULL,
  behavior_formed BOOLEAN DEFAULT false,
  formed_at TIMESTAMPTZ,
  pattern_count_at_formation INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(feature, action, member_id)
);

CREATE INDEX IF NOT EXISTS idx_formed_behaviors_feature ON formed_behaviors(feature);
CREATE INDEX IF NOT EXISTS idx_formed_behaviors_member ON formed_behaviors(member_id);
CREATE INDEX IF NOT EXISTS idx_formed_behaviors_formed ON formed_behaviors(behavior_formed);

-- ============================================================================
-- 7. PII ACCESS LOG (Privacy Audit Trail)
-- ============================================================================

CREATE TABLE IF NOT EXISTS pii_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  feature TEXT NOT NULL,
  action TEXT NOT NULL,
  purpose TEXT NOT NULL,
  accessed_pii TEXT[] NOT NULL,
  access_granted BOOLEAN NOT NULL,
  plaid_verified BOOLEAN DEFAULT false,
  stripe_verified BOOLEAN DEFAULT false,
  behavior_formed BOOLEAN DEFAULT false,
  accessed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pii_access_member ON pii_access_log(member_id);
CREATE INDEX IF NOT EXISTS idx_pii_access_feature ON pii_access_log(feature);
CREATE INDEX IF NOT EXISTS idx_pii_access_granted ON pii_access_log(access_granted);
CREATE INDEX IF NOT EXISTS idx_pii_access_created ON pii_access_log(accessed_at);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE purpose_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE plaid_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE trapped_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavior_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE formed_behaviors ENABLE ROW LEVEL SECURITY;
ALTER TABLE pii_access_log ENABLE ROW LEVEL SECURITY;

-- Public read access to purpose registry (no PII)
CREATE POLICY "Public read access to purpose registry"
  ON purpose_registry FOR SELECT
  USING (true);

-- Users can read their own Plaid accounts
CREATE POLICY "Users can read their own Plaid accounts"
  ON plaid_accounts FOR SELECT
  USING (member_id = auth.jwt() ->> 'sub');

-- Users can read their own Stripe payment methods
CREATE POLICY "Users can read their own Stripe payment methods"
  ON stripe_payment_methods FOR SELECT
  USING (member_id = auth.jwt() ->> 'sub');

-- Service role can read all trapped events
CREATE POLICY "Service role can read trapped events"
  ON trapped_events FOR SELECT
  USING (true);

-- Users can read their own behavior patterns
CREATE POLICY "Users can read their own behavior patterns"
  ON behavior_patterns FOR SELECT
  USING (member_id = auth.jwt() ->> 'sub');

-- Users can read their own formed behaviors
CREATE POLICY "Users can read their own formed behaviors"
  ON formed_behaviors FOR SELECT
  USING (member_id = auth.jwt() ->> 'sub');

-- Users can read their own PII access log
CREATE POLICY "Users can read their own PII access log"
  ON pii_access_log FOR SELECT
  USING (member_id = auth.jwt() ->> 'sub');

-- ============================================================================
-- 9. SEED DATA - Example Purpose Definitions
-- ============================================================================

INSERT INTO purpose_registry (feature, action, purpose, required_pii, optional_pii, behavior_formation, plaid_enabled, stripe_enabled) VALUES
  ('account_transfer', 'execute', 'Process funds transfer between member accounts', ARRAY['account_number', 'member_id'], ARRAY['email', 'phone'], '{"pattern_count": 3, "time_window": 24}'::jsonb, true, false),
  ('payment_processing', 'process', 'Execute payment transaction via Stripe', ARRAY['account_number', 'member_id'], ARRAY['email'], '{"pattern_count": 5, "time_window": 48}'::jsonb, false, true),
  ('balance_inquiry', 'view', 'Display account balance to member', ARRAY['account_number', 'member_id'], ARRAY[], '{"pattern_count": 1, "time_window": 1}'::jsonb, true, false),
  ('account_maintenance', 'update', 'Update member account information', ARRAY['member_id'], ARRAY['email', 'phone', 'address'], '{"pattern_count": 2, "time_window": 168}'::jsonb, false, false),
  ('plaid_link', 'link_account', 'Link external account via Plaid', ARRAY['member_id'], ARRAY['email'], '{"pattern_count": 1, "time_window": 1}'::jsonb, true, false),
  ('stripe_payment', 'charge', 'Process payment via Stripe', ARRAY['member_id'], ARRAY['email', 'phone'], '{"pattern_count": 2, "time_window": 24}'::jsonb, false, true)
ON CONFLICT (feature, action) DO NOTHING;

