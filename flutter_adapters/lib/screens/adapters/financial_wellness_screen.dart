import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class FinancialWellnessScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const FinancialWellnessScreen({
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
              currentRoute: '/adapters/financial-wellness',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.roundedTriangle(size: 64),
              name: financialWellnessAdapter.name,
              tagline: financialWellnessAdapter.tagline,
              description: financialWellnessAdapter.description,
            ),
            AdapterFeatures(features: financialWellnessAdapter.features),
            AdapterPricing(
              adapter: financialWellnessAdapter,
              onCheckout: () => onNavigate('/checkout/financial-wellness'),
            ),
          ],
        ),
      ),
    );
  }
}
