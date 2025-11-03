import 'package:flutter/widgets.dart';
import 'colors.dart';

/// SVG shape definitions for adapters
class CUShapes {
  CUShapes._();

  /// Circle - Banking Core
  static Widget circle({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _CirclePainter(color),
    );
  }

  /// Hexagon - ISO20022
  static Widget hexagon({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _HexagonPainter(color),
    );
  }

  /// Shield - Compliance
  static Widget shield({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _ShieldPainter(color),
    );
  }

  /// Rounded Triangle - Financial Wellness
  static Widget roundedTriangle({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _RoundedTrianglePainter(color),
    );
  }

  /// Rounded Rectangle - Cards
  static Widget roundedRectangle({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _RoundedRectanglePainter(color),
    );
  }

  /// Triangle - Loans
  static Widget triangle({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _TrianglePainter(color),
    );
  }

  /// Diamond - Investments
  static Widget diamond({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _DiamondPainter(color),
    );
  }

  /// Grid Square - Design System
  static Widget gridSquare({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _GridSquarePainter(color),
    );
  }

  /// Speech Bubble - Communications
  static Widget speechBubble({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _SpeechBubblePainter(color),
    );
  }

  /// Bar Chart - Analytics
  static Widget barChart({double size = 48, Color color = CUColors.white}) {
    return CustomPaint(
      size: Size(size, size),
      painter: _BarChartPainter(color),
    );
  }
}

// Custom painters for each shape

class _CirclePainter extends CustomPainter {
  final Color color;
  _CirclePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      size.width * 0.42,
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _HexagonPainter extends CustomPainter {
  final Color color;
  _HexagonPainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final path = Path();
    final cx = size.width / 2;
    final cy = size.height / 2;
    final r = size.width * 0.4;

    for (var i = 0; i < 6; i++) {
      final angle = (i * 60 - 30) * 3.14159 / 180;
      final x = cx + r * cos(angle);
      final y = cy + r * sin(angle);
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _ShieldPainter extends CustomPainter {
  final Color color;
  _ShieldPainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final path = Path();
    path.moveTo(size.width * 0.5, size.height * 0.08);
    path.lineTo(size.width * 0.83, size.height * 0.25);
    path.lineTo(size.width * 0.83, size.height * 0.5);
    path.quadraticBezierTo(
      size.width * 0.83, size.height * 0.75,
      size.width * 0.5, size.height * 0.92,
    );
    path.quadraticBezierTo(
      size.width * 0.17, size.height * 0.75,
      size.width * 0.17, size.height * 0.5,
    );
    path.lineTo(size.width * 0.17, size.height * 0.25);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RoundedTrianglePainter extends CustomPainter {
  final Color color;
  _RoundedTrianglePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2
      ..strokeJoin = StrokeJoin.round;

    final path = Path();
    path.moveTo(size.width * 0.5, size.height * 0.17);
    path.lineTo(size.width * 0.83, size.height * 0.75);
    path.lineTo(size.width * 0.17, size.height * 0.75);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RoundedRectanglePainter extends CustomPainter {
  final Color color;
  _RoundedRectanglePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(
        size.width * 0.17,
        size.height * 0.33,
        size.width * 0.66,
        size.height * 0.33,
      ),
      const Radius.circular(3),
    );

    canvas.drawRRect(rrect, paint);

    // Card stripe
    canvas.drawLine(
      Offset(size.width * 0.17, size.height * 0.46),
      Offset(size.width * 0.83, size.height * 0.46),
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _TrianglePainter extends CustomPainter {
  final Color color;
  _TrianglePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final path = Path();
    path.moveTo(size.width * 0.5, size.height * 0.17);
    path.lineTo(size.width * 0.83, size.height * 0.83);
    path.lineTo(size.width * 0.17, size.height * 0.83);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _DiamondPainter extends CustomPainter {
  final Color color;
  _DiamondPainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final path = Path();
    path.moveTo(size.width * 0.5, size.height * 0.08);
    path.lineTo(size.width * 0.92, size.height * 0.5);
    path.lineTo(size.width * 0.5, size.height * 0.92);
    path.lineTo(size.width * 0.08, size.height * 0.5);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _GridSquarePainter extends CustomPainter {
  final Color color;
  _GridSquarePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final rect = Rect.fromLTWH(
      size.width * 0.17,
      size.height * 0.17,
      size.width * 0.66,
      size.height * 0.66,
    );

    canvas.drawRect(rect, paint);

    // Grid lines
    final thinPaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;

    // Vertical
    canvas.drawLine(
      Offset(size.width * 0.5, size.height * 0.17),
      Offset(size.width * 0.5, size.height * 0.83),
      thinPaint,
    );

    // Horizontal
    canvas.drawLine(
      Offset(size.width * 0.17, size.height * 0.5),
      Offset(size.width * 0.83, size.height * 0.5),
      thinPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _SpeechBubblePainter extends CustomPainter {
  final Color color;
  _SpeechBubblePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(
        size.width * 0.17,
        size.height * 0.17,
        size.width * 0.66,
        size.height * 0.5,
      ),
      const Radius.circular(4),
    );

    canvas.drawRRect(rrect, paint);

    // Tail
    final path = Path();
    path.moveTo(size.width * 0.42, size.height * 0.67);
    path.lineTo(size.width * 0.33, size.height * 0.83);
    path.lineTo(size.width * 0.5, size.height * 0.67);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _BarChartPainter extends CustomPainter {
  final Color color;
  _BarChartPainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    // Three ascending bars
    canvas.drawRect(
      Rect.fromLTWH(
        size.width * 0.21,
        size.height * 0.58,
        size.width * 0.17,
        size.height * 0.25,
      ),
      paint,
    );

    canvas.drawRect(
      Rect.fromLTWH(
        size.width * 0.42,
        size.height * 0.42,
        size.width * 0.17,
        size.height * 0.42,
      ),
      paint,
    );

    canvas.drawRect(
      Rect.fromLTWH(
        size.width * 0.63,
        size.height * 0.25,
        size.width * 0.17,
        size.height * 0.58,
      ),
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Helper functions for hexagon
double sin(double radians) {
  return radians.sin();
}

double cos(double radians) {
  return radians.cos();
}

extension on double {
  double sin() {
    double x = this;
    double result = x;
    double term = x;
    for (int n = 1; n < 10; n++) {
      term *= -x * x / ((2 * n) * (2 * n + 1));
      result += term;
    }
    return result;
  }

  double cos() {
    double x = this;
    double result = 1;
    double term = 1;
    for (int n = 1; n < 10; n++) {
      term *= -x * x / ((2 * n - 1) * (2 * n));
      result += term;
    }
    return result;
  }
}
