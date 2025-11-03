import 'package:flutter/widgets.dart';
import 'colors.dart';

/// Hard-coded typography tokens - NO Material Design
class CUTypography {
  CUTypography._();

  // Display
  static const h1 = TextStyle(
    fontSize: 64,
    fontWeight: FontWeight.w700,
    color: CUColors.white,
    letterSpacing: -1.28,
    height: 1.1,
  );

  static const h2 = TextStyle(
    fontSize: 48,
    fontWeight: FontWeight.w700,
    color: CUColors.white,
    letterSpacing: -0.96,
    height: 1.15,
  );

  static const h3 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    color: CUColors.white,
    letterSpacing: -0.64,
    height: 1.2,
  );

  static const h4 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    color: CUColors.white,
    letterSpacing: -0.48,
    height: 1.3,
  );

  // Body
  static const bodyLarge = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w400,
    color: CUColors.white,
    letterSpacing: 0,
    height: 1.5,
  );

  static const body = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    color: CUColors.white,
    letterSpacing: 0,
    height: 1.5,
  );

  static const bodySmall = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    color: CUColors.white60,
    letterSpacing: 0,
    height: 1.5,
  );

  // Labels
  static const label = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    color: CUColors.white60,
    letterSpacing: 0.48,
    height: 1.4,
  );

  // Price
  static const price = TextStyle(
    fontSize: 48,
    fontWeight: FontWeight.w700,
    color: CUColors.white,
    letterSpacing: -0.96,
    height: 1.2,
  );

  static const priceLabel = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w400,
    color: CUColors.white60,
    letterSpacing: 0,
    height: 1.4,
  );
}
