# Navigation Code

Navigation patterns: top nav, side nav, breadcrumbs, and tabs.

## Example

```jsx
<NavTop links={[{label:'Home', href: '/'}, {label:'Docs', href:'/docs'}]} />
<SideNav sections={[{title:'Product', items:[...] }]} />
```

## Guidelines

- Keep primary navigation consistent across pages.
- Provide clear focus states and skip links for keyboard users.
