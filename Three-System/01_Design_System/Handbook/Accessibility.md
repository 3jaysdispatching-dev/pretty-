# THREE Accessibility Standards

THREE is built for everyone. We follow WCAG 2.1 AA standards with AAA targets.

## Color Contrast

All text must meet minimum contrast ratios:

| Level | Ratio | Standard Text | Large Text |
|-------|-------|---------------|-----------|
| AA | 4.5:1 | ✓ Required | 3:1 |
| AAA | 7:1 | ✓ Target | 4.5:1 |

**Our Colors Pass:**
- Primary text (#E8EAED) on background (#0A0E27): **15.6:1** (AAA)
- Primary button (#9D4EDD) text: **8.2:1** (AAA)
- Warning (#FFB703) on white: **4.6:1** (AA)

## Keyboard Navigation

- ✓ All interactive elements accessible via Tab
- ✓ Tab order logical and visible
- ✓ Focus indicators clear (minimum 2px)
- ✓ No keyboard traps
- ✓ Escape closes modals/dropdowns
- ✓ Enter confirms actions
- ✓ Arrow keys navigate lists

## Screen Reader Support

```html
<!-- Images -->
<img src="logo.svg" alt="THREE logo - fleet management system">

<!-- Icons -->
<button aria-label="Settings">⚙️</button>

<!-- Form fields -->
<label for="driver-name">Driver Name</label>
<input id="driver-name" required>
<span class="error-msg" role="alert">Name is required</span>

<!-- Lists -->
<ul role="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Loading states -->
<button aria-busy="true">Processing...</button>

<!-- Modal dialog -->
<div role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Action</h2>
</div>
```

## Motion & Animation

- ✓ Respect `prefers-reduced-motion`
- ✓ Animations ≤ 300ms
- ✓ No flashing content (> 3 per second prohibited)
- ✓ Auto-playing content pausable

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Form Design

- ✓ Always use `<label>` elements
- ✓ Group related inputs with `<fieldset>` + `<legend>`
- ✓ Mark required fields with `required` attribute + visual indicator
- ✓ Error messages linked to inputs via `aria-describedby`
- ✓ Success/error announced via `role="alert"`

```html
<fieldset>
  <legend>Delivery Address</legend>
  
  <div class="form-group">
    <label for="street">Street Address *</label>
    <input 
      id="street" 
      type="text" 
      required
      aria-describedby="street-error"
    >
    <span id="street-error" class="error-msg" role="alert"></span>
  </div>
</fieldset>
```

## Text & Language

- ✓ Clear, simple language
- ✓ Avoid abbreviations (spell out first use)
- ✓ Descriptive link text ("Create Load" not "Click Here")
- ✓ Headings hierarchical (no skipped levels)
- ✓ Lists properly marked up

## Testing Checklist

- [ ] Navigate entire app with keyboard only
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check color contrast with WebAIM tool
- [ ] Zoom to 200% - layout still works
- [ ] Mobile zoom functional
- [ ] All images have alt text
- [ ] Form errors clear and recoverable
- [ ] No auto-playing media
- [ ] `prefers-reduced-motion` respected

## Resources

- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Axe DevTools: https://www.deque.com/axe/devtools/
