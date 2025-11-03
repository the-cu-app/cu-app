import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class Iso20022Screen extends StatelessWidget {
  final Function(String) onNavigate;

  const Iso20022Screen({
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
              currentRoute: '/adapters/iso20022',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.hexagon(size: 64),
              name: iso20022Adapter.name,
              tagline: iso20022Adapter.tagline,
              description: iso20022Adapter.description,
            ),
            AdapterFeatures(features: iso20022Adapter.features),
            AdapterPricing(
              adapter: iso20022Adapter,
              onCheckout: () => onNavigate('/checkout/iso20022'),
            ),
          ],
        ),
      ),
    );
  }
}
