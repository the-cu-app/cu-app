#!/bin/bash

# 🚀 CU.APP ONE-COMMAND DEPLOY SCRIPT
# Run: chmod +x deploy.sh && ./deploy.sh

set -e # Exit on any error

echo "🚀 CU.APP PRODUCTION DEPLOYMENT"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if commands exist
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Git check
echo "${YELLOW}Step 1: Checking Git status...${NC}"
if [ -d .git ]; then
    echo "${GREEN}✅ Git repository exists${NC}"
else
    echo "${RED}❌ Not a git repository${NC}"
    exit 1
fi

# Step 2: Stage and commit new files
echo ""
echo "${YELLOW}Step 2: Committing latest changes...${NC}"
git add -A
if git diff --staged --quiet; then
    echo "${GREEN}✅ No changes to commit${NC}"
else
    git commit -m "🚀 Production deployment updates

- Added DEPLOY_TO_PRODUCTION.md guide
- Added supabase_migration.sql
- Added deploy.sh script
- Ready for production launch"
    echo "${GREEN}✅ Changes committed${NC}"
fi

# Step 3: Check for remote
echo ""
echo "${YELLOW}Step 3: Checking GitHub remote...${NC}"
if git remote get-url origin >/dev/null 2>&1; then
    REMOTE_URL=$(git remote get-url origin)
    echo "${GREEN}✅ Remote exists: $REMOTE_URL${NC}"

    # Ask to push
    read -p "Push to GitHub? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin main
        echo "${GREEN}✅ Pushed to GitHub${NC}"
    else
        echo "${YELLOW}⏭️  Skipping GitHub push${NC}"
    fi
else
    echo "${RED}❌ No remote configured${NC}"
    echo "Set up remote:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/cu-app-production.git"
    echo "  git push -u origin main"
fi

# Step 4: Check for Vercel CLI
echo ""
echo "${YELLOW}Step 4: Checking Vercel CLI...${NC}"
if command_exists vercel; then
    echo "${GREEN}✅ Vercel CLI installed${NC}"

    # Ask to deploy
    read -p "Deploy to Vercel production? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Deploying to Vercel..."
        vercel --prod
        echo "${GREEN}✅ Deployed to Vercel${NC}"
    else
        echo "${YELLOW}⏭️  Skipping Vercel deployment${NC}"
    fi
else
    echo "${YELLOW}⚠️  Vercel CLI not installed${NC}"
    echo "Install: npm i -g vercel"
    echo "Then run: vercel --prod"
fi

# Step 5: Check for Supabase CLI
echo ""
echo "${YELLOW}Step 5: Checking Supabase CLI...${NC}"
if command_exists supabase; then
    echo "${GREEN}✅ Supabase CLI installed${NC}"

    # Ask to run migration
    read -p "Run Supabase migration? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Running migration..."
        # Check if linked
        if supabase db push --dry-run 2>/dev/null; then
            supabase db push
            echo "${GREEN}✅ Migration applied${NC}"
        else
            echo "${YELLOW}⚠️  Not linked to Supabase project${NC}"
            echo "Link: supabase link --project-ref YOUR_PROJECT_REF"
            echo "Or run SQL manually in Supabase Dashboard:"
            echo "  Copy contents of supabase_migration.sql"
        fi
    else
        echo "${YELLOW}⏭️  Skipping Supabase migration${NC}"
    fi
else
    echo "${YELLOW}⚠️  Supabase CLI not installed${NC}"
    echo "Install: brew install supabase/tap/supabase"
    echo "Or run SQL manually from: supabase_migration.sql"
fi

# Step 6: Build Next.js
echo ""
echo "${YELLOW}Step 6: Building Next.js...${NC}"
if [ -f "package.json" ]; then
    if npm run build; then
        echo "${GREEN}✅ Next.js build successful${NC}"
    else
        echo "${RED}❌ Build failed${NC}"
        exit 1
    fi
else
    echo "${YELLOW}⚠️  package.json not found${NC}"
fi

# Summary
echo ""
echo "================================"
echo "${GREEN}🎉 DEPLOYMENT SUMMARY${NC}"
echo "================================"
echo ""
echo "✅ Git committed"
echo "📦 Files ready for deployment"
echo ""
echo "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "1. Push to GitHub:"
echo "   ${GREEN}git push origin main${NC}"
echo ""
echo "2. Deploy to Vercel:"
echo "   ${GREEN}vercel --prod${NC}"
echo ""
echo "3. Run Supabase migration:"
echo "   ${GREEN}supabase db push${NC}"
echo "   Or paste supabase_migration.sql into Supabase SQL Editor"
echo ""
echo "4. Update environment variables in Vercel:"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""
echo "${GREEN}🚀 YOU'RE READY FOR PRODUCTION!${NC}"
echo ""
echo "See DEPLOY_TO_PRODUCTION.md for detailed instructions."
echo ""
