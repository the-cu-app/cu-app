import 'package:flutter/widgets.dart';
import '../tokens/colors.dart';
import '../tokens/typography.dart';
import '../tokens/spacing.dart';

/// Custom navigation bar - NO Material Design
class CUNavigation extends StatelessWidget {
  final String currentRoute;
  final Function(String) onNavigate;

  const CUNavigation({
    Key? key,
    required this.currentRoute,
    required this.onNavigate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: CUSpacing.xl,
        vertical: CUSpacing.lg,
      ),
      decoration: const BoxDecoration(
        color: CUColors.black,
        border: Border(
          bottom: BorderSide(
            color: CUColors.border,
            width: CUSpacing.borderThin,
          ),
        ),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => onNavigate('/'),
            child: const Text(
              'CU.APP',
              style: CUTypography.h4,
            ),
          ),
          const SizedBox(width: CUSpacing.xxl),
          _NavLink(
            text: 'Adapters',
            isActive: currentRoute.contains('adapter'),
            onTap: () => onNavigate('/adapters'),
          ),
          const SizedBox(width: CUSpacing.lg),
          _NavLink(
            text: 'Pricing',
            isActive: currentRoute == '/pricing',
            onTap: () => onNavigate('/pricing'),
          ),
          const Spacer(),
          const Text(
            'sales@cu.app',
            style: CUTypography.bodySmall,
          ),
        ],
      ),
    );
  }
}

class _NavLink extends StatefulWidget {
  final String text;
  final bool isActive;
  final VoidCallback onTap;

  const _NavLink({
    Key? key,
    required this.text,
    required this.isActive,
    required this.onTap,
  }) : super(key: key);

  @override
  State<_NavLink> createState() => _NavLinkState();
}

class _NavLinkState extends State<_NavLink> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: Text(
          widget.text,
          style: CUTypography.body.copyWith(
            color: widget.isActive
                ? CUColors.white
                : _isHovered
                    ? CUColors.white
                    : CUColors.white60,
            fontWeight: widget.isActive ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ),
    );
  }
}
