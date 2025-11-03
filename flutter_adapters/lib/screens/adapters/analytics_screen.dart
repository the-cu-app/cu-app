import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class AnalyticsScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const AnalyticsScreen({
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
              currentRoute: '/adapters/analytics',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.barChart(size: 64),
              name: analyticsAdapter.name,
              tagline: analyticsAdapter.tagline,
              description: analyticsAdapter.description,
            ),
            AdapterFeatures(features: analyticsAdapter.features),
            AdapterPricing(
              adapter: analyticsAdapter,
              onCheckout: () => onNavigate('/checkout/analytics'),
            ),
          ],
        ),
      ),
    );
  }
}
