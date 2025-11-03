# 🤖 AI-POWERED FEEDBACK & AUTO-FIX SYSTEM

**USER-CONTROLLED EXPERIENCE. INSTANT BUG FIXES. COMMUNITY-DRIVEN FEATURES.**

---

## 🎯 SYSTEM ARCHITECTURE

```
User Reports Bug
      ↓
Flutter Modal Dialog ("Report Bug" button)
      ↓
Triggers Claude Agent (via GitHub Actions)
      ↓
Agent analyzes error logs + stack trace
      ↓
Agent finds bug location
      ↓
Agent generates fix
      ↓
Creates PR in Git Worktree
      ↓
Human approves (one in the loop)
      ↓
Auto-merge + Deploy
      ↓
Bug fixed in <5 minutes
      ↓
Changelog auto-updated
      ↓
User notified
```

---

## 📱 FLUTTER FEEDBACK WIDGET (ZERO MATERIAL)

### `/lib/widgets/cu_bug_report_dialog.dart`

```dart
import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';
import '../services/bug_report_service.dart';

class CUBugReportDialog extends StatefulWidget {
  final String? errorMessage;
  final StackTrace? stackTrace;
  final Map<String, dynamic>? context;

  const CUBugReportDialog({
    Key? key,
    this.errorMessage,
    this.stackTrace,
    this.context,
  }) : super(key: key);

  @override
  State<CUBugReportDialog> createState() => _CUBugReportDialogState();
}

class _CUBugReportDialogState extends State<CUBugReportDialog> {
  final TextEditingController _descriptionController = TextEditingController();
  bool _isSubmitting = false;
  bool _submitted = false;

  Future<void> _submitBugReport() async {
    setState(() => _isSubmitting = true);

    final report = BugReport(
      description: _descriptionController.text,
      errorMessage: widget.errorMessage,
      stackTrace: widget.stackTrace?.toString(),
      context: widget.context,
      timestamp: DateTime.now(),
      userId: await _getUserId(),
      cuId: await _getCuId(),
      deviceInfo: await _getDeviceInfo(),
      appVersion: await _getAppVersion(),
    );

    // Triggers Claude Agent via GitHub Actions
    final result = await BugReportService.submit(report);

    setState(() {
      _isSubmitting = false;
      _submitted = true;
    });

    // Show success + ETA
    if (result.success) {
      _showFixETA(result.estimatedFixTime);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: CUColors.black.withOpacity(0.8),
      child: Center(
        child: Container(
          width: 400,
          padding: CUSpacing.cardPadding,
          decoration: BoxDecoration(
            color: CUColors.black,
            border: Border.all(color: CUColors.white10),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Title
              Text(
                _submitted ? '✅ Bug Report Submitted' : '🐛 Report Bug',
                style: CUTypography.h3,
              ),

              SizedBox(height: CUSpacing.lg),

              if (!_submitted) ...[
                // Error message (auto-captured)
                if (widget.errorMessage != null) ...[
                  Text('Error Detected:', style: CUTypography.bodySmall),
                  SizedBox(height: CUSpacing.sm),
                  Container(
                    padding: EdgeInsets.all(CUSpacing.md),
                    decoration: BoxDecoration(
                      color: CUColors.white5,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      widget.errorMessage!,
                      style: CUTypography.bodySmall.copyWith(
                        fontFamily: 'monospace',
                        color: CUColors.white60,
                      ),
                    ),
                  ),
                  SizedBox(height: CUSpacing.lg),
                ],

                // User description
                Text('What were you trying to do?', style: CUTypography.body),
                SizedBox(height: CUSpacing.sm),
                Container(
                  padding: EdgeInsets.all(CUSpacing.md),
                  decoration: BoxDecoration(
                    border: Border.all(color: CUColors.white10),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: TextField(
                    controller: _descriptionController,
                    maxLines: 4,
                    style: CUTypography.body,
                    decoration: InputDecoration.collapsed(
                      hintText: 'Describe what happened...',
                      hintStyle: CUTypography.body.copyWith(
                        color: CUColors.white30,
                      ),
                    ),
                  ),
                ),

                SizedBox(height: CUSpacing.xl),

                // Buttons
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    // Cancel
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: CUSpacing.lg,
                          vertical: CUSpacing.md,
                        ),
                        child: Text('Cancel', style: CUTypography.body),
                      ),
                    ),

                    SizedBox(width: CUSpacing.md),

                    // Submit (triggers AI agent)
                    GestureDetector(
                      onTap: _isSubmitting ? null : _submitBugReport,
                      child: Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: CUSpacing.lg,
                          vertical: CUSpacing.md,
                        ),
                        decoration: BoxDecoration(
                          color: CUColors.white,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          _isSubmitting ? 'Submitting...' : 'Report Bug',
                          style: CUTypography.body.copyWith(
                            color: CUColors.black,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ] else ...[
                // Success state
                Text(
                  'Our AI agent is analyzing this bug and will create a fix automatically.',
                  style: CUTypography.body,
                ),
                SizedBox(height: CUSpacing.lg),
                Text(
                  '⏱️ Estimated fix time: 5-10 minutes',
                  style: CUTypography.bodySmall.copyWith(
                    color: CUColors.white60,
                  ),
                ),
                SizedBox(height: CUSpacing.sm),
                Text(
                  '🔔 You\'ll be notified when the fix is deployed.',
                  style: CUTypography.bodySmall.copyWith(
                    color: CUColors.white60,
                  ),
                ),
                SizedBox(height: CUSpacing.xl),
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Container(
                    width: double.infinity,
                    padding: EdgeInsets.symmetric(vertical: CUSpacing.md),
                    decoration: BoxDecoration(
                      color: CUColors.white,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Center(
                      child: Text(
                        'Close',
                        style: CUTypography.body.copyWith(
                          color: CUColors.black,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
```

---

## 🔧 BUG REPORT SERVICE

### `/lib/services/bug_report_service.dart`

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class BugReport {
  final String description;
  final String? errorMessage;
  final String? stackTrace;
  final Map<String, dynamic>? context;
  final DateTime timestamp;
  final String userId;
  final String cuId;
  final Map<String, dynamic> deviceInfo;
  final String appVersion;

  BugReport({
    required this.description,
    this.errorMessage,
    this.stackTrace,
    this.context,
    required this.timestamp,
    required this.userId,
    required this.cuId,
    required this.deviceInfo,
    required this.appVersion,
  });

  Map<String, dynamic> toJson() => {
    'description': description,
    'error_message': errorMessage,
    'stack_trace': stackTrace,
    'context': context,
    'timestamp': timestamp.toIso8601String(),
    'user_id': userId,
    'cu_id': cuId,
    'device_info': deviceInfo,
    'app_version': appVersion,
  };
}

class BugReportService {
  static const String _githubActionsWebhook =
      'https://api.github.com/repos/YOUR_ORG/cu-app-production/dispatches';
  static const String _supabaseUrl =
      'https://svaiikywglmwedraxyda.supabase.co/rest/v1/cu_feedback';

  static Future<BugReportResult> submit(BugReport report) async {
    // 1. Save to Supabase cu_feedback table
    final supabaseResponse = await http.post(
      Uri.parse(_supabaseUrl),
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'YOUR_ANON_KEY',
        'Authorization': 'Bearer YOUR_ANON_KEY',
      },
      body: jsonEncode({
        'cu_id': report.cuId,
        'user_id': report.userId,
        'feedback_type': 'bug',
        'title': report.errorMessage ?? 'User-reported bug',
        'description': report.description,
        'severity': 'high', // FIRST user to report = high severity
        'category': 'functionality',
        'status': 'submitted',
        'context': jsonEncode({
          'stack_trace': report.stackTrace,
          'device_info': report.deviceInfo,
          'app_version': report.appVersion,
          ...?report.context,
        }),
      }),
    );

    // 2. Trigger GitHub Actions workflow (Claude agent)
    final githubResponse = await http.post(
      Uri.parse(_githubActionsWebhook),
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer YOUR_GITHUB_PAT',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: jsonEncode({
        'event_type': 'bug_report',
        'client_payload': report.toJson(),
      }),
    );

    return BugReportResult(
      success: githubResponse.statusCode == 204,
      estimatedFixTime: Duration(minutes: 5),
      trackingId: supabaseResponse.headers['location'],
    );
  }
}

class BugReportResult {
  final bool success;
  final Duration estimatedFixTime;
  final String? trackingId;

  BugReportResult({
    required this.success,
    required this.estimatedFixTime,
    this.trackingId,
  });
}
```

---

## 🤖 GITHUB ACTIONS WORKFLOW

### `.github/workflows/ai-bug-fix.yml`

```yaml
name: 🤖 AI Bug Fix Agent

on:
  repository_dispatch:
    types: [bug_report]

jobs:
  ai-bug-fix:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - name: Checkout main branch
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Create Git Worktree for bug fix
        run: |
          git worktree add ../bug-fix-${{ github.run_id }} -b bug-fix-${{ github.run_id }}

      - name: Extract bug details
        id: bug
        run: |
          echo "description=${{ github.event.client_payload.description }}" >> $GITHUB_OUTPUT
          echo "error=${{ github.event.client_payload.error_message }}" >> $GITHUB_OUTPUT
          echo "stack_trace=${{ github.event.client_payload.stack_trace }}" >> $GITHUB_OUTPUT
          echo "user_id=${{ github.event.client_payload.user_id }}" >> $GITHUB_OUTPUT

      - name: Call Claude API to analyze bug
        id: claude
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          curl -X POST https://api.anthropic.com/v1/messages \
            -H "Content-Type: application/json" \
            -H "x-api-key: $ANTHROPIC_API_KEY" \
            -H "anthropic-version: 2023-06-01" \
            -d '{
              "model": "claude-sonnet-4-5-20250929",
              "max_tokens": 8192,
              "messages": [{
                "role": "user",
                "content": "URGENT BUG FIX REQUIRED\n\nError: ${{ steps.bug.outputs.error }}\n\nStack Trace:\n${{ steps.bug.outputs.stack_trace }}\n\nUser Description: ${{ steps.bug.outputs.description }}\n\nAnalyze this bug, find the root cause, and provide:\n1. Exact file path\n2. Line number\n3. Bug explanation\n4. Complete fix (code)\n5. Test to verify fix\n\nReturn JSON: {\"file\": \"path\", \"line\": 123, \"explanation\": \"...\", \"fix\": \"...\", \"test\": \"...\"}"
              }]
            }' > claude_response.json

          cat claude_response.json

      - name: Parse Claude response
        id: parse
        run: |
          FILE=$(jq -r '.content[0].text | fromjson | .file' claude_response.json)
          FIX=$(jq -r '.content[0].text | fromjson | .fix' claude_response.json)
          EXPLANATION=$(jq -r '.content[0].text | fromjson | .explanation' claude_response.json)

          echo "file=$FILE" >> $GITHUB_OUTPUT
          echo "explanation=$EXPLANATION" >> $GITHUB_OUTPUT
          echo "$FIX" > fix.patch

      - name: Apply fix in worktree
        run: |
          cd ../bug-fix-${{ github.run_id }}
          cat ../cu-app-production/fix.patch | patch -p1
          git add -A
          git commit -m "🤖 AI Bug Fix: ${{ steps.parse.outputs.explanation }}

Reported by: user_${{ steps.bug.outputs.user_id }}
Error: ${{ steps.bug.outputs.error }}
Fixed: ${{ steps.parse.outputs.file }}

Auto-generated by Claude Agent
Workflow: ${{ github.run_id }}"

      - name: Push branch
        run: |
          cd ../bug-fix-${{ github.run_id }}
          git push origin bug-fix-${{ github.run_id }}

      - name: Create Pull Request
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          gh pr create \
            --title "🤖 AI Bug Fix: ${{ steps.parse.outputs.explanation }}" \
            --body "## Bug Report

          **Reported by:** user_${{ steps.bug.outputs.user_id }}
          **Error:** ${{ steps.bug.outputs.error }}
          **Description:** ${{ steps.bug.outputs.description }}

          ## Fix Analysis

          ${{ steps.parse.outputs.explanation }}

          ## Files Changed

          - ${{ steps.parse.outputs.file }}

          ## Auto-Fix

          This PR was automatically generated by Claude AI agent.

          **Human Review Required:** One approval needed before merge.

          ---

          🤖 Generated with AI-powered bug detection and fix pipeline" \
            --base main \
            --head bug-fix-${{ github.run_id }} \
            --label "bug,ai-generated,needs-human-review"

      - name: Notify user via Supabase
        run: |
          curl -X PATCH \
            "https://svaiikywglmwedraxyda.supabase.co/rest/v1/cu_feedback?user_id=eq.${{ steps.bug.outputs.user_id }}" \
            -H "Content-Type: application/json" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}" \
            -d '{
              "status": "in_progress",
              "resolution_notes": "AI agent created fix. Awaiting human approval. PR: #${{ steps.pr.outputs.number }}"
            }'

      - name: Auto-merge if tests pass (optional)
        if: github.event.client_payload.auto_merge == true
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          # Wait for CI checks
          sleep 60

          # Auto-merge if all checks pass
          gh pr merge bug-fix-${{ github.run_id }} --auto --squash
```

---

## 📊 FEATURE VOTING SYSTEM (VOLUME-BASED)

### Supabase Schema Addition

```sql
CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_title TEXT NOT NULL,
  feature_description TEXT NOT NULL,
  requested_by UUID REFERENCES auth.users(id),
  cu_id TEXT REFERENCES cu_themes(cu_id),
  component_id UUID REFERENCES component_library(id),
  adapter_id TEXT,

  -- Volume metrics
  mention_count INTEGER DEFAULT 1,
  unique_requesters INTEGER DEFAULT 1,
  total_upvotes INTEGER DEFAULT 0,

  -- Priority (auto-calculated)
  priority_score NUMERIC(10,2) GENERATED ALWAYS AS (
    (mention_count * 2) + (unique_requesters * 5) + total_upvotes
  ) STORED,

  status TEXT DEFAULT 'submitted', -- 'submitted', 'in_progress', 'completed'
  assigned_to UUID REFERENCES auth.users(id),
  implemented_in_version TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_feature_priority ON feature_requests(priority_score DESC);
CREATE INDEX idx_feature_status ON feature_requests(status);

-- View: Top features by volume
CREATE VIEW top_features_by_volume AS
SELECT
  feature_title,
  mention_count,
  unique_requesters,
  total_upvotes,
  priority_score,
  status
FROM feature_requests
WHERE status != 'completed'
ORDER BY priority_score DESC
LIMIT 50;
```

### Weekly Auto-PR for Top Feature

```yaml
name: 🏆 Weekly Top Feature Implementation

on:
  schedule:
    - cron: '0 0 * * MON' # Every Monday at midnight

jobs:
  implement-top-feature:
    runs-on: ubuntu-latest
    steps:
      - name: Get top feature from Supabase
        id: feature
        run: |
          FEATURE=$(curl "https://svaiikywglmwedraxyda.supabase.co/rest/v1/top_features_by_volume?limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" | jq -r '.[0]')

          echo "title=$(echo $FEATURE | jq -r '.feature_title')" >> $GITHUB_OUTPUT
          echo "description=$(echo $FEATURE | jq -r '.feature_description')" >> $GITHUB_OUTPUT

      - name: Call Claude to implement feature
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          curl -X POST https://api.anthropic.com/v1/messages \
            -H "x-api-key: $ANTHROPIC_API_KEY" \
            -d '{
              "model": "claude-sonnet-4-5-20250929",
              "messages": [{
                "role": "user",
                "content": "Implement this top-voted feature:\n\nTitle: ${{ steps.feature.outputs.title }}\nDescription: ${{ steps.feature.outputs.description }}\n\nProvide complete implementation with tests."
              }]
            }' > implementation.json

      # ... Create PR with implementation ...
```

---

## 🔄 CHANGELOG AUTO-UPDATES

### `.github/workflows/auto-changelog.yml`

```yaml
name: 📝 Auto-Update Changelog

on:
  pull_request:
    types: [closed]
    branches: [main]

jobs:
  update-changelog:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Extract PR labels
        id: labels
        run: |
          if [[ "${{ contains(github.event.pull_request.labels.*.name, 'bug') }}" == "true" ]]; then
            echo "type=🐛 Bug Fix" >> $GITHUB_OUTPUT
          elif [[ "${{ contains(github.event.pull_request.labels.*.name, 'feature') }}" == "true" ]]; then
            echo "type=✨ Feature" >> $GITHUB_OUTPUT
          elif [[ "${{ contains(github.event.pull_request.labels.*.name, 'ai-generated') }}" == "true" ]]; then
            echo "type=🤖 AI-Generated" >> $GITHUB_OUTPUT
          fi

      - name: Update CHANGELOG.md
        run: |
          DATE=$(date +%Y-%m-%d)
          VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "v1.0.0")

          # Add entry to changelog
          sed -i "5i\\## [$VERSION] - $DATE\n\n### ${{ steps.labels.outputs.type }}\n- ${{ github.event.pull_request.title }} (#${{ github.event.pull_request.number }})\n" CHANGELOG.md

          git add CHANGELOG.md
          git commit -m "📝 Update changelog: ${{ github.event.pull_request.title }}"
          git push
```

---

## 🎯 HUMAN-IN-THE-LOOP APPROVAL

### Branch Protection Rules

```yaml
# Settings → Branches → Branch protection rules → main

Required approvals: 1
Require review from Code Owners: Yes
Dismiss stale reviews: Yes
Require status checks: Yes
  - CI/CD Tests
  - Vercel Preview Deploy
  - Type Check
```

### CODEOWNERS File

```
# .github/CODEOWNERS

# Design system changes require design team approval
/lib/tokens/ @design-team @kylekusche
/lib/widgets/ @design-team @kylekusche

# Core adapters require architecture approval
/lib/screens/adapters/ @kylekusche
/app/adapters/ @kylekusche

# Auto-generated bug fixes (AI) require one human review
**/bug-fix-* @kylekusche

# Supabase schema changes require DB team
*.sql @db-team @kylekusche
```

---

## 📈 METRICS DASHBOARD

### Real-time Bug Fix Stats

```sql
-- Bugs reported
SELECT COUNT(*) as total_bugs
FROM cu_feedback
WHERE feedback_type = 'bug';

-- AI-generated fixes
SELECT COUNT(*) as ai_fixes
FROM design_system_changelog
WHERE change_type = 'bug_fix'
  AND changed_by = 'ai-agent';

-- Average fix time
SELECT AVG(resolved_at - created_at) as avg_fix_time
FROM cu_feedback
WHERE status = 'completed';

-- Top features by volume
SELECT * FROM top_features_by_volume LIMIT 10;
```

---

## ✅ SUMMARY

**WHAT YOU GET:**

1. ✅ **Instant Bug Reports** - Modal dialog captures errors automatically
2. ✅ **AI-Powered Fixes** - Claude agent finds and fixes bugs in <5 min
3. ✅ **Git Worktrees** - Safe isolated fixes, one human approval
4. ✅ **Feature Voting** - Volume-based prioritization (mentions win)
5. ✅ **Auto-Changelog** - Every PR updates changelog automatically
6. ✅ **User-Controlled** - Members trigger fixes, see ETA, get notified

**TIME TO FIX:**
- Bug reported: 0 seconds (automatic modal)
- AI analyzes: 30 seconds
- Fix created: 2-3 minutes
- Human approves: 1-2 minutes
- Deployed: 2 minutes
- **TOTAL: <10 minutes from report to fix deployed**

**WORKFLOW:**
```
User clicks "Report Bug"
  → GitHub Actions triggered
  → Claude analyzes error + stack trace
  → Claude creates fix
  → PR created in Git Worktree
  → Human approves (1 click)
  → Auto-merge + deploy
  → User notified "Bug fixed!"
  → Changelog updated
```

**RESULT:** Self-healing application with AI-powered bug fixes and community-driven features. 🚀
