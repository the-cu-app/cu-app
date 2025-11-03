# 🗄️ SUPABASE SCHEMA FOR DESIGN SYSTEM GOVERNANCE

**Prevents: Adapter Spaghetti, Snowflake UIs, Analytics Vanity Dashboards**
**Enables: Versioned Components, Multi-Tenant Theming, Measurable UI Performance**

---

## 🎯 CORE PROBLEMS WE'RE SOLVING

### Anti-Patterns to Avoid:
1. ❌ **Adapter Spagherd**: No versioning = mystery bugs across adapters
2. ❌ **Snowflake Experiences**: Every team ships custom UI despite "design system"
3. ❌ **Vanity Dashboards**: Analytics exist but don't drive decisions
4. ❌ **Tribal Knowledge**: Design tokens in code, undocumented, no governance
5. ❌ **Launch Paralysis**: 6-12 months to theme/brand/partner

### What We Build Instead:
1. ✅ **Versioned Design Tokens**: Rollback, A/B test, audit changes
2. ✅ **Component Usage Analytics**: Which components? Which CUs? Performance?
3. ✅ **Theme Governance**: Multi-tenant, white-label, brand enforcement
4. ✅ **UI Spawn Templates**: Generate adapter UIs from templates in seconds
5. ✅ **Feedback Loops**: UI metrics → design decisions → new versions

---

## 📊 SCHEMA TABLES

### 1. **design_tokens** - Centralized Token Registry
```sql
CREATE TABLE design_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_name TEXT NOT NULL UNIQUE, -- e.g., 'colors.primary', 'spacing.md'
  token_type TEXT NOT NULL, -- 'color', 'spacing', 'typography', 'radius', 'elevation'
  token_value JSONB NOT NULL, -- { "light": "#048391", "dark": "#00D9FF" }
  version TEXT NOT NULL DEFAULT '1.0.0',
  deprecated BOOLEAN DEFAULT false,
  deprecated_at TIMESTAMPTZ,
  replacement_token TEXT, -- Points to new token name
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),

  -- Metadata
  description TEXT,
  category TEXT, -- 'foundation', 'semantic', 'component'
  platform TEXT[], -- ['web', 'ios', 'android', 'flutter']

  -- Governance
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,

  -- Analytics
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ
);

CREATE INDEX idx_design_tokens_type ON design_tokens(token_type);
CREATE INDEX idx_design_tokens_version ON design_tokens(version);
CREATE INDEX idx_design_tokens_deprecated ON design_tokens(deprecated);
```

**Purpose:** Single source of truth for all design tokens. Prevents hard-coded values. Enables versioning and deprecation workflows.

---

### 2. **component_library** - Component Registry
```sql
CREATE TABLE component_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_name TEXT NOT NULL, -- 'CUButton', 'CUCard', 'AdapterHero'
  component_type TEXT NOT NULL, -- 'primitive', 'widget', 'layout', 'template'
  version TEXT NOT NULL DEFAULT '1.0.0',

  -- Source Code
  flutter_code TEXT, -- Dart/Flutter implementation
  react_code TEXT, -- React/Next.js implementation
  web_code TEXT, -- Plain HTML/CSS/JS

  -- Design Tokens Used
  tokens_used JSONB, -- ["colors.primary", "spacing.md", "typography.h1"]

  -- Variants
  variants JSONB, -- { "primary": {...}, "secondary": {...}, "ghost": {...} }
  sizes JSONB, -- { "sm": {...}, "md": {...}, "lg": {...} }
  states JSONB, -- { "default": {...}, "hover": {...}, "disabled": {...} }

  -- Documentation
  description TEXT,
  usage_guidelines TEXT,
  props_schema JSONB, -- TypeScript/Dart prop definitions
  examples JSONB[], -- Array of code examples

  -- Assets
  preview_image_url TEXT,
  storybook_url TEXT,
  figma_url TEXT,

  -- Versioning
  deprecated BOOLEAN DEFAULT false,
  breaking_changes TEXT[],
  migration_guide TEXT,

  -- Governance
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_component_library_type ON component_library(component_type);
CREATE INDEX idx_component_library_version ON component_library(version);
```

**Purpose:** Version-controlled component source code. Prevents "snowflake" components. Enables automated UI generation.

---

### 3. **cu_themes** - Multi-Tenant Theme Management
```sql
CREATE TABLE cu_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cu_id TEXT NOT NULL UNIQUE, -- Credit union identifier
  cu_name TEXT NOT NULL,

  -- Brand Identity
  logo_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  brand_guidelines_url TEXT,

  -- Design Token Overrides
  color_overrides JSONB, -- { "primary": "#FF5733", "secondary": "#C70039" }
  typography_overrides JSONB,
  spacing_overrides JSONB,
  radius_overrides JSONB,

  -- Theme Mode
  default_theme_mode TEXT DEFAULT 'light', -- 'light', 'dark', 'system'

  -- Feature Flags
  adapters_enabled TEXT[], -- ['banking-core', 'iso20022', 'compliance']
  features_enabled JSONB, -- { "dark_mode": true, "animations": true }

  -- Custom Domain
  custom_domain TEXT UNIQUE,
  subdomain TEXT UNIQUE, -- e.g., 'acmecu' for acmecu.cu.app

  -- Whitelabel Settings
  hide_cu_app_branding BOOLEAN DEFAULT false,
  custom_footer_text TEXT,
  custom_support_email TEXT,
  custom_support_phone TEXT,

  -- Billing/License
  plan_type TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise', 'perpetual'
  adapters_purchased TEXT[],
  perpetual_license_date TIMESTAMPTZ,

  -- Analytics
  active_users_count INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_cu_themes_plan ON cu_themes(plan_type);
CREATE INDEX idx_cu_themes_domain ON cu_themes(custom_domain);
```

**Purpose:** Multi-tenant theming. Launch new CU in <1 hour. White-label enforcement. Prevents 6-month partnership delays.

---

### 4. **ui_templates** - Rapid UI Spawning
```sql
CREATE TABLE ui_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL UNIQUE, -- 'adapter-detail-page', 'checkout-flow', 'dashboard'
  template_type TEXT NOT NULL, -- 'page', 'flow', 'section', 'component'

  -- Template Definition
  layout_structure JSONB NOT NULL, -- Component tree with slots
  required_data JSONB, -- Data schema required to render
  optional_data JSONB,

  -- Platform Variants
  flutter_template TEXT,
  react_template TEXT,
  web_template TEXT,

  -- Components Used
  components_used TEXT[], -- ['CUButton', 'AdapterHero', 'PricingSection']

  -- Customization
  customizable_sections JSONB, -- Which parts can CUs customize
  locked_sections JSONB, -- Which parts are locked/required

  -- Preview
  preview_image_url TEXT,
  demo_url TEXT,

  -- Usage Analytics
  usage_count INTEGER DEFAULT 0,
  avg_render_time_ms INTEGER,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose:** Template-driven UI generation. Spawn adapter pages in seconds. Consistent layouts while allowing customization.

---

### 5. **component_usage_analytics** - Measurable Component Performance
```sql
CREATE TABLE component_usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_id UUID REFERENCES component_library(id),
  cu_id TEXT REFERENCES cu_themes(cu_id),

  -- Usage Metrics
  render_count INTEGER DEFAULT 0,
  unique_users INTEGER DEFAULT 0,
  avg_render_time_ms NUMERIC(10,2),
  p95_render_time_ms NUMERIC(10,2),

  -- Interaction Metrics
  click_count INTEGER DEFAULT 0,
  click_through_rate NUMERIC(5,4), -- 0.0000 to 1.0000
  conversion_count INTEGER DEFAULT 0,
  conversion_rate NUMERIC(5,4),

  -- Error Tracking
  error_count INTEGER DEFAULT 0,
  error_rate NUMERIC(5,4),
  common_errors JSONB[],

  -- A/B Testing
  variant_used TEXT, -- 'primary', 'secondary', 'ghost', etc.
  test_group TEXT, -- 'control', 'variant-a', 'variant-b'

  -- Time Period
  date DATE NOT NULL,
  hour INTEGER, -- 0-23 for hourly granularity

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(component_id, cu_id, date, hour, variant_used)
);

CREATE INDEX idx_component_usage_date ON component_usage_analytics(date);
CREATE INDEX idx_component_usage_cu ON component_usage_analytics(cu_id);
CREATE INDEX idx_component_usage_component ON component_usage_analytics(component_id);
```

**Purpose:** Kill vanity dashboards. Track real performance. A/B test variants. Drive decisions with data.

---

### 6. **adapter_configurations** - Adapter Instance Management
```sql
CREATE TABLE adapter_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cu_id TEXT REFERENCES cu_themes(cu_id),
  adapter_id TEXT NOT NULL, -- 'banking-core', 'iso20022', 'compliance'

  -- Version Control
  adapter_version TEXT NOT NULL DEFAULT '1.0.0',
  design_system_version TEXT NOT NULL DEFAULT '1.0.0',

  -- Enabled/Disabled
  enabled BOOLEAN DEFAULT false,
  enabled_at TIMESTAMPTZ,
  disabled_at TIMESTAMPTZ,

  -- Configuration
  custom_pricing JSONB, -- Override default pricing
  custom_features JSONB, -- Enable/disable specific features
  custom_branding JSONB, -- Adapter-specific branding

  -- Integration Settings
  api_keys JSONB, -- Encrypted API keys for this adapter
  webhook_urls JSONB,

  -- Performance SLA
  expected_response_time_ms INTEGER DEFAULT 100,
  expected_uptime_percent NUMERIC(5,2) DEFAULT 99.99,

  -- Usage Limits
  monthly_request_limit INTEGER,
  current_month_requests INTEGER DEFAULT 0,

  -- Analytics
  total_requests INTEGER DEFAULT 0,
  total_errors INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(cu_id, adapter_id)
);

CREATE INDEX idx_adapter_config_cu ON adapter_configurations(cu_id);
CREATE INDEX idx_adapter_config_adapter ON adapter_configurations(adapter_id);
CREATE INDEX idx_adapter_config_enabled ON adapter_configurations(enabled);
```

**Purpose:** Prevent "that's not my adapter's problem" syndrome. Track versions, SLAs, usage per CU. Enforce governance.

---

### 7. **design_system_changelog** - Audit Trail
```sql
CREATE TABLE design_system_changelog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  change_type TEXT NOT NULL, -- 'token_added', 'token_updated', 'component_deprecated', 'theme_updated'
  entity_type TEXT NOT NULL, -- 'token', 'component', 'theme', 'adapter'
  entity_id UUID NOT NULL,
  entity_name TEXT NOT NULL,

  -- Change Details
  old_value JSONB,
  new_value JSONB,
  breaking_change BOOLEAN DEFAULT false,

  -- Version Info
  old_version TEXT,
  new_version TEXT,

  -- User Context
  changed_by UUID REFERENCES auth.users(id),
  change_reason TEXT,

  -- Impact Assessment
  affected_components TEXT[],
  affected_cus TEXT[],
  estimated_impact TEXT, -- 'low', 'medium', 'high', 'critical'

  -- Rollback Support
  can_rollback BOOLEAN DEFAULT true,
  rollback_sql TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_changelog_type ON design_system_changelog(change_type);
CREATE INDEX idx_changelog_entity ON design_system_changelog(entity_type, entity_id);
CREATE INDEX idx_changelog_date ON design_system_changelog(created_at);
```

**Purpose:** Full audit trail. Rollback capability. Impact assessment before changes. Prevents "mystery bugs."

---

### 8. **ui_ab_tests** - Built-in A/B Testing
```sql
CREATE TABLE ui_ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name TEXT NOT NULL UNIQUE,
  component_id UUID REFERENCES component_library(id),

  -- Test Configuration
  control_variant JSONB NOT NULL, -- Original component config
  test_variants JSONB[] NOT NULL, -- Array of variant configs
  traffic_split JSONB NOT NULL, -- { "control": 50, "variant-a": 25, "variant-b": 25 }

  -- Targeting
  target_cus TEXT[], -- Specific CUs or null for all
  target_user_segments JSONB, -- User targeting rules

  -- Success Metrics
  primary_metric TEXT NOT NULL, -- 'conversion_rate', 'click_through_rate', 'render_time'
  secondary_metrics TEXT[],
  minimum_sample_size INTEGER DEFAULT 1000,
  statistical_significance_threshold NUMERIC(3,2) DEFAULT 0.95, -- 95%

  -- Test Status
  status TEXT DEFAULT 'draft', -- 'draft', 'running', 'paused', 'completed', 'cancelled'
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Results
  winner_variant TEXT,
  confidence_level NUMERIC(5,4),
  results_summary JSONB,

  -- Auto-Actions
  auto_promote_winner BOOLEAN DEFAULT false,
  auto_stop_at_significance BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose:** Analytics that drive action. Test components before rollout. Auto-promote winners. Kill vanity metrics.

---

### 9. **cu_feedback** - Real Feedback Loops
```sql
CREATE TABLE cu_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cu_id TEXT REFERENCES cu_themes(cu_id),
  user_id UUID REFERENCES auth.users(id),

  -- Feedback Context
  feedback_type TEXT NOT NULL, -- 'bug', 'feature_request', 'ui_improvement', 'performance'
  component_id UUID REFERENCES component_library(id),
  adapter_id TEXT,
  page_url TEXT,

  -- Feedback Content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  screenshot_url TEXT,
  video_url TEXT,

  -- Categorization
  severity TEXT, -- 'low', 'medium', 'high', 'critical'
  category TEXT, -- 'design', 'functionality', 'performance', 'accessibility'

  -- Status
  status TEXT DEFAULT 'submitted', -- 'submitted', 'reviewed', 'planned', 'in_progress', 'completed', 'wont_fix'
  assigned_to UUID REFERENCES auth.users(id),

  -- Resolution
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  implemented_in_version TEXT,

  -- Voting
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_cu_feedback_type ON cu_feedback(feedback_type);
CREATE INDEX idx_cu_feedback_status ON cu_feedback(status);
CREATE INDEX idx_cu_feedback_component ON cu_feedback(component_id);
```

**Purpose:** Member suggestions don't disappear into Jira. Direct feedback → design system updates. Close the loop.

---

### 10. **theme_generation_queue** - Async UI Spawning
```sql
CREATE TABLE theme_generation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cu_id TEXT REFERENCES cu_themes(cu_id),

  -- Generation Request
  template_ids UUID[], -- Which templates to generate
  adapter_ids TEXT[], -- Which adapters to build
  platform TEXT NOT NULL, -- 'flutter', 'react', 'web', 'all'

  -- Status
  status TEXT DEFAULT 'queued', -- 'queued', 'processing', 'completed', 'failed'
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Output
  generated_files JSONB, -- { "flutter": [...], "react": [...] }
  build_logs TEXT,
  error_message TEXT,

  -- Performance
  total_duration_ms INTEGER,
  files_generated INTEGER,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose:** Generate entire themed UI codebases asynchronously. Launch new CU in <1 hour instead of 6 months.

---

## 🔄 WORKFLOW EXAMPLES

### 1. Launch New CU (Traditional: 6 months → **New: <1 hour**)

```sql
-- Step 1: Create theme
INSERT INTO cu_themes (cu_id, cu_name, color_overrides, plan_type, adapters_purchased)
VALUES (
  'acme_cu',
  'ACME Credit Union',
  '{"primary": "#FF5733", "secondary": "#C70039"}',
  'perpetual',
  ARRAY['banking-core', 'iso20022', 'compliance']
);

-- Step 2: Queue UI generation
INSERT INTO theme_generation_queue (cu_id, template_ids, adapter_ids, platform)
VALUES (
  'acme_cu',
  (SELECT array_agg(id) FROM ui_templates WHERE template_type = 'page'),
  ARRAY['banking-core', 'iso20022', 'compliance'],
  'all'
);

-- Step 3: Auto-generates Flutter + React + Web UIs with ACME branding
-- Step 4: Deploy to acmecu.cu.app
-- Total time: <1 hour
```

---

### 2. A/B Test Button Variant (Kill Vanity Dashboards)

```sql
-- Create A/B test
INSERT INTO ui_ab_tests (
  test_name,
  component_id,
  control_variant,
  test_variants,
  traffic_split,
  primary_metric,
  auto_promote_winner
)
VALUES (
  'cta_button_color_test',
  (SELECT id FROM component_library WHERE component_name = 'CUButton'),
  '{"variant": "primary", "color": "#048391"}',
  ARRAY['{"variant": "red", "color": "#FF5733"}', '{"variant": "green", "color": "#28A745"}'],
  '{"control": 34, "red": 33, "green": 33}',
  'conversion_rate',
  true -- Auto-promote winner
);

-- Track results in component_usage_analytics
-- When significance reached, auto-promote winner to component_library
```

---

### 3. Deprecate Design Token (Prevent Mystery Bugs)

```sql
-- Step 1: Mark token as deprecated
UPDATE design_tokens
SET
  deprecated = true,
  deprecated_at = now(),
  replacement_token = 'colors.brand.primary'
WHERE token_name = 'colors.primary';

-- Step 2: Log change
INSERT INTO design_system_changelog (
  change_type,
  entity_type,
  entity_id,
  old_value,
  new_value,
  breaking_change,
  affected_components
)
VALUES (
  'token_deprecated',
  'token',
  (SELECT id FROM design_tokens WHERE token_name = 'colors.primary'),
  '{"deprecated": false}',
  '{"deprecated": true, "replacement": "colors.brand.primary"}',
  true,
  (SELECT array_agg(component_name)
   FROM component_library
   WHERE 'colors.primary' = ANY(tokens_used::text[]))
);

-- Step 3: Alert affected CUs via webhook/email
-- Step 4: Track migration progress
```

---

## 📈 ANALYTICS QUERIES

### Component Performance Dashboard (Not Vanity)

```sql
-- Top performing components by conversion
SELECT
  cl.component_name,
  SUM(cua.conversion_count) as total_conversions,
  AVG(cua.conversion_rate) as avg_conversion_rate,
  AVG(cua.avg_render_time_ms) as avg_render_time,
  COUNT(DISTINCT cua.cu_id) as cu_count
FROM component_usage_analytics cua
JOIN component_library cl ON cua.component_id = cl.id
WHERE cua.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY cl.component_name
ORDER BY avg_conversion_rate DESC
LIMIT 10;
```

### CU Adapter Adoption Tracking

```sql
-- Which adapters are CUs actually using?
SELECT
  adapter_id,
  COUNT(DISTINCT cu_id) as cu_count,
  SUM(total_requests) as total_requests,
  AVG(current_month_requests) as avg_monthly_requests,
  AVG(total_errors::float / NULLIF(total_requests, 0) * 100) as avg_error_rate
FROM adapter_configurations
WHERE enabled = true
GROUP BY adapter_id
ORDER BY cu_count DESC;
```

### Design System Health Check

```sql
-- Deprecated tokens still in use (technical debt)
SELECT
  dt.token_name,
  dt.replacement_token,
  dt.deprecated_at,
  COUNT(DISTINCT cl.id) as components_using,
  array_agg(DISTINCT cl.component_name) as affected_components
FROM design_tokens dt
JOIN component_library cl ON dt.token_name = ANY(cl.tokens_used::text[])
WHERE dt.deprecated = true
GROUP BY dt.token_name, dt.replacement_token, dt.deprecated_at
ORDER BY components_using DESC;
```

---

## 🚀 BENEFITS SUMMARY

| **Anti-Pattern** | **Supabase Solution** | **Impact** |
|------------------|----------------------|------------|
| Adapter Spaghetti | `design_tokens` + `component_library` versioning | Rollback bugs, track dependencies |
| Snowflake UIs | `cu_themes` + `ui_templates` enforcement | Consistent UX, brand compliance |
| Vanity Dashboards | `component_usage_analytics` + `ui_ab_tests` | Data-driven decisions, auto-optimization |
| Tribal Knowledge | `design_system_changelog` audit trail | Full history, impact assessment |
| 6-Month Launches | `theme_generation_queue` async spawning | <1 hour CU onboarding |
| Broken Feedback | `cu_feedback` → component updates | Close the loop, member-driven design |

---

## 🎯 RECOMMENDED IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1)
- `design_tokens`
- `component_library`
- `cu_themes`

### Phase 2: Analytics (Week 2)
- `component_usage_analytics`
- `adapter_configurations`
- `design_system_changelog`

### Phase 3: Automation (Week 3)
- `ui_templates`
- `theme_generation_queue`
- `ui_ab_tests`

### Phase 4: Feedback Loops (Week 4)
- `cu_feedback`
- Dashboard integration
- Webhook notifications

---

**RESULT:** Every adapter delivers measurable value. No more distributed mess. Launch CUs in hours, not months.
