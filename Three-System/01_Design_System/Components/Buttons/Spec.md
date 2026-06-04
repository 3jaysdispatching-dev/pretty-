# THREE Component Library - Button

## Overview
Buttons are the primary interaction element in THREE. They trigger actions, navigate, or toggle states.

## Types

### Primary Button
Used for main actions (create load, dispatch driver, submit form).

```html
<button class="btn-primary">Create Load</button>
```

**States:**
- Default
- Hover (20% brighter)
- Active (20% darker)
- Disabled (opacity: 0.5)
- Loading (spinner)

### Secondary Button
Used for less critical actions (cancel, close, back).

```html
<button class="btn-secondary">Cancel</button>
```

### Danger Button
Used for destructive actions (delete, remove, cancel shipment).

```html
<button class="btn-danger">Delete Load</button>
```

### Icon Button
Used for toolbar actions, compact spaces.

```html
<button class="btn-icon" title="Settings">⚙️</button>
```

## Size Variants

| Size | Padding | Font | Use Case |
|------|---------|------|----------|
| Small | 6px 12px | 12px | Compact spaces, toolbars |
| Medium | 10px 16px | 14px | Most common |
| Large | 12px 20px | 16px | Primary CTAs |

## States

```css
/* Default */
.btn-primary { background: #9D4EDD; color: white; }

/* Hover */
.btn-primary:hover { background: #B565F5; }

/* Active */
.btn-primary:active { background: #7B2CBF; }

/* Disabled */
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

/* Loading */
.btn-primary.loading { pointer-events: none; position: relative; }
```

## Accessibility

- ✓ WCAG AAA contrast (7:1 on primary)
- ✓ Minimum 44px touch target
- ✓ Clear focus state (outline: 2px)
- ✓ Disabled state announced to screen readers
- ✓ Loading state managed with aria-busy

## Code Example

```jsx
<Button 
  variant="primary" 
  size="lg" 
  onClick={handleClick}
  disabled={isLoading}
  isLoading={isLoading}
>
  {isLoading ? 'Creating...' : 'Create Load'}
</Button>
```

## Usage Guidelines

- Use sentence case: "Create Load", not "CREATE LOAD"
- Keep text concise (1-3 words max)
- One primary button per view
- Group related buttons together
- Space buttons 8px minimum apart
