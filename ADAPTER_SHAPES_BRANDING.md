# 🔷 ADAPTER SHAPE BRANDING SYSTEM

**Pure Black & White Geist Design**
**Each adapter gets a unique geometric shape**

---

## 🎨 SHAPE ASSIGNMENTS

### 1. Digital Banking Core - ⚫ CIRCLE
**Symbol:** Core, Central, Complete
```
Shape: Perfect circle
Meaning: The foundation, the center of everything
Use: Solid fill or stroke outline
```

### 2. ISO20022 Payments - ⬡ HEXAGON
**Symbol:** Standard, Protocol, Structure
```
Shape: Regular hexagon
Meaning: International standard, systematic, connected
Use: Stroke outline preferred
```

### 3. Compliance & Risk - 🛡️ SHIELD
**Symbol:** Protection, Security, Safety
```
Shape: Shield (pentagon with curved top)
Meaning: Defense, compliance, protection
Use: Stroke outline
```

### 4. Financial Wellness - ♥️ HEART (ROUNDED TRIANGLE)
**Symbol:** Health, Care, Growth
```
Shape: Rounded triangle pointing up
Meaning: Wellbeing, member care, positive growth
Use: Solid or outline
```

### 5. Card Management - ▭ ROUNDED RECTANGLE
**Symbol:** Card, Transaction, Payment
```
Shape: Rounded rectangle (credit card shape)
Meaning: Physical and virtual cards
Use: Solid with corner detail
```

### 6. Loan Origination - △ TRIANGLE
**Symbol:** Growth, Building, Increase
```
Shape: Equilateral triangle pointing up
Meaning: Building wealth, growth trajectory
Use: Stroke outline
```

### 7. Investment Platform - ◆ DIAMOND
**Symbol:** Value, Premium, Wealth
```
Shape: Diamond (rotated square)
Meaning: High value, investment, premium service
Use: Stroke outline
```

### 8. Design System - ◫ GRID/SQUARE
**Symbol:** Structure, System, Foundation
```
Shape: Square with internal grid
Meaning: Design tokens, systematic approach
Use: Grid pattern inside square
```

### 9. Communications - ◯ SPEECH BUBBLE (ROUNDED SQUARE)
**Symbol:** Message, Talk, Connect
```
Shape: Rounded square with tail
Meaning: Chat, notifications, messaging
Use: Stroke outline with tail
```

### 10. Analytics & Insights - ▱ BAR CHART
**Symbol:** Data, Metrics, Growth
```
Shape: Three ascending bars
Meaning: Analytics, insights, data visualization
Use: Simple bar shapes
```

---

## 🎯 DESIGN RULES

### Size
- Icon size: 48x48px or 64x64px
- Hero icon: 128x128px
- Favicon: 32x32px

### Colors
- **Black:** #000000
- **White:** #FFFFFF
- **Gray:** rgba(255,255,255,0.6) for secondary

### Stroke Width
- Standard: 2px
- Large: 3px
- Small: 1.5px

### Usage
```html
<!-- SVG Template -->
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Shape path here -->
</svg>
```

---

## 📐 SVG CODE FOR EACH SHAPE

### 1. CIRCLE (Banking Core)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="24" r="20" stroke="white" stroke-width="2"/>
</svg>
```

### 2. HEXAGON (ISO20022)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 4 L38 12 L38 28 L24 36 L10 28 L10 12 Z" stroke="white" stroke-width="2"/>
</svg>
```

### 3. SHIELD (Compliance)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 4 L40 12 L40 24 Q40 36 24 44 Q8 36 8 24 L8 12 Z" stroke="white" stroke-width="2"/>
</svg>
```

### 4. ROUNDED TRIANGLE (Financial Wellness)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 8 L40 36 L8 36 Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
</svg>
```

### 5. ROUNDED RECTANGLE (Cards)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect x="8" y="16" width="32" height="16" rx="3" stroke="white" stroke-width="2"/>
  <line x1="8" y1="22" x2="40" y2="22" stroke="white" stroke-width="2"/>
</svg>
```

### 6. TRIANGLE (Loans)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 8 L40 40 L8 40 Z" stroke="white" stroke-width="2"/>
</svg>
```

### 7. DIAMOND (Investments)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 4 L44 24 L24 44 L4 24 Z" stroke="white" stroke-width="2"/>
</svg>
```

### 8. GRID SQUARE (Design System)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect x="8" y="8" width="32" height="32" stroke="white" stroke-width="2"/>
  <line x1="24" y1="8" x2="24" y2="40" stroke="white" stroke-width="1"/>
  <line x1="8" y1="24" x2="40" y2="24" stroke="white" stroke-width="1"/>
</svg>
```

### 9. SPEECH BUBBLE (Communications)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect x="8" y="8" width="32" height="24" rx="4" stroke="white" stroke-width="2"/>
  <path d="M20 32 L16 40 L24 32" stroke="white" stroke-width="2"/>
</svg>
```

### 10. BAR CHART (Analytics)
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect x="10" y="28" width="8" height="12" fill="white"/>
  <rect x="20" y="20" width="8" height="20" fill="white"/>
  <rect x="30" y="12" width="8" height="28" fill="white"/>
</svg>
```

---

## 🎨 USAGE IN PAGES

### Hero Section
```html
<div class="flex items-center gap-4 mb-8">
  <!-- Large shape icon -->
  <div class="w-32 h-32 border border-white/20 rounded flex items-center justify-center">
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <!-- Shape SVG here -->
    </svg>
  </div>
  <div>
    <h1>Adapter Name</h1>
    <p>Description</p>
  </div>
</div>
```

### Navigation Badge
```html
<div class="w-8 h-8 flex items-center justify-center">
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
    <!-- Shape SVG here -->
  </svg>
</div>
```

### Cards/Tiles
```html
<div class="border border-white/10 rounded p-6">
  <div class="w-12 h-12 border border-white/10 rounded flex items-center justify-center mb-4">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
      <!-- Shape SVG here -->
    </svg>
  </div>
  <h3>Feature Name</h3>
</div>
```

---

## 🔤 TYPOGRAPHY PAIRING

### With Geist Font
```css
font-family: 'Geist', 'Inter', system-ui, sans-serif;
```

### Headings
- H1: 4rem (64px), Bold, -0.02em tracking
- H2: 3rem (48px), Bold, -0.01em tracking
- H3: 2rem (32px), Bold
- H4: 1.5rem (24px), SemiBold

### Body
- Large: 1.25rem (20px), Regular
- Base: 1rem (16px), Regular
- Small: 0.875rem (14px), Regular

---

## 🎯 BRANDING CONSISTENCY

### Each Adapter Page Must Have:
1. ✅ Unique geometric shape
2. ✅ Shape in hero section (128px)
3. ✅ Shape in navigation badge (24px)
4. ✅ Shape in feature cards (32px)
5. ✅ Shape in favicon
6. ✅ Black background (#000)
7. ✅ White text (#fff)
8. ✅ White borders (opacity 10-30%)
9. ✅ No gradients
10. ✅ No shadows

### Animation Rules
- ✅ Fade in allowed
- ✅ Slide up allowed
- ✅ Color transitions allowed
- ❌ Scale animations
- ❌ Rotate animations
- ❌ Float animations

---

## 📱 RESPONSIVE SIZES

### Desktop
- Hero icon: 128px
- Feature icons: 48px
- Nav badges: 24px

### Tablet
- Hero icon: 96px
- Feature icons: 40px
- Nav badges: 20px

### Mobile
- Hero icon: 64px
- Feature icons: 32px
- Nav badges: 16px

---

## 🎨 COLOR VARIATIONS

### Primary (Default)
```css
stroke: #FFFFFF;
fill: none;
```

### Hover
```css
stroke: #FFFFFF;
fill: rgba(255, 255, 255, 0.1);
```

### Active
```css
stroke: #FFFFFF;
fill: #FFFFFF;
```

### Disabled
```css
stroke: rgba(255, 255, 255, 0.3);
fill: none;
```

---

## 📦 EXPORT FORMATS

### Web
- SVG (inline)
- PNG (2x, 3x for retina)

### Favicon
- ICO 32x32
- PNG 192x192
- SVG

### Social
- OpenGraph 1200x630
- Twitter Card 800x418

---

**STATUS:** Shape system defined. Ready to implement across all 10 adapter pages.
