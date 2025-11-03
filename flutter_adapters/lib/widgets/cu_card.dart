import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

/// Custom card widget - NO Material Design
class CUCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final Color? borderColor;
  final VoidCallback? onTap;

  const CUCard({
    Key? key,
    required this.child,
    this.padding,
    this.borderColor,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final widget = Container(
      padding: padding ?? const EdgeInsets.all(CUSpacing.cardPadding),
      decoration: BoxDecoration(
        color: CUColors.black,
        border: Border.all(
          color: borderColor ?? CUColors.border,
          width: CUSpacing.borderThin,
        ),
        borderRadius: BorderRadius.circular(CUSpacing.radiusLarge),
      ),
      child: child,
    );

    if (onTap != null) {
      return GestureDetector(
        onTap: onTap,
        child: widget,
      );
    }

    return widget;
  }
}
