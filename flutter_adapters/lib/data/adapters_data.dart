/// All adapter data
class AdapterData {
  final String id;
  final String name;
  final String tagline;
  final String description;
  final int priceOnetime;
  final int priceMonthly;
  final int deployDays;
  final List<Feature> features;
  final TechnicalSpecs specs;

  const AdapterData({
    required this.id,
    required this.name,
    required this.tagline,
    required this.description,
    required this.priceOnetime,
    required this.priceMonthly,
    required this.deployDays,
    required this.features,
    required this.specs,
  });
}

class Feature {
  final String title;
  final String description;
  final List<String> items;

  const Feature({
    required this.title,
    required this.description,
    required this.items,
  });
}

class TechnicalSpecs {
  final int tables;
  final int views;
  final int functions;
  final int procedures;
  final int endpoints;
  final String responseTime;
  final String throughput;
  final String uptime;

  const TechnicalSpecs({
    required this.tables,
    required this.views,
    required this.functions,
    required this.procedures,
    required this.endpoints,
    required this.responseTime,
    required this.throughput,
    required this.uptime,
  });
}

/// All 10 adapters
final List<AdapterData> allAdapters = [
  bankingCoreAdapter,
  iso20022Adapter,
  complianceAdapter,
  financialWellnessAdapter,
  cardsAdapter,
  loansAdapter,
  investmentsAdapter,
  designSystemAdapter,
  communicationsAdapter,
  analyticsAdapter,
];

final bankingCoreAdapter = AdapterData(
  id: 'banking-core',
  name: 'Digital Banking Core Adapter',
  tagline: 'Complete digital banking platform',
  description: 'Accounts, cards, transactions, and payments in one production-ready adapter.',
  priceOnetime: 15000,
  priceMonthly: 500,
  deployDays: 7,
  features: [
    Feature(
      title: 'Multi-Account Support',
      description: 'Checking, savings, money market, and certificate accounts with real-time balance tracking.',
      items: ['Account opening workflows', 'Joint accounts', 'Account beneficiaries', 'Account statements'],
    ),
    Feature(
      title: 'Transaction Processing',
      description: 'Real-time transaction processing with automatic categorization and merchant enrichment.',
      items: ['Real-time processing', 'Auto-categorization', 'Merchant data', 'Receipt capture'],
    ),
    Feature(
      title: 'Card Management',
      description: 'Debit and credit card issuance, controls, and real-time fraud monitoring.',
      items: ['Instant card issuance', 'Virtual cards', 'Card controls', 'Fraud alerts'],
    ),
    Feature(
      title: 'ACH & Wire Transfers',
      description: 'Automated clearing house and wire transfer processing with same-day capabilities.',
      items: ['ACH push/pull', 'Wire transfers', 'Recurring transfers', 'Same-day ACH'],
    ),
    Feature(
      title: 'Mobile Deposits',
      description: 'Remote check deposit with image capture, validation, and same-day processing.',
      items: ['Check image capture', 'Auto validation', 'Same-day clearing', 'Deposit limits'],
    ),
    Feature(
      title: 'Bill Pay',
      description: 'Comprehensive bill payment system with payee management and scheduling.',
      items: ['One-time payments', 'Recurring payments', 'Payee management', 'Payment history'],
    ),
    Feature(
      title: 'Zelle Integration',
      description: 'Person-to-person payments via Zelle network with instant transfer capabilities.',
      items: ['P2P payments', 'Split payments', 'Request money', 'Instant transfers'],
    ),
    Feature(
      title: 'Account Analytics',
      description: 'Real-time balance monitoring, spending insights, and financial health scoring.',
      items: ['Balance alerts', 'Spending trends', 'Cash flow analysis', 'Budget tracking'],
    ),
    Feature(
      title: 'Security & Compliance',
      description: 'Bank-grade security with fraud detection, audit logging, and compliance tools.',
      items: ['Fraud detection', 'Audit trails', 'Encryption', 'Compliance ready'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 42,
    views: 12,
    functions: 28,
    procedures: 15,
    endpoints: 156,
    responseTime: '<100ms p95',
    throughput: '10K req/sec',
    uptime: '99.99%',
  ),
);

final iso20022Adapter = AdapterData(
  id: 'iso20022',
  name: 'ISO20022 Payment Adapter',
  tagline: 'Future-proof payment standards',
  description: 'ISO20022-compliant payment processing with real-time status tracking and multi-currency support.',
  priceOnetime: 12000,
  priceMonthly: 400,
  deployDays: 5,
  features: [
    Feature(
      title: 'ISO20022 Native Messaging',
      description: 'Full ISO20022 standard compliance with pain.001, pain.002, pacs.008, and camt messages.',
      items: ['Payment initiation (pain.001)', 'Payment status (pain.002)', 'Credit transfers (pacs.008)', 'Account statements (camt.053)'],
    ),
    Feature(
      title: 'Payment Initiation',
      description: 'Initiate payments using ISO20022 message formats with full validation.',
      items: ['Single payments', 'Batch payments', 'Recurring payments', 'Instant payments'],
    ),
    Feature(
      title: 'Credit Transfers',
      description: 'SEPA and international credit transfer processing with real-time execution.',
      items: ['SEPA credit transfers', 'International payments', 'Same-day execution', 'Bulk processing'],
    ),
    Feature(
      title: 'Direct Debits',
      description: 'SEPA direct debit processing with mandate management and SDD schemes.',
      items: ['SEPA direct debits', 'Mandate management', 'Core & B2B schemes', 'R-transactions'],
    ),
    Feature(
      title: 'Multi-Currency Support',
      description: 'Process payments in 150+ currencies with real-time FX rates.',
      items: ['150+ currencies', 'Real-time FX rates', 'Currency conversion', 'Multi-currency accounts'],
    ),
    Feature(
      title: 'Real-Time Status Tracking',
      description: 'Track payment status in real-time with detailed status codes and reason codes.',
      items: ['Real-time updates', 'Status webhooks', 'Detailed reason codes', 'Payment lifecycle'],
    ),
    Feature(
      title: 'Validation & Enrichment',
      description: 'Automatic message validation and data enrichment for compliance.',
      items: ['Schema validation', 'IBAN validation', 'BIC verification', 'Sanctions screening'],
    ),
    Feature(
      title: 'Compliance Reporting',
      description: 'Generate regulatory reports and audit trails for compliance requirements.',
      items: ['Transaction reports', 'Audit logs', 'Regulatory submissions', 'Data retention'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 18,
    views: 6,
    functions: 22,
    procedures: 12,
    endpoints: 84,
    responseTime: '<80ms p95',
    throughput: '15K req/sec',
    uptime: '99.99%',
  ),
);

final complianceAdapter = AdapterData(
  id: 'compliance',
  name: 'Compliance & Risk Adapter',
  tagline: 'Regulatory compliance built-in',
  description: 'CFPB 1033, sanctions screening, KYC/AML workflows, and fraud detection in one adapter.',
  priceOnetime: 10000,
  priceMonthly: 300,
  deployDays: 5,
  features: [
    Feature(
      title: 'CFPB 1033 Data Portability',
      description: 'Full compliance with CFPB 1033 consumer data access rule.',
      items: ['Data export formats', 'Third-party access', 'Consent management', 'Audit logging'],
    ),
    Feature(
      title: 'Sanctions Screening',
      description: 'Real-time sanctions screening against OFAC, EU, UN, and other watchlists.',
      items: ['OFAC screening', 'EU sanctions', 'UN watchlists', 'PEP screening'],
    ),
    Feature(
      title: 'KYC/AML Workflows',
      description: 'Complete know-your-customer and anti-money laundering workflows.',
      items: ['Identity verification', 'Document validation', 'Risk scoring', 'Ongoing monitoring'],
    ),
    Feature(
      title: 'Fraud Detection',
      description: 'AI-powered fraud detection with real-time alerts and case management.',
      items: ['Transaction monitoring', 'Anomaly detection', 'Risk scoring', 'Alert management'],
    ),
    Feature(
      title: 'Transaction Monitoring',
      description: 'Monitor all transactions for suspicious activity with configurable rules.',
      items: ['Rule engine', 'Pattern recognition', 'Velocity checks', 'Amount thresholds'],
    ),
    Feature(
      title: 'Risk Assessments',
      description: 'Automated risk assessments for customers, accounts, and transactions.',
      items: ['Customer risk scoring', 'Account risk levels', 'Transaction risk', 'Portfolio risk'],
    ),
    Feature(
      title: 'Audit Trails',
      description: 'Complete audit logging for all compliance activities and decisions.',
      items: ['Activity logs', 'Decision tracking', 'Data access logs', 'Change history'],
    ),
    Feature(
      title: 'Regulatory Reporting',
      description: 'Generate required regulatory reports including SAR, CTR, and FBAR.',
      items: ['SAR generation', 'CTR filing', 'FBAR reporting', 'Custom reports'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 24,
    views: 8,
    functions: 18,
    procedures: 10,
    endpoints: 92,
    responseTime: '<120ms p95',
    throughput: '8K req/sec',
    uptime: '99.99%',
  ),
);

final financialWellnessAdapter = AdapterData(
  id: 'financial-wellness',
  name: 'Financial Wellness Adapter',
  tagline: 'Engage members, drive loyalty',
  description: 'Budgeting, goals, credit monitoring, and AI-powered financial insights in one adapter.',
  priceOnetime: 8000,
  priceMonthly: 250,
  deployDays: 4,
  features: [
    Feature(
      title: 'Budget Management',
      description: 'Create and track budgets with automatic categorization and overspending alerts.',
      items: ['Budget creation', 'Auto-categorization', 'Overspending alerts', 'Budget templates'],
    ),
    Feature(
      title: 'Goal Tracking',
      description: 'Set and track financial goals with progress monitoring and milestone celebrations.',
      items: ['Savings goals', 'Debt payoff', 'Progress tracking', 'Goal milestones'],
    ),
    Feature(
      title: 'Credit Score Monitoring',
      description: 'Track credit scores with monthly updates and personalized improvement tips.',
      items: ['Monthly updates', 'Score history', 'Improvement tips', 'Credit factors'],
    ),
    Feature(
      title: 'Financial Calculators',
      description: 'Comprehensive suite of financial calculators for loans, savings, and retirement.',
      items: ['Loan calculator', 'Savings calculator', 'Retirement planner', 'Mortgage calculator'],
    ),
    Feature(
      title: 'AI Recommendations',
      description: 'Personalized financial recommendations powered by machine learning.',
      items: ['Spending insights', 'Savings opportunities', 'Product recommendations', 'Bill negotiation'],
    ),
    Feature(
      title: 'Cash Flow Forecasting',
      description: 'Predict future cash flow based on income and spending patterns.',
      items: ['Income prediction', 'Expense forecasting', 'Surplus/deficit alerts', 'Scenario planning'],
    ),
    Feature(
      title: 'Financial Education',
      description: 'Curated financial education content tailored to member needs.',
      items: ['Video tutorials', 'Articles', 'Interactive lessons', 'Quiz assessments'],
    ),
    Feature(
      title: 'Spending Insights',
      description: 'Detailed spending analytics with trends, comparisons, and optimization tips.',
      items: ['Category breakdown', 'Trend analysis', 'Peer comparison', 'Optimization tips'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 16,
    views: 5,
    functions: 14,
    procedures: 8,
    endpoints: 68,
    responseTime: '<90ms p95',
    throughput: '12K req/sec',
    uptime: '99.9%',
  ),
);

final cardsAdapter = AdapterData(
  id: 'cards',
  name: 'Card Management Adapter',
  tagline: 'Modern card controls',
  description: 'Debit, credit, and virtual cards with real-time controls and instant provisioning.',
  priceOnetime: 9000,
  priceMonthly: 300,
  deployDays: 5,
  features: [
    Feature(
      title: 'Card Issuance',
      description: 'Issue physical and virtual cards with instant activation and delivery.',
      items: ['Physical cards', 'Virtual cards', 'Instant activation', 'Card delivery tracking'],
    ),
    Feature(
      title: 'Real-Time Card Controls',
      description: 'Let members control their cards in real-time with instant updates.',
      items: ['Freeze/unfreeze', 'Spending limits', 'Merchant restrictions', 'Geographic controls'],
    ),
    Feature(
      title: 'Virtual Cards',
      description: 'Generate virtual cards for online shopping with one-time or recurring use.',
      items: ['Instant generation', 'One-time use', 'Recurring virtual cards', 'Merchant-specific cards'],
    ),
    Feature(
      title: 'Instant Provisioning',
      description: 'Add cards to Apple Pay, Google Pay, and Samsung Pay instantly.',
      items: ['Apple Pay', 'Google Pay', 'Samsung Pay', 'Fitbit Pay'],
    ),
    Feature(
      title: 'Fraud Monitoring',
      description: 'Real-time fraud detection with automatic blocking and member alerts.',
      items: ['Real-time monitoring', 'Auto-blocking', 'SMS alerts', 'Push notifications'],
    ),
    Feature(
      title: 'Transaction Alerts',
      description: 'Configurable alerts for all card transactions via push, SMS, or email.',
      items: ['Transaction alerts', 'Threshold alerts', 'Merchant alerts', 'Decline alerts'],
    ),
    Feature(
      title: 'Card Design',
      description: 'Customize card designs with your brand colors, logo, and artwork.',
      items: ['Custom designs', 'Brand colors', 'Logo placement', 'Artwork library'],
    ),
    Feature(
      title: 'PIN Management',
      description: 'Let members set and change PINs through the app or at ATMs.',
      items: ['PIN selection', 'PIN change', 'PIN reset', 'PIN-less transactions'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 12,
    views: 4,
    functions: 16,
    procedures: 9,
    endpoints: 72,
    responseTime: '<70ms p95',
    throughput: '20K req/sec',
    uptime: '99.99%',
  ),
);

final loansAdapter = AdapterData(
  id: 'loans',
  name: 'Loan Origination Adapter',
  tagline: 'Modern lending platform',
  description: 'Digital loan applications, credit decisioning, and loan servicing all in one adapter.',
  priceOnetime: 18000,
  priceMonthly: 600,
  deployDays: 10,
  features: [
    Feature(
      title: 'Digital Applications',
      description: 'Mobile-first loan applications with document upload and e-signature.',
      items: ['Online applications', 'Document upload', 'E-signature', 'Application status'],
    ),
    Feature(
      title: 'Credit Decisioning',
      description: 'Automated credit decisions using configurable underwriting rules.',
      items: ['Rule engine', 'Credit scoring', 'Income verification', 'Auto-approval'],
    ),
    Feature(
      title: 'Document Management',
      description: 'Manage all loan documents with version control and audit trails.',
      items: ['Document storage', 'Version control', 'E-signature', 'Audit trails'],
    ),
    Feature(
      title: 'Loan Servicing',
      description: 'Complete loan servicing platform with payment processing and account management.',
      items: ['Payment processing', 'Account management', 'Statement generation', 'Payoff quotes'],
    ),
    Feature(
      title: 'Payment Processing',
      description: 'Process loan payments via ACH, wire, check, or card with auto-pay support.',
      items: ['ACH payments', 'Card payments', 'Auto-pay', 'One-time payments'],
    ),
    Feature(
      title: 'Collections Workflow',
      description: 'Automated collections workflows with skip tracing and payment arrangements.',
      items: ['Delinquency tracking', 'Payment arrangements', 'Skip tracing', 'Legal actions'],
    ),
    Feature(
      title: 'Underwriting Rules',
      description: 'Configure underwriting rules with complex logic and decision trees.',
      items: ['Rule builder', 'Decision trees', 'Credit policies', 'Override workflows'],
    ),
    Feature(
      title: 'Portfolio Management',
      description: 'Manage entire loan portfolio with reporting and analytics.',
      items: ['Portfolio analytics', 'Delinquency reports', 'Performance metrics', 'Risk management'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 28,
    views: 9,
    functions: 24,
    procedures: 14,
    endpoints: 128,
    responseTime: '<150ms p95',
    throughput: '6K req/sec',
    uptime: '99.9%',
  ),
);

final investmentsAdapter = AdapterData(
  id: 'investments',
  name: 'Investment Platform Adapter',
  tagline: 'Wealth management platform',
  description: 'Investment accounts, portfolio management, and trading execution in one adapter.',
  priceOnetime: 20000,
  priceMonthly: 700,
  deployDays: 12,
  features: [
    Feature(
      title: 'Investment Accounts',
      description: 'Open and manage taxable, IRA, Roth IRA, and 401(k) accounts.',
      items: ['Account opening', 'Multiple account types', 'Joint accounts', 'Beneficiaries'],
    ),
    Feature(
      title: 'Portfolio Tracking',
      description: 'Track portfolio performance with real-time pricing and P&L.',
      items: ['Real-time pricing', 'P&L tracking', 'Asset allocation', 'Performance metrics'],
    ),
    Feature(
      title: 'Trading Execution',
      description: 'Execute trades for stocks, bonds, ETFs, and mutual funds.',
      items: ['Stock trading', 'ETF trading', 'Mutual funds', 'Bond trading'],
    ),
    Feature(
      title: 'Market Data',
      description: 'Real-time and historical market data with charts and analysis.',
      items: ['Real-time quotes', 'Historical data', 'Charts', 'Technical indicators'],
    ),
    Feature(
      title: 'Performance Reporting',
      description: 'Detailed performance reports with time-weighted and money-weighted returns.',
      items: ['Time-weighted returns', 'Money-weighted returns', 'Benchmarking', 'Attribution analysis'],
    ),
    Feature(
      title: 'Tax Document Generation',
      description: 'Generate 1099-DIV, 1099-INT, 1099-B, and other tax documents.',
      items: ['1099-DIV', '1099-INT', '1099-B', 'Cost basis reporting'],
    ),
    Feature(
      title: 'Asset Allocation Tools',
      description: 'Model portfolios and rebalancing tools for optimal asset allocation.',
      items: ['Model portfolios', 'Auto-rebalancing', 'Tax-loss harvesting', 'Drift monitoring'],
    ),
    Feature(
      title: 'Risk Analysis',
      description: 'Comprehensive risk analysis with stress testing and scenario analysis.',
      items: ['Risk scoring', 'Stress testing', 'Scenario analysis', 'Correlation analysis'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 32,
    views: 11,
    functions: 28,
    procedures: 16,
    endpoints: 148,
    responseTime: '<200ms p95',
    throughput: '5K req/sec',
    uptime: '99.95%',
  ),
);

final designSystemAdapter = AdapterData(
  id: 'design-system',
  name: 'Design System Adapter',
  tagline: 'Branded member experience',
  description: '300+ components, design tokens, and white-label theming for your brand.',
  priceOnetime: 5000,
  priceMonthly: 100,
  deployDays: 3,
  features: [
    Feature(
      title: 'Component Library',
      description: '300+ production-ready React components with TypeScript support.',
      items: ['300+ components', 'React + TypeScript', 'Storybook docs', 'Unit tested'],
    ),
    Feature(
      title: 'Design Tokens',
      description: 'Comprehensive design token system for colors, typography, spacing, and more.',
      items: ['Color tokens', 'Typography scale', 'Spacing system', 'Border radius'],
    ),
    Feature(
      title: 'Theme Customization',
      description: 'Easy theme customization with CSS variables and theme builder.',
      items: ['CSS variables', 'Theme builder', 'Dark mode', 'Multiple themes'],
    ),
    Feature(
      title: 'Brand Guidelines',
      description: 'Digital brand guidelines with logo usage, color palettes, and typography.',
      items: ['Logo guidelines', 'Color palettes', 'Typography rules', 'Iconography'],
    ),
    Feature(
      title: 'Animation Library',
      description: 'Motion design system with pre-built animations and transitions.',
      items: ['Micro-interactions', 'Page transitions', 'Loading states', 'Success/error animations'],
    ),
    Feature(
      title: 'A/B Testing Framework',
      description: 'Built-in A/B testing for components, layouts, and user flows.',
      items: ['Component variants', 'Layout testing', 'User flow experiments', 'Analytics integration'],
    ),
    Feature(
      title: 'Component Documentation',
      description: 'Interactive documentation with live examples and code snippets.',
      items: ['Storybook', 'Live examples', 'Props documentation', 'Code snippets'],
    ),
    Feature(
      title: 'White-Label Theming',
      description: 'Complete white-label support with multi-tenant theme management.',
      items: ['Multi-tenant themes', 'Brand asset management', 'Custom domains', 'Theme preview'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 8,
    views: 3,
    functions: 10,
    procedures: 4,
    endpoints: 42,
    responseTime: '<50ms p95',
    throughput: '25K req/sec',
    uptime: '99.95%',
  ),
);

final communicationsAdapter = AdapterData(
  id: 'communications',
  name: 'Communications Adapter',
  tagline: 'Engage members in real-time',
  description: 'Real-time chat, push notifications, and email campaigns in one adapter.',
  priceOnetime: 6000,
  priceMonthly: 200,
  deployDays: 4,
  features: [
    Feature(
      title: 'Real-Time Chat',
      description: 'Live chat with agents, chatbots, and peer-to-peer messaging.',
      items: ['Agent chat', 'Chatbot integration', 'P2P messaging', 'Typing indicators'],
    ),
    Feature(
      title: 'Push Notifications',
      description: 'Send push notifications to iOS, Android, and web with rich media.',
      items: ['iOS push', 'Android push', 'Web push', 'Rich media'],
    ),
    Feature(
      title: 'Email Campaigns',
      description: 'Create and send email campaigns with templates and personalization.',
      items: ['Email templates', 'Personalization', 'A/B testing', 'Campaign analytics'],
    ),
    Feature(
      title: 'In-App Messaging',
      description: 'Display in-app messages, banners, and modals with targeting rules.',
      items: ['Message types', 'Targeting rules', 'Frequency capping', 'Analytics'],
    ),
    Feature(
      title: 'SMS Alerts',
      description: 'Send transactional and marketing SMS with two-way messaging.',
      items: ['Transaction alerts', 'Marketing SMS', 'Two-way messaging', 'Opt-in/out management'],
    ),
    Feature(
      title: 'Support Ticketing',
      description: 'Complete support ticketing system with SLA tracking and escalation.',
      items: ['Ticket creation', 'SLA tracking', 'Escalation rules', 'Agent assignment'],
    ),
    Feature(
      title: 'Chat Permissions',
      description: 'Granular permissions for chat channels, participants, and message types.',
      items: ['Channel permissions', 'Participant roles', 'Message moderation', 'Content filtering'],
    ),
    Feature(
      title: 'Message Templates',
      description: 'Pre-built message templates for common scenarios with customization.',
      items: ['Template library', 'Variable substitution', 'Rich formatting', 'Multi-language'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 14,
    views: 5,
    functions: 12,
    procedures: 7,
    endpoints: 64,
    responseTime: '<60ms p95',
    throughput: '18K req/sec',
    uptime: '99.99%',
  ),
);

final analyticsAdapter = AdapterData(
  id: 'analytics',
  name: 'Analytics & Insights Adapter',
  tagline: 'Data-driven decisions',
  description: 'Real-time dashboards, spending analytics, and A/B testing in one adapter.',
  priceOnetime: 7000,
  priceMonthly: 250,
  deployDays: 4,
  features: [
    Feature(
      title: 'Real-Time Dashboards',
      description: 'Build custom dashboards with drag-and-drop widgets and real-time data.',
      items: ['Dashboard builder', 'Real-time data', 'Custom widgets', 'Filters'],
    ),
    Feature(
      title: 'Spending Analytics',
      description: 'Detailed spending analytics with category breakdown and trend analysis.',
      items: ['Category breakdown', 'Trend analysis', 'Merchant insights', 'Comparison tools'],
    ),
    Feature(
      title: 'Cash Flow Forecasting',
      description: 'Predict future cash flow based on income and spending patterns.',
      items: ['Income prediction', 'Expense forecasting', 'Scenario modeling', 'Alerts'],
    ),
    Feature(
      title: 'A/B Testing Engine',
      description: 'Run A/B tests on features, UI, and user flows with statistical significance.',
      items: ['Experiment creation', 'Variant testing', 'Statistical analysis', 'Auto-winner selection'],
    ),
    Feature(
      title: 'User Behavior Tracking',
      description: 'Track user behavior with events, funnels, and cohort analysis.',
      items: ['Event tracking', 'Funnel analysis', 'Cohort analysis', 'User paths'],
    ),
    Feature(
      title: 'Custom Reports',
      description: 'Build custom reports with SQL queries and export to Excel, PDF, or CSV.',
      items: ['SQL queries', 'Report builder', 'Scheduled reports', 'Export formats'],
    ),
    Feature(
      title: 'Data Visualization',
      description: 'Rich data visualizations with charts, graphs, and interactive elements.',
      items: ['Chart types', 'Interactive charts', 'Custom styling', 'Responsive design'],
    ),
    Feature(
      title: 'Export Capabilities',
      description: 'Export data to Excel, CSV, PDF, or via API with scheduling.',
      items: ['Excel export', 'CSV export', 'PDF reports', 'API access'],
    ),
  ],
  specs: TechnicalSpecs(
    tables: 18,
    views: 7,
    functions: 16,
    procedures: 9,
    endpoints: 76,
    responseTime: '<100ms p95',
    throughput: '10K req/sec',
    uptime: '99.9%',
  ),
);
