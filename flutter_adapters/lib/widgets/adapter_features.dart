import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';
import '../data/adapters_data.dart';
import 'cu_card.dart';

/// Features grid for adapter pages
class AdapterFeatures extends StatelessWidget {
  final List<Feature> features;

  const AdapterFeatures({
    Key? key,
    required this.features,
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
          const Text('Features', style: CUTypography.h2),
          const SizedBox(height: CUSpacing.xxl),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: CUSpacing.cardGap,
              mainAxisSpacing: CUSpacing.cardGap,
              childAspectRatio: 1.2,
            ),
            itemCount: features.length,
            itemBuilder: (context, index) {
              final feature = features[index];
              return CUCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      feature.title,
                      style: CUTypography.h4,
                    ),
                    const SizedBox(height: CUSpacing.sm),
                    Text(
                      feature.description,
                      style: CUTypography.bodySmall,
                    ),
                    const SizedBox(height: CUSpacing.md),
                    ...feature.items.map(
                      (item) => Padding(
                        padding: const EdgeInsets.only(
                          bottom: CUSpacing.xxs,
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              '• ',
                              style: CUTypography.bodySmall,
                            ),
                            Expanded(
                              child: Text(
                                item,
                                style: CUTypography.bodySmall,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
