import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';

/// Hero section for adapter pages
class AdapterHero extends StatelessWidget {
  final Widget shapeIcon;
  final String name;
  final String tagline;
  final String description;

  const AdapterHero({
    Key? key,
    required this.shapeIcon,
    required this.name,
    required this.tagline,
    required this.description,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: CUSpacing.xl,
        vertical: CUSpacing.huge,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Shape icon
          Container(
            width: 128,
            height: 128,
            decoration: BoxDecoration(
              border: Border.all(
                color: CUColors.white10,
                width: CUSpacing.borderThin,
              ),
              borderRadius: BorderRadius.circular(CUSpacing.radiusLarge),
            ),
            child: Center(child: shapeIcon),
          ),
          const SizedBox(width: CUSpacing.xl),
          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(tagline, style: CUTypography.label),
                const SizedBox(height: CUSpacing.sm),
                Text(name, style: CUTypography.h1),
                const SizedBox(height: CUSpacing.md),
                Text(
                  description,
                  style: CUTypography.bodyLarge.copyWith(
                    color: CUColors.white60,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
