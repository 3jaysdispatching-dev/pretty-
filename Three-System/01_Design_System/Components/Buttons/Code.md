# Buttons Code

The button system supports primary, secondary, tertiary, and icon-only variants.

## Example usage

```jsx
<Button variant="primary" size="medium">Primary action</Button>
<Button variant="secondary" size="medium">Secondary action</Button>
<Button variant="tertiary" size="medium">Text action</Button>
<Button variant="icon" size="small" aria-label="Search">
  <Icon name="search" />
</Button>
```

## Guidelines

- Use primary buttons for the main action on a page.
- Use secondary buttons for alternative or less prominent actions.
- Use tertiary buttons when a low-visual-weight action is appropriate.
- Use icon-only buttons sparingly and always include an accessible label.
