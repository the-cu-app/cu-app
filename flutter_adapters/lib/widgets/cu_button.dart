import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';

/// Custom button widget - NO Material Design
class CUButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isPrimary;
  final bool isFullWidth;

  const CUButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.isPrimary = true,
    this.isFullWidth = false,
  }) : super(key: key);

  @override
  State<CUButton> createState() => _CUButtonState();
}

class _CUButtonState extends State<CUButton> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final isDisabled = widget.onPressed == null;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() {
        _isHovered = false;
        _isPressed = false;
      }),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) => setState(() => _isPressed = false),
        onTapCancel: () => setState(() => _isPressed = false),
        onTap: widget.onPressed,
        child: Container(
          width: widget.isFullWidth ? double.infinity : null,
          padding: const EdgeInsets.symmetric(
            horizontal: CUSpacing.lg,
            vertical: CUSpacing.md,
          ),
          decoration: BoxDecoration(
            color: _getBackgroundColor(isDisabled),
            border: Border.all(
              color: _getBorderColor(isDisabled),
              width: CUSpacing.borderMedium,
            ),
            borderRadius: BorderRadius.circular(CUSpacing.radiusMedium),
          ),
          child: Text(
            widget.text,
            textAlign: TextAlign.center,
            style: CUTypography.body.copyWith(
              color: _getTextColor(isDisabled),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }

  Color _getBackgroundColor(bool isDisabled) {
    if (isDisabled) return CUColors.black;
    if (_isPressed) return CUColors.white10;
    if (_isHovered) return CUColors.white5;
    return widget.isPrimary ? CUColors.white : CUColors.black;
  }

  Color _getBorderColor(bool isDisabled) {
    if (isDisabled) return CUColors.white30;
    if (_isHovered) return CUColors.white;
    return widget.isPrimary ? CUColors.white : CUColors.white60;
  }

  Color _getTextColor(bool isDisabled) {
    if (isDisabled) return CUColors.white30;
    return widget.isPrimary ? CUColors.black : CUColors.white;
  }
}
