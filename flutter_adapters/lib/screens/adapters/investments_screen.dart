import 'package:flutter/widgets.dart';
import '../../tokens/colors.dart';
import '../../tokens/shapes.dart';
import '../../data/adapters_data.dart';
import '../../widgets/cu_navigation.dart';
import '../../widgets/adapter_hero.dart';
import '../../widgets/adapter_features.dart';
import '../../widgets/adapter_pricing.dart';

class InvestmentsScreen extends StatelessWidget {
  final Function(String) onNavigate;

  const InvestmentsScreen({
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
              currentRoute: '/adapters/investments',
              onNavigate: onNavigate,
            ),
            AdapterHero(
              shapeIcon: CUShapes.diamond(size: 64),
              name: investmentsAdapter.name,
              tagline: investmentsAdapter.tagline,
              description: investmentsAdapter.description,
            ),
            AdapterFeatures(features: investmentsAdapter.features),
            AdapterPricing(
              adapter: investmentsAdapter,
              onCheckout: () => onNavigate('/checkout/investments'),
            ),
          ],
        ),
      ),
    );
  }
}
