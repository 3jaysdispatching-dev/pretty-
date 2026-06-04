# THREE Design System - Layout & Grid

## 8px Grid System

All spacing is based on multiples of 8px for consistency and scalability.

```
4px  = 1 unit  (xs)
8px  = 2 units (sm)
12px = 3 units (md)
16px = 4 units (lg)
24px = 6 units (xl)
32px = 8 units (2xl)
48px = 12 units (3xl)
64px = 16 units (4xl)
```

## Breakpoints

| Name | Width | Device |
|------|-------|--------|
| sm | 640px | Large phone |
| md | 768px | Tablet |
| lg | 1024px | Small laptop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Large desktop |

## Container Widths

| Breakpoint | Container Width | Margin |
|------------|-----------------|--------|
| sm | 640px | 16px |
| md | 768px | 16px |
| lg | 1000px | 24px |
| xl | 1200px | 32px |
| 2xl | 1400px | 32px |

## Component Spacing

### Cards
- Padding: 16px (lg)
- Gap between cards: 16px (lg)
- Border radius: 12px

### Sections
- Vertical gap: 32px (2xl)
- Horizontal padding: 24px (xl)

### Forms
- Input height: 40px minimum
- Label gap: 8px (sm)
- Form group gap: 16px (lg)
- Button gap: 8px (sm)

## Responsive Typography

```css
/* Mobile-first */
h1 { font-size: 24px; line-height: 1.4; }
h2 { font-size: 20px; line-height: 1.5; }
h3 { font-size: 18px; line-height: 1.5; }
body { font-size: 14px; line-height: 1.6; }

/* md+ (tablet) */
@media (min-width: 768px) {
  h1 { font-size: 32px; }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }
  body { font-size: 16px; }
}

/* lg+ (desktop) */
@media (min-width: 1024px) {
  h1 { font-size: 40px; }
  h2 { font-size: 28px; }
  h3 { font-size: 24px; }
}
```

## Layout Patterns

### Dashboard Grid
```
3-column on desktop
2-column on tablet
1-column on mobile
Gap: 16px
```

### Sidebar + Content
```
Sidebar: 260px (desktop), collapsible (mobile)
Content: flexible
Min sidebar width: 200px
```

### Modal
```
Max width: 600px
Min height: 300px
Margin: center
Padding: 24px
```

## Accessibility Considerations

- Minimum text size: 12px
- Line height minimum: 1.4
- Letter spacing: 0 (use font weight instead)
- Container max-width: helps readability
- Focus indicators: minimum 2px
