import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class ComplianceScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const ComplianceScreen({
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
              currentRoute: '/adapters/compliance',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.shield(size: 64),
              name: complianceAdapter.name,
              tagline: complianceAdapter.tagline,
              description: complianceAdapter.description,
            ),
            AdapterFeatures(features: complianceAdapter.features),
            AdapterPricing(
              adapter: complianceAdapter,
              onCheckout: () => onNavigate('/checkout/compliance'),
            ),
          ],
        ),
      ),
    );
  }
}
