import 'package:flutter/widgets.dart';

/// Hard-coded color tokens - NO Material Design
class CUColors {
  CUColors._();

  // Primary colors
  static const black = Color(0xFF000000);
  static const white = Color(0xFFFFFFFF);

  // White opacity variants
  static const white90 = Color(0xE6FFFFFF);
  static const white60 = Color(0x99FFFFFF);
  static const white30 = Color(0x4DFFFFFF);
  static const white10 = Color(0x1AFFFFFF);
  static const white5 = Color(0x0DFFFFFF);

  // Functional colors
  static const background = black;
  static const textPrimary = white;
  static const textSecondary = white60;
  static const border = white10;
  static const borderHover = white30;
  static const accent = white;
}
