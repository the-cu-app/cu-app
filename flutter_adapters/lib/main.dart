import 'package:flutter/widgets.dart';
import 'tokens/colors.dart';
import 'screens/adapters/banking_core_screen.dart';
import 'screens/adapters/iso20022_screen.dart';
import 'screens/adapters/compliance_screen.dart';
import 'screens/adapters/financial_wellness_screen.dart';
import 'screens/adapters/cards_screen.dart';
import 'screens/adapters/loans_screen.dart';
import 'screens/adapters/investments_screen.dart';
import 'screens/adapters/design_system_screen.dart';
import 'screens/adapters/communications_screen.dart';
import 'screens/adapters/analytics_screen.dart';
import 'screens/checkout_screen.dart';

void main() {
  runApp(const CUAdaptersApp());
}

class CUAdaptersApp extends StatefulWidget {
  const CUAdaptersApp({Key? key}) : super(key: key);

  @override
  State<CUAdaptersApp> createState() => _CUAdaptersAppState();
}

class _CUAdaptersAppState extends State<CUAdaptersApp> {
  String _currentRoute = '/adapters/banking-core';

  void _navigate(String route) {
    setState(() {
      _currentRoute = route;
    });
  }

  @override
  Widget build(BuildContext context) {
    return WidgetsApp(
      title: 'CU.APP Adapters',
      color: CUColors.black,
      builder: (context, child) {
        return Container(
          color: CUColors.background,
          child: _buildScreen(),
        );
      },
    );
  }

  Widget _buildScreen() {
    // Adapter screens
    if (_currentRoute == '/adapters/banking-core') {
      return BankingCoreScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/iso20022') {
      return Iso20022Screen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/compliance') {
      return ComplianceScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/financial-wellness') {
      return FinancialWellnessScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/cards') {
      return CardsScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/loans') {
      return LoansScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/investments') {
      return InvestmentsScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/design-system') {
      return DesignSystemScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/communications') {
      return CommunicationsScreen(onNavigate: _navigate);
    }
    if (_currentRoute == '/adapters/analytics') {
      return AnalyticsScreen(onNavigate: _navigate);
    }

    // Checkout screens
    if (_currentRoute.startsWith('/checkout/')) {
      final adapterId = _currentRoute.replaceFirst('/checkout/', '');
      return CheckoutScreen(
        adapterId: adapterId,
        onNavigate: _navigate,
      );
    }

    // Default fallback
    return BankingCoreScreen(onNavigate: _navigate);
  }
}
