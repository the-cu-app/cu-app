import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class BankingCoreScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const BankingCoreScreen({
    Key? key,
    required this.onNavigate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: CUColors.background,
      child: SingleChildScrollView(
        child: Column(
          children: [
            CUNavigation(
              currentRoute: '/adapters/banking-core',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.circle(size: 64),
              name: bankingCoreAdapter.name,
              tagline: bankingCoreAdapter.tagline,
              description: bankingCoreAdapter.description,
            ),
            AdapterFeatures(features: bankingCoreAdapter.features),
            AdapterPricing(
              adapter: bankingCoreAdapter,
              onCheckout: () => onNavigate('/checkout/banking-core'),
            ),
          ],
        ),
      ),
    );
  }
}
