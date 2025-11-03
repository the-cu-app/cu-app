import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';
import '../data/adapters_data.dart';
import 'cu_card.dart';
import 'cu_button.dart';

/// Pricing section for adapter pages
class AdapterPricing extends StatelessWidget {
  final AdapterData adapter;
  final VoidCallback onCheckout;

  const AdapterPricing({
    Key? key,
    required this.adapter,
    required this.onCheckout,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: CUSpacing.xl,
        vertical: CUSpacing.sectionGap,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Pricing & Specs', style: CUTypography.h2),
          const SizedBox(height: CUSpacing.xxl),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Pricing card
              Expanded(
                child: CUCard(
                  borderColor: CUColors.white30,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Individual License',
                        style: CUTypography.h3,
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '\$${_formatPrice(adapter.priceOnetime)}',
                            style: CUTypography.price,
                          ),
                          const SizedBox(width: CUSpacing.xs),
                          const Padding(
                            padding: EdgeInsets.only(top: CUSpacing.md),
                            child: Text(
                              'one-time',
                              style: CUTypography.priceLabel,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: CUSpacing.sm),
                      Text(
                        '+ \$${adapter.priceMonthly}/mo maintenance',
                        style: CUTypography.bodyLarge.copyWith(
                          color: CUColors.white60,
                        ),
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      const Divider(
                        color: CUColors.white10,
                        height: 1,
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      _PricingFeature('Deploy in ${adapter.deployDays} days'),
                      _PricingFeature('24/7 priority support'),
                      _PricingFeature('Lifetime updates'),
                      _PricingFeature('White-glove onboarding'),
                      const SizedBox(height: CUSpacing.lg),
                      CUButton(
                        text: 'Buy Now',
                        onPressed: onCheckout,
                        isFullWidth: true,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: CUSpacing.cardGap),
              // Complete suite card
              Expanded(
                child: CUCard(
                  borderColor: CUColors.white,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: CUSpacing.sm,
                          vertical: CUSpacing.xxs,
                        ),
                        decoration: BoxDecoration(
                          color: CUColors.white,
                          borderRadius:
                              BorderRadius.circular(CUSpacing.radiusSmall),
                        ),
                        child: Text(
                          'BEST VALUE',
                          style: CUTypography.label.copyWith(
                            color: CUColors.black,
                          ),
                        ),
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      const Text(
                        'Complete Suite',
                        style: CUTypography.h3,
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            '\$50,000',
                            style: CUTypography.price,
                          ),
                          const SizedBox(width: CUSpacing.xs),
                          const Padding(
                            padding: EdgeInsets.only(top: CUSpacing.md),
                            child: Text(
                              'one-time',
                              style: CUTypography.priceLabel,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: CUSpacing.sm),
                      Text(
                        'No monthly fees - perpetual license',
                        style: CUTypography.bodyLarge.copyWith(
                          color: CUColors.white60,
                        ),
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      const Divider(
                        color: CUColors.white10,
                        height: 1,
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      const _PricingFeature('All 10 adapters included'),
                      const _PricingFeature('Save \$60,000 (55% off)'),
                      const _PricingFeature('Unlimited API calls'),
                      const _PricingFeature('Lifetime access'),
                      const SizedBox(height: CUSpacing.lg),
                      CUButton(
                        text: 'Get Complete Suite',
                        onPressed: () {},
                        isFullWidth: true,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: CUSpacing.cardGap),
              // Technical specs
              Expanded(
                child: CUCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Technical Specs',
                        style: CUTypography.h3,
                      ),
                      const SizedBox(height: CUSpacing.lg),
                      _SpecRow('Database Tables', '${adapter.specs.tables}'),
                      _SpecRow('Database Views', '${adapter.specs.views}'),
                      _SpecRow('Functions', '${adapter.specs.functions}'),
                      _SpecRow('Procedures', '${adapter.specs.procedures}'),
                      _SpecRow('API Endpoints', '${adapter.specs.endpoints}'),
                      const SizedBox(height: CUSpacing.md),
                      const Divider(
                        color: CUColors.white10,
                        height: 1,
                      ),
                      const SizedBox(height: CUSpacing.md),
                      _SpecRow('Response Time', adapter.specs.responseTime),
                      _SpecRow('Throughput', adapter.specs.throughput),
                      _SpecRow('Uptime SLA', adapter.specs.uptime),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _formatPrice(int price) {
    if (price >= 1000) {
      return '${(price / 1000).toStringAsFixed(0)}K';
    }
    return price.toString();
  }
}

class _PricingFeature extends StatelessWidget {
  final String text;

  const _PricingFeature(this.text, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: CUSpacing.sm),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 4,
            decoration: const BoxDecoration(
              color: CUColors.white,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: CUSpacing.sm),
          Expanded(
            child: Text(
              text,
              style: CUTypography.body,
            ),
          ),
        ],
      ),
    );
  }
}

class _SpecRow extends StatelessWidget {
  final String label;
  final String value;

  const _SpecRow(this.label, this.value, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: CUSpacing.sm),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: CUTypography.bodySmall,
          ),
          Text(
            value,
            style: CUTypography.body.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class Divider extends StatelessWidget {
  final Color color;
  final double height;

  const Divider({
    Key? key,
    required this.color,
    required this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      color: color,
    );
  }
}
