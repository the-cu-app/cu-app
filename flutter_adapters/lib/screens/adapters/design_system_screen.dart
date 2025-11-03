import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class DesignSystemScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const DesignSystemScreen({
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
              currentRoute: '/adapters/design-system',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.gridSquare(size: 64),
              name: designSystemAdapter.name,
              tagline: designSystemAdapter.tagline,
              description: designSystemAdapter.description,
            ),
            AdapterFeatures(features: designSystemAdapter.features),
            AdapterPricing(
              adapter: designSystemAdapter,
              onCheckout: () => onNavigate('/checkout/design-system'),
            ),
          ],
        ),
      ),
    );
  }
}
