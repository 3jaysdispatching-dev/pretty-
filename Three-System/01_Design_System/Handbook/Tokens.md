# Tokens

Design tokens are named values that represent core system properties. They help teams maintain consistency across platforms and codebases.

## Token categories

- `color`: `color.primary`, `color.background`, `color.text.primary`, `color.border`
- `typography`: `font.family.base`, `font.size.body`, `font.weight.semibold`
- `spacing`: `space.xs`, `space.sm`, `space.md`, `space.lg`
- `elevation`: `elevation.card`, `elevation.dropdown`
- `motion`: `motion.duration.short`, `motion.curve.standard`

## Usage

Use tokens instead of raw values. This makes updates safer and ensures semantics are preserved across platforms.

Example:

- Use `color.background.surface` instead of `#FFFFFF`
- Use `space.md` instead of `16px`
- Use `motion.duration.medium` instead of `200ms`
