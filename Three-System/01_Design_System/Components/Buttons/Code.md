# Buttons Code

The button system supports primary, secondary, tertiary, and icon-only variants, with consistent sizing, state handling, and accessibility support.

## Example usage

```jsx
<Button variant="primary" size="medium">Primary action</Button>
<Button variant="secondary" size="medium">Secondary action</Button>
<Button variant="tertiary" size="medium">Text action</Button>
<Button variant="icon" size="small" aria-label="Search">
  <Icon name="search" />
</Button>
```

## Variants

- `primary`: Use for the most important action on a screen.
- `secondary`: Use for supporting actions that are still important but less prominent.
- `tertiary`: Use for low-emphasis actions or subtle links.
- `icon`: Use for compact controls that rely on an icon and require a label for accessibility.

## Sizes

- `small`: Compact buttons for dense layouts or icon-only controls.
- `medium`: Standard button size for most actions.
- `large`: Use for high-priority actions or when a larger target is needed.

## States

Use states consistently to communicate availability and interaction feedback:

- `default`: Normal interactive state.
- `hover`: Highlight the button on pointer hover.
- `focus`: Show a clear focus ring for keyboard navigation.
- `active`: Provide pressed-state feedback.
- `disabled`: Disable interaction for unavailable actions.

## Accessibility

- Always provide an `aria-label` for icon-only buttons.
- Use semantic `<button>` markup whenever possible.
- Ensure disabled buttons remain visually distinct and do not rely on color alone.
- Provide text labels for actions that are critical to understanding the interface.

## Guidelines

- Use primary buttons for the main action on a page.
- Use secondary buttons for alternative or less prominent actions.
- Use tertiary buttons when a low-visual-weight action is appropriate.
- Use icon-only buttons sparingly and always include an accessible label.
- Prefer clear, concise button text that describes the action.
- Avoid using multiple primary buttons in the same view unless they represent distinct major actions.
