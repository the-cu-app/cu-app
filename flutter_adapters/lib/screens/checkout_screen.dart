import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';
import '../widgets/cu_navigation.dart';
import '../widgets/cu_button.dart';
import '../widgets/cu_card.dart';

class CheckoutScreen extends StatelessWidget {
  final String adapterId;
  final Function(String) onNavigate;

  const CheckoutScreen({
    Key? key,
    required this.adapterId,
    required this.onNavigate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: CUColors.background,
      child: Column(
        children: [
          CUNavigation(
            currentRoute: '/checkout/$adapterId',
            onNavigate: onNavigate,
          ),
          Expanded(
            child: Center(
              child: Container(
                width: 600,
                padding: const EdgeInsets.all(CUSpacing.xl),
                child: CUCard(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Complete Purchase',
                        style: CUTypography.h2,
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      Text(
                        'Proceeding to Stripe checkout for: $adapterId',
                        style: CUTypography.body.copyWith(
                          color: CUColors.white60,
                        ),
                      ),
                      const SizedBox(height: CUSpacing.xl),
                      CUButton(
                        text: 'Continue to Stripe',
                        onPressed: () {
                          // TODO: Integrate with Stripe checkout
                        },
                        isFullWidth: true,
                      ),
                      const SizedBox(height: CUSpacing.md),
                      CUButton(
                        text: 'Back to Adapter',
                        onPressed: () => onNavigate('/adapters/$adapterId'),
                        isPrimary: false,
                        isFullWidth: true,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
