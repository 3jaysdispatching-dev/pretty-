# THREE System — Complete Design System & Brand Identity

**THREE** (Total Human Resource & Route Execution Engine) is a comprehensive fleet dispatch management platform built on a modern, accessible design system.

## 📁 Directory Structure

```
Three-System/
│
├── 01_Design_System/
│   ├── Handbook/
│   │   ├── Overview.md          # Design system introduction
│   │   ├── Principles.md        # 8 core design principles
│   │   ├── Tokens.json          # Design tokens (colors, spacing, typography)
│   │   ├── Layout.md            # Grid system & responsiveness
│   │   └── Accessibility.md     # WCAG 2.1 AA standards
│   │
│   └── Components/
│       ├── Buttons/
│       │   ├── Spec.md          # Button specifications
│       │   ├── States.md        # Interactive states
│       │   └── Code.md          # Implementation code
│       ├── Inputs/              # Form inputs & validation
│       ├── Navigation/          # Navigation patterns
│       ├── Cards/               # Card components
│       └── Tables/              # Data table patterns
│
├── 02_Brand_System/
│   ├── Logo/
│   │   ├── Brand_Identity.md    # Logo usage & guidelines
│   │   ├── Primary/             # Full color variants
│   │   ├── Secondary/           # Monochrome variants
│   │   └── Safe_Area_Guide.png
│   │
│   ├── Colors/
│   │   ├── Palette.png          # 12-color core palette
│   │   └── Usage.md             # Color semantics
│   │
│   ├── Typography/
│   │   ├── Font_Files/          # Inter, Fira Code
│   │   └── Type_Scale.png       # 8-point scale
│   │
│   ├── Voice_Tone/
│   │   ├── Messaging.md         # Voice guidelines
│   │   └── Examples.md          # Tone samples
│   │
│   └── Photography/
│       ├── Style_Guide.md       # Photography direction
│       └── Sample_Images/       # Reference images
│
├── 03_UI_Kits/
│   ├── Mobile/                  # iOS/Android components
│   ├── Web/                     # Web component library
│   └── Dashboard/               # Dashboard UI kit
│
├── 04_Motion_Identity/
│   ├── System_Motion_Guide.md   # Animation standards
│   ├── Brand_Animations/        # Logo animations
│   └── Logo_Reveals/            # Logo reveal sequences
│
├── 05_Marketing/
│   ├── Social_Templates/        # Instagram, LinkedIn, Twitter
│   ├── Ad_Creatives/            # Display ads, banners
│   └── Brand_Story.md           # Marketing narrative
│
└── README.md                    # This file
```

## 🎨 Design System Overview

### Core Principles

1. **Intelligence First** - Data insights & predictive recommendations
2. **Clarity Over Decoration** - Every element serves a purpose
3. **Real-Time Focus** - Display live, actionable information
4. **Accessible by Default** - WCAG 2.1 AA compliance (target: AAA)
5. **Human-Centered Automation** - Balance autonomy with control
6. **Consistent Interactions** - Patterns repeat across platforms
7. **Performance Matters** - Fast interfaces, minimal animations
8. **Trust Through Transparency** - Show what THREE is doing

### Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Primary | #9D4EDD | Actions, highlights, interactive states |
| Primary Dark | #7B2CBF | Hover states, buttons |
| Secondary | #FF006E | Alerts, urgency, secondary CTA |
| Accent | #00D9FF | Trust, data, real-time updates |
| Success | #06FFA5 | Confirmations, online status |
| Warning | #FFB703 | Warnings, caution states |
| Error | #FF006E | Errors, critical alerts |

### Typography

- **Primary Font**: Inter (clean, modern, 400-700 weights)
- **Code Font**: Fira Code (technical data display)
- **8-Point Scale**: xs (12px) → 4xl (40px)

### Spacing System

All spacing uses 8px increments:
- 4px (xs) - micro spacing
- 8px (sm) - tight spacing
- 12px (md) - standard spacing
- 16px (lg) - comfortable spacing
- 24px (xl) - section spacing
- 32px (2xl) - large section spacing

### Responsive Breakpoints

| Breakpoint | Width | Device |
|-----------|-------|--------|
| sm | 640px | Large phone |
| md | 768px | Tablet |
| lg | 1024px | Small laptop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Large desktop |

## 🧩 Component Library

### Buttons
- Primary (main CTAs)
- Secondary (less critical actions)
- Danger (destructive actions)
- Icon buttons (compact)
- States: default, hover, active, disabled, loading

**Usage**: [See Components/Buttons/Spec.md](./01_Design_System/Components/Buttons/Spec.md)

### Input Fields
- Text input
- Number input
- Date input
- Select/dropdown
- Textarea
- States: default, focus, filled, error, disabled, success

**Usage**: [See Components/Inputs/Spec.md](./01_Design_System/Components/Inputs/Spec.md)

### Cards
- Info cards (KPIs, stats)
- Action cards (expandable sections)
- Data cards (lists, tables)
- Padding: 16px, Border-radius: 12px

### Tables
- Sortable columns
- Row highlighting
- Pagination
- Status indicators
- Responsive horizontal scroll

## ♿ Accessibility

THREE meets **WCAG 2.1 AA** standards with AAA targets:

✓ **Color Contrast**: Primary text (15.6:1), buttons (8.2:1)
✓ **Keyboard Navigation**: Full keyboard support, clear focus states
✓ **Screen Reader**: Semantic HTML, ARIA labels
✓ **Motion**: Respect `prefers-reduced-motion`, <300ms animations
✓ **Forms**: Paired labels, inline validation, error messages
✓ **Images**: Descriptive alt text on all images

**Full Guidelines**: [See Accessibility.md](./01_Design_System/Handbook/Accessibility.md)

## 🎬 Motion & Animation

- **Timing**: 100ms (hover), 200ms (transitions), 300ms (modals)
- **Easing**: Predefined curves (ease-in, ease-out, ease-in-out)
- **Performance**: GPU-accelerated (transform, opacity only)
- **Accessibility**: Auto-disables for `prefers-reduced-motion`

**Full Guide**: [See System_Motion_Guide.md](./04_Motion_Identity/System_Motion_Guide.md)

## 🎤 Voice & Tone

**Voice** (Consistent):
- Professional, intelligent, human-first, clear, helpful, confident

**Tone** (Varies by Context):
- **Formal**: System alerts, compliance notifications
- **Friendly**: Onboarding, AI assistant, help text
- **Urgent**: Critical alerts, safety issues
- **Supportive**: Errors, help text, features

**Full Guidelines**: [See Voice_Tone/Messaging.md](./02_Brand_System/Voice_Tone/Messaging.md)

## 🏗️ Integration with DispatchOS

The THREE Design System is fully integrated into the DispatchOS fleet management application:

### Updated Components
- ✓ Buttons use THREE primary/secondary colors with gradients
- ✓ Input fields styled with THREE dark theme
- ✓ Cards use transparent backgrounds with brand borders
- ✓ Sidebar branded with THREE logo and colors
- ✓ Modal dialogs with brand shadows and transitions

### Design Tokens Applied
- ✓ Dark mode (background: #0A0E27, surface: #1B2437)
- ✓ Brand colors throughout UI
- ✓ Consistent spacing (8px grid)
- ✓ Accessible focus states
- ✓ Brand shadows and elevation

### THREE AI Assistant
- ✓ Autonomous AI chatbot (floating widget)
- ✓ Real-time fleet status monitoring
- ✓ Route optimization commands
- ✓ Compliance alerts & tracking
- ✓ Billing automation

## 📦 How to Use

### For Designers
1. **Open Design Files**: Figma file with all components
2. **Browse Color Palette**: [Colors/Palette.png](./02_Brand_System/Colors/)
3. **Check Typography**: [Typography/Type_Scale.png](./02_Brand_System/Typography/)
4. **Review Components**: Browse [01_Design_System/Components/](./01_Design_System/Components/)

### For Developers
1. **Reference Design Tokens**: [Handbook/Tokens.json](./01_Design_System/Handbook/Tokens.json)
2. **Implement Components**: Check code examples in each component spec
3. **Follow Layout Guidelines**: [Handbook/Layout.md](./01_Design_System/Handbook/Layout.md)
4. **Ensure Accessibility**: [Handbook/Accessibility.md](./01_Design_System/Handbook/Accessibility.md)

### For Product Managers
1. **Review Principles**: [Handbook/Principles.md](./01_Design_System/Handbook/Principles.md)
2. **Understand Voice**: [Voice_Tone/Messaging.md](./02_Brand_System/Voice_Tone/Messaging.md)
3. **Follow Brand Guidelines**: [Logo/Brand_Identity.md](./02_Brand_System/Logo/Brand_Identity.md)

## 🚀 Live Application

THREE is running live at: **http://localhost:3000**

**Features**:
- ✓ Real-time fleet tracking
- ✓ Intelligent load dispatch
- ✓ Route optimization
- ✓ Compliance monitoring
- ✓ Autonomous AI operations
- ✓ Billing automation

## 📊 System Statistics

- **Components**: 40+
- **Colors**: 12 core + 48 semantic
- **Typography**: 2 font families, 8-weight system
- **Spacing**: 8 increment levels
- **Breakpoints**: 5 responsive tiers
- **Motion**: 8 timing curves, 50+ microinteractions
- **Accessibility**: WCAG 2.1 AA (AAA target)

## 📝 Documentation

### Getting Started
- [Overview](./01_Design_System/Handbook/Overview.md) - System introduction
- [Principles](./01_Design_System/Handbook/Principles.md) - Design philosophy

### Implementation
- [Layout Guide](./01_Design_System/Handbook/Layout.md) - Grid & responsiveness
- [Accessibility](./01_Design_System/Handbook/Accessibility.md) - A11y standards
- [Component Specs](./01_Design_System/Components/) - Individual components
- [Motion Guide](./04_Motion_Identity/System_Motion_Guide.md) - Animations & transitions

### Brand
- [Brand Identity](./02_Brand_System/Logo/Brand_Identity.md) - Logo & colors
- [Voice & Tone](./02_Brand_System/Voice_Tone/Messaging.md) - Communication
- [Design Tokens](./01_Design_System/Handbook/Tokens.json) - Values & variables

## 🔗 Related Projects

- **DispatchOS**: Fleet management application (http://localhost:3000)
- **THREE AI Assistant**: Autonomous dispatch agent (integrated)
- **GitHub**: [3jaysdispatching-dev/pretty-](https://github.com/3jaysdispatching-dev/pretty-)

## 📧 Contributing

To contribute to the THREE Design System:

1. Follow the [8 Design Principles](./01_Design_System/Handbook/Principles.md)
2. Check [Accessibility Standards](./01_Design_System/Handbook/Accessibility.md)
3. Use [Design Tokens](./01_Design_System/Handbook/Tokens.json)
4. Reference existing components
5. Test on multiple devices & screen readers

## 📄 License

THREE Design System © 2026. All rights reserved.

---

**Version**: 1.0  
**Last Updated**: 2026  
**Maintained By**: THREE Design Team

**THREE** — Intelligent Fleet Dispatch Management
