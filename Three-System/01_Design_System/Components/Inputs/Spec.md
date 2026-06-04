# THREE Component Library - Input Fields

## Overview
Input fields allow users to enter data. THREE inputs are designed for clarity and real-time feedback.

## Types

### Text Input
For single-line text (names, emails, cities).

```html
<input type="text" class="inp" placeholder="Enter driver name">
```

### Number Input
For numeric values (weight, rate, mileage).

```html
<input type="number" class="inp" placeholder="Enter weight (lbs)">
```

### Date Input
For date selection.

```html
<input type="date" class="inp">
```

### Select/Dropdown
For predefined options.

```html
<select class="inp">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Textarea
For multi-line input (notes, instructions).

```html
<textarea class="inp" rows="4" placeholder="Special instructions..."></textarea>
```

## States

| State | Appearance | When Used |
|-------|------------|-----------|
| Default | Border: #2D3D57 | Ready for input |
| Focus | Border: #9D4EDD, shadow | User is typing |
| Filled | Text visible | Data entered |
| Error | Border: #FF006E, icon | Validation failed |
| Disabled | opacity: 0.5 | Field unavailable |
| Success | Border: #06FFA5, icon | Valid input |

## Validation

```html
<div class="form-group">
  <label>Weight (lbs)</label>
  <input type="number" class="inp" required aria-label="Weight">
  <span class="error-msg">Must be greater than 0</span>
</div>
```

## Accessibility

- ✓ Always pair with `<label>`
- ✓ Use `aria-label` for icon inputs
- ✓ Clear error messages
- ✓ Support keyboard navigation (Tab, Arrow keys)
- ✓ Focus indicators visible
- ✓ Screen reader announces required fields

## CSS

```css
.inp {
  background: rgba(10, 14, 39, 0.8);
  border: 1px solid #2D3D57;
  border-radius: 8px;
  color: #E8EAED;
  padding: 10px 12px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.inp:focus {
  outline: none;
  border-color: #9D4EDD;
  background: rgba(10, 14, 39, 0.95);
}

.inp:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.inp.error {
  border-color: #FF006E;
}
```

## Usage Guidelines

- Labels should be above inputs (not placeholder text)
- Show validation errors inline
- Use placeholder for examples only
- Group related inputs with `<fieldset>`
- Provide real-time feedback when possible
