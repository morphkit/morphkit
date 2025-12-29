# Actionsheet

## Overview

Bottom sheet component displaying a list of actions or options with slide-up animation and swipe-to-dismiss. Presents contextual actions in mobile-friendly bottom overlay.

## Component Behavior

Actionsheet slides up from bottom when opened. Displays list of ActionsheetItem options. Each item is pressable, triggers action and closes sheet. Backdrop press or swipe down dismisses. Title optional for context.

## Props

### ActionsheetProps

| Prop                 | Type                   | Default     | Description                |
| -------------------- | ---------------------- | ----------- | -------------------------- |
| isOpen               | `boolean`              | required    | Controls visibility        |
| onClose              | `() => void`           | required    | Close callback             |
| children             | `ReactNode`            | required    | ActionsheetItem components |
| title                | `string`               | `undefined` | Optional header title      |
| closeOnBackdropPress | `boolean`              | `true`      | Allow backdrop dismiss     |
| style                | `StyleProp<ViewStyle>` | `undefined` | Custom styles              |

### ActionsheetItemProps

| Prop     | Type                    | Default     | Description          |
| -------- | ----------------------- | ----------- | -------------------- |
| onPress  | `() => void`            | required    | Item action callback |
| label    | `string`                | required    | Item text            |
| icon     | `ReactNode`             | `undefined` | Leading icon         |
| variant  | `"default" \| "danger"` | `"default"` | Style (danger = red) |
| disabled | `boolean`               | `false`     | Disable interaction  |

## States

Opening, open, closing, closed

## Theme Support

Light: white sheet, dark text. Dark: dark gray sheet, light text

## Accessibility

role="menu", items role="menuitem", swipe gestures announced

## Edge Cases

Many items: scrollable list. Empty items: shows title only if provided

## Dependencies

Gesture handler for swipe, Portal for z-index

## Design Considerations

Bottom-aligned, rounded top corners, handle bar for swipe affordance, backdrop overlay
