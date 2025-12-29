# AlertDialog

## Overview

Confirmation dialog component for critical actions requiring user decision with title, description, and action buttons. Ensures intentional confirmation before destructive or important actions.

## Component Behavior

AlertDialog displays centered modal with title, description, and two buttons (primary + optional secondary). Blocks backdrop dismiss by default (critical action). Primary action styled prominently, danger variant for destructive actions. Secondary action cancels/dismisses.

## Props

| Prop                 | Type                           | Default     | Description                                         |
| -------------------- | ------------------------------ | ----------- | --------------------------------------------------- |
| isOpen               | `boolean`                      | required    | Controls visibility                                 |
| onClose              | `() => void`                   | required    | Close callback                                      |
| title                | `string`                       | required    | Dialog heading                                      |
| description          | `string`                       | required    | Explanatory text                                    |
| primaryAction        | `{ label, onPress, variant? }` | required    | Main action button                                  |
| secondaryAction      | `{ label, onPress }`           | `undefined` | Cancel/secondary button                             |
| closeOnBackdropPress | `boolean`                      | `false`     | Allow backdrop dismiss (default false for critical) |
| style                | `StyleProp<ViewStyle>`         | `undefined` | Custom styles                                       |

## Layout

Title (Typography heading) | Description (Typography body) | Button row: Secondary (left) | Primary (right)

## States

closed, open

## Theme Support

Inherits from Modal. Button variants: primary (blue), danger (red)

## Accessibility

role="alertdialog", focus primary action on open, accessibilityViewIsModal

## Edge Cases

No secondary action: only primary button shown. Very long description: scrollable

## Dependencies

Modal component, Button component

## Design Considerations

Fixed width (90%, max 400px), always centered, no dismiss X button (explicit action required)
