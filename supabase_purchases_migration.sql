-- 🛒 PURCHASES & DOWNLOADS SYSTEM MIGRATION
-- Run this in Supabase SQL Editor or via CLI
-- Enables: Purchase tracking, License management, Downloadable packages

-- ============================================================================
-- 1. PURCHASES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cu_id TEXT REFERENCES cu_themes(cu_id),
  adapter_id TEXT, -- 'banking-core', 'iso20022', 'suite', etc.
  purchase_type TEXT NOT NULL, -- 'single', 'suite'
  price_paid DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  payment_provider TEXT, -- 'stripe', 'manual', etc.
  payment_provider_id TEXT, -- Stripe payment intent ID, etc.
  stripe_session_id TEXT,
  license_type TEXT DEFAULT 'perpetual', -- 'perpetual', 'monthly', 'annual'
  license_start_date TIMESTAMPTZ,
  license_end_date TIMESTAMPTZ, -- NULL for perpetual licenses
  is_active BOOLEAN DEFAULT true,
  invoice_url TEXT,
  receipt_url TEXT,
  metadata JSONB, -- Additional purchase metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_cu ON purchases(cu_id);
CREATE INDEX IF NOT EXISTS idx_purchases_adapter ON purchases(adapter_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(payment_status);
CREATE INDEX IF NOT EXISTS idx_purchases_active ON purchases(is_active);

-- ============================================================================
-- 2. ADAPTER DOWNLOADABLE PACKAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS adapter_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adapter_id TEXT NOT NULL, -- 'banking-core', 'iso20022', etc.
  version TEXT NOT NULL DEFAULT '1.0.0',
  package_name TEXT NOT NULL, -- Display name for the package
  package_type TEXT NOT NULL, -- 'full', 'demo', 'docs', 'source', 'database', 'api-specs'
  file_name TEXT NOT NULL, -- Actual filename
  file_url TEXT NOT NULL, -- URL to download (S3, Supabase Storage, etc.)
  file_size_bytes BIGINT,
  file_hash TEXT, -- SHA256 hash for verification
  mime_type TEXT, -- 'application/zip', 'application/pdf', etc.
  description TEXT,
  release_notes TEXT,
  is_latest BOOLEAN DEFAULT true,
  requires_purchase BOOLEAN DEFAULT true, -- If false, anyone can download
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(adapter_id, version, package_type)
);

CREATE INDEX IF NOT EXISTS idx_adapter_downloads_adapter ON adapter_downloads(adapter_id);
CREATE INDEX IF NOT EXISTS idx_adapter_downloads_version ON adapter_downloads(version);
CREATE INDEX IF NOT EXISTS idx_adapter_downloads_type ON adapter_downloads(package_type);
CREATE INDEX IF NOT EXISTS idx_adapter_downloads_latest ON adapter_downloads(is_latest);
CREATE INDEX IF NOT EXISTS idx_adapter_downloads_requires_purchase ON adapter_downloads(requires_purchase);

-- ============================================================================
-- 3. DOWNLOAD HISTORY TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS download_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  cu_id TEXT REFERENCES cu_themes(cu_id),
  purchase_id UUID REFERENCES purchases(id) ON DELETE SET NULL,
  download_package_id UUID REFERENCES adapter_downloads(id) ON DELETE CASCADE,
  adapter_id TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  download_status TEXT DEFAULT 'completed', -- 'completed', 'failed', 'cancelled'
  bytes_downloaded BIGINT,
  download_duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_download_history_user ON download_history(user_id);
CREATE INDEX IF NOT EXISTS idx_download_history_cu ON download_history(cu_id);
CREATE INDEX IF NOT EXISTS idx_download_history_purchase ON download_history(purchase_id);
CREATE INDEX IF NOT EXISTS idx_download_history_package ON download_history(download_package_id);
CREATE INDEX IF NOT EXISTS idx_download_history_adapter ON download_history(adapter_id);
CREATE INDEX IF NOT EXISTS idx_download_history_date ON download_history(created_at);

-- ============================================================================
-- 4. LICENSE ACTIVATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS license_activations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cu_id TEXT REFERENCES cu_themes(cu_id),
  adapter_id TEXT NOT NULL,
  activation_key TEXT UNIQUE, -- Unique activation/license key
  activation_status TEXT DEFAULT 'active', -- 'active', 'suspended', 'expired', 'revoked'
  activated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ, -- NULL for perpetual
  last_validated_at TIMESTAMPTZ,
  validation_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_license_activations_purchase ON license_activations(purchase_id);
CREATE INDEX IF NOT EXISTS idx_license_activations_user ON license_activations(user_id);
CREATE INDEX IF NOT EXISTS idx_license_activations_cu ON license_activations(cu_id);
CREATE INDEX IF NOT EXISTS idx_license_activations_key ON license_activations(activation_key);
CREATE INDEX IF NOT EXISTS idx_license_activations_status ON license_activations(activation_status);

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Function to check if user has access to download an adapter
CREATE OR REPLACE FUNCTION has_adapter_access(
  p_user_id UUID,
  p_adapter_id TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_has_access BOOLEAN;
BEGIN
  -- Check if user has a valid purchase for this adapter or suite
  SELECT EXISTS(
    SELECT 1
    FROM purchases p
    WHERE p.user_id = p_user_id
      AND p.payment_status = 'completed'
      AND p.is_active = true
      AND (
        p.adapter_id = p_adapter_id
        OR p.adapter_id = 'suite'
        OR (p.license_end_date IS NULL OR p.license_end_date > NOW())
      )
  ) INTO v_has_access;
  
  RETURN COALESCE(v_has_access, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(
  p_download_package_id UUID
) RETURNS VOID AS $$
BEGIN
  UPDATE adapter_downloads
  SET 
    download_count = download_count + 1,
    last_downloaded_at = NOW(),
    updated_at = NOW()
  WHERE id = p_download_package_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE adapter_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_activations ENABLE ROW LEVEL SECURITY;

-- Users can read their own purchases
CREATE POLICY "Users can read their own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read adapter downloads (public info)
CREATE POLICY "Public read access to adapter downloads"
  ON adapter_downloads FOR SELECT
  USING (true);

-- Users can read their own download history
CREATE POLICY "Users can read their own download history"
  ON download_history FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read their own license activations
CREATE POLICY "Users can read their own license activations"
  ON license_activations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own download history
CREATE POLICY "Users can insert their own download history"
  ON download_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage all purchases (for webhooks)
CREATE POLICY "Service role can manage purchases"
  ON purchases FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================================
-- 7. SEED DATA: Sample Downloadable Packages
-- ============================================================================

-- Demo Starter Adapter (free download)
INSERT INTO adapter_downloads (
  adapter_id,
  version,
  package_name,
  package_type,
  file_name,
  file_url,
  file_size_bytes,
  description,
  requires_purchase,
  is_latest
) VALUES (
  'demo-starter',
  '1.0.0',
  'Demo Starter Adapter - Full Package',
  'full',
  'demo-starter-v1.0.0.zip',
  '/downloads/demo-starter-v1.0.0.zip',
  50000000, -- 50MB
  'Complete demo adapter with sample data, API access, and documentation.',
  false, -- Free download
  true
),
(
  'demo-starter',
  '1.0.0',
  'Demo Starter Adapter - Documentation',
  'docs',
  'demo-starter-docs-v1.0.0.pdf',
  '/downloads/demo-starter-docs-v1.0.0.pdf',
  5000000, -- 5MB
  'Complete documentation for the Demo Starter Adapter.',
  false,
  true
)
ON CONFLICT (adapter_id, version, package_type) DO NOTHING;

-- ============================================================================
-- 8. TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_adapter_downloads_updated_at
  BEFORE UPDATE ON adapter_downloads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_license_activations_updated_at
  BEFORE UPDATE ON license_activations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify tables created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'purchases',
    'adapter_downloads',
    'download_history',
    'license_activations'
  )
ORDER BY table_name;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ CU.APP Purchases & Downloads System Migration Complete!';
  RAISE NOTICE '📊 4 tables created';
  RAISE NOTICE '🔐 RLS policies enabled';
  RAISE NOTICE '⚙️ Helper functions created';
  RAISE NOTICE '🚀 Ready for production';
END $$;

