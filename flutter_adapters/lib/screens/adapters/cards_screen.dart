import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class CardsScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const CardsScreen({
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
              currentRoute: '/adapters/cards',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.roundedRectangle(size: 64),
              name: cardsAdapter.name,
              tagline: cardsAdapter.tagline,
              description: cardsAdapter.description,
            ),
            AdapterFeatures(features: cardsAdapter.features),
            AdapterPricing(
              adapter: cardsAdapter,
              onCheckout: () => onNavigate('/checkout/cards'),
            ),
          ],
        ),
      ),
    );
  }
}
