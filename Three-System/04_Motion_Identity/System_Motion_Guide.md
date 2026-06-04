# THREE Motion & Animation Guidelines

## Core Principles

1. **Purpose**: Every animation serves a function
2. **Efficiency**: Animations enhance speed, not slow it down
3. **Consistency**: Same motion patterns throughout
4. **Accessibility**: Respect `prefers-reduced-motion`
5. **Performance**: 60 fps minimum, no jank

## Timing Curves (Easing)

```json
{
  "easeIn": "cubic-bezier(0.42, 0, 1, 1)",
  "easeOut": "cubic-bezier(0, 0, 0.58, 1)",
  "easeInOut": "cubic-bezier(0.42, 0, 0.58, 1)",
  "easeOutQuad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  "easeOutCubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
  "easeOutQuart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
  "easeOutQuint": "cubic-bezier(0.23, 1, 0.32, 1)",
  "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}
```

## Duration Standards

| Duration | Use Case |
|----------|----------|
| 100ms | Hover states, UI feedback |
| 200ms | Transitions, state changes |
| 300ms | Modal open/close, page transitions |
| 500ms | Complex animations, sequences |

## Micro-interactions

### Button Interactions

```css
/* Hover - 100ms */
.btn:hover {
  transition: background 100ms ease-out;
  background: #B565F5;
  transform: translateY(-1px);
}

/* Click - 50ms */
.btn:active {
  transition: all 50ms ease-out;
  transform: scale(0.98);
}
```

### Loading States

```css
/* Spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Transitions

```css
/* Fade in */
.fade-in {
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide in from top */
.slide-down {
  animation: slideDown 300ms ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Real-Time Data Updates

```css
/* Highlight new data */
.highlight-update {
  animation: highlightPulse 1s ease-out;
}

@keyframes highlightPulse {
  0% {
    background-color: #06FFA5;
    opacity: 0.3;
  }
  100% {
    background-color: transparent;
    opacity: 0;
  }
}
```

## Accessible Motion

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Performance Guidelines

- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating: width, height, position
- Use `will-change` sparingly
- Test on low-end devices
- Profile with DevTools

## Animation Library (CSS Classes)

```css
/* Fade */
.animate-fade-in { animation: fadeIn 300ms ease-out; }

/* Slide */
.animate-slide-up { animation: slideUp 300ms ease-out; }
.animate-slide-down { animation: slideDown 300ms ease-out; }

/* Scale */
.animate-scale { animation: scale 200ms ease-out; }

/* Bounce */
.animate-bounce { animation: bounce 500ms ease-out; }

/* Pulse */
.animate-pulse { animation: pulse 2s infinite; }

/* Spin */
.animate-spin { animation: spin 1s linear infinite; }
```

## Page Transitions

- From dashboard → detail: Slide up (300ms)
- From detail → dashboard: Slide down (300ms)
- Between tabs: Fade (200ms)
- Modal open: Fade in + scale (300ms)
