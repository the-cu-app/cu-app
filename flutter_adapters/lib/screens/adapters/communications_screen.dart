import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class CommunicationsScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const CommunicationsScreen({
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
              currentRoute: '/adapters/communications',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.speechBubble(size: 64),
              name: communicationsAdapter.name,
              tagline: communicationsAdapter.tagline,
              description: communicationsAdapter.description,
            ),
            AdapterFeatures(features: communicationsAdapter.features),
            AdapterPricing(
              adapter: communicationsAdapter,
              onCheckout: () => onNavigate('/checkout/communications'),
            ),
          ],
        ),
      ),
    );
  }
}
