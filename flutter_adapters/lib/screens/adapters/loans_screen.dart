import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class LoansScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const LoansScreen({
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
              currentRoute: '/adapters/loans',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.triangle(size: 64),
              name: loansAdapter.name,
              tagline: loansAdapter.tagline,
              description: loansAdapter.description,
            ),
            AdapterFeatures(features: loansAdapter.features),
            AdapterPricing(
              adapter: loansAdapter,
              onCheckout: () => onNavigate('/checkout/loans'),
            ),
          ],
        ),
      ),
    );
  }
}
