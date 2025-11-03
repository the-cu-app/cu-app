# CU.APP Flutter Adapters

**ZERO Material Design - Pure Black & White**

## Structure

```
/lib
  /tokens
    colors.dart          # Hard color tokens (#000, #FFF)
    typography.dart      # Hard typography tokens (Geist-style)
    spacing.dart         # Hard spacing tokens (8px grid)
    shapes.dart          # SVG shape definitions (10 unique shapes)

  /widgets
    cu_navigation.dart   # Custom navigation bar
    cu_button.dart       # Custom button (NO Material)
    cu_card.dart         # Custom card component
    adapter_hero.dart    # Hero section with shape
    adapter_features.dart # Features grid (9 features)
    adapter_pricing.dart  # Pricing section

  /screens
    /adapters
      banking_core_screen.dart       # Circle ⚫
      iso20022_screen.dart          # Hexagon ⬡
      compliance_screen.dart        # Shield 🛡️
      financial_wellness_screen.dart # Rounded Triangle ♥️
      cards_screen.dart             # Rounded Rectangle ▭
      loans_screen.dart             # Triangle △
      investments_screen.dart       # Diamond ◆
      design_system_screen.dart     # Grid Square ◫
      communications_screen.dart    # Speech Bubble ◯
      analytics_screen.dart         # Bar Chart ▱
    checkout_screen.dart

  /data
    adapters_data.dart   # All adapter data (pricing, features, specs)

  main.dart
```

## Design System

### Colors
- Black: `#000000`
- White: `#FFFFFF`
- White 60%: `rgba(255,255,255,0.6)`
- White 30%: `rgba(255,255,255,0.3)`
- White 10%: `rgba(255,255,255,0.1)`

### Typography
- H1: 64px, Bold, -0.02em tracking
- H2: 48px, Bold, -0.01em tracking
- H3: 32px, Bold
- H4: 24px, SemiBold
- Body Large: 20px, Regular
- Body: 16px, Regular
- Body Small: 14px, Regular

### Spacing
- Base unit: 8px
- Card gap: 16px
- Section gap: 96px
- Container padding: 24px

### Shapes (10 Unique)
1. **Circle** - Banking Core
2. **Hexagon** - ISO20022
3. **Shield** - Compliance
4. **Rounded Triangle** - Financial Wellness
5. **Rounded Rectangle** - Cards
6. **Triangle** - Loans
7. **Diamond** - Investments
8. **Grid Square** - Design System
9. **Speech Bubble** - Communications
10. **Bar Chart** - Analytics

## All 10 Adapters

### 1. Digital Banking Core - $15K
- Multi-account support
- Transaction processing
- Card management
- ACH & Wire transfers
- Mobile deposits
- Bill pay
- Zelle integration
- Account analytics
- Security & compliance

### 2. ISO20022 Payment - $12K
- ISO20022 native messaging
- Payment initiation
- Credit transfers
- Direct debits
- Multi-currency support
- Real-time status tracking
- Validation & enrichment
- Compliance reporting

### 3. Compliance & Risk - $10K
- CFPB 1033 data portability
- Sanctions screening
- KYC/AML workflows
- Fraud detection
- Transaction monitoring
- Risk assessments
- Audit trails
- Regulatory reporting

### 4. Financial Wellness - $8K
- Budget management
- Goal tracking
- Credit score monitoring
- Financial calculators
- AI recommendations
- Cash flow forecasting
- Financial education
- Spending insights

### 5. Card Management - $9K
- Card issuance
- Real-time card controls
- Virtual cards
- Instant provisioning
- Fraud monitoring
- Transaction alerts
- Card design
- PIN management

### 6. Loan Origination - $18K
- Digital applications
- Credit decisioning
- Document management
- Loan servicing
- Payment processing
- Collections workflow
- Underwriting rules
- Portfolio management

### 7. Investment Platform - $20K
- Investment accounts
- Portfolio tracking
- Trading execution
- Market data
- Performance reporting
- Tax document generation
- Asset allocation tools
- Risk analysis

### 8. Design System - $5K
- Component library (300+)
- Design tokens
- Theme customization
- Brand guidelines
- Animation library
- A/B testing framework
- Component documentation
- White-label theming

### 9. Communications - $6K
- Real-time chat
- Push notifications
- Email campaigns
- In-app messaging
- SMS alerts
- Support ticketing
- Chat permissions
- Message templates

### 10. Analytics & Insights - $7K
- Real-time dashboards
- Spending analytics
- Cash flow forecasting
- A/B testing engine
- User behavior tracking
- Custom reports
- Data visualization
- Export capabilities

## Pricing

### Individual Adapters
- $5K - $20K one-time
- $100 - $700/mo maintenance

### Complete Suite
- **$50,000 one-time**
- **NO monthly fees**
- Perpetual license
- All 10 adapters
- Save $60,000 (55% off)

## Run

```bash
flutter run
```

## Build

```bash
flutter build web
flutter build macos
flutter build ios
```

## Key Features

- ZERO Material Design widgets
- Pure black (#000) background
- Pure white (#FFF) text
- Hard-coded design tokens
- Custom SVG shapes
- No theme inheritance
- No gradients
- No shadows
- Geist-style typography
- 10 unique adapter pages
- Stripe checkout integration ready
