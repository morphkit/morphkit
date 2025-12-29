# Popover

## Overview

Floating content overlay positioned relative to a trigger element for contextual information or actions. Provides dropdown-style content with arrow pointer to trigger.

## Props

| Prop                 | Type                                     | Default     | Description                     |
| -------------------- | ---------------------------------------- | ----------- | ------------------------------- |
| isOpen               | `boolean`                                | required    | Controls visibility             |
| onClose              | `() => void`                             | required    | Close callback                  |
| trigger              | `ReactNode`                              | required    | Element that opens popover      |
| content              | `ReactNode`                              | required    | Popover content                 |
| placement            | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"`  | Position relative to trigger    |
| offset               | `number`                                 | `8`         | Distance from trigger in pixels |
| closeOnBackdropPress | `boolean`                                | `true`      | Allow backdrop dismiss          |
| style                | `StyleProp<ViewStyle>`                   | `undefined` | Custom styles                   |

## Behavior

Trigger press opens popover. Content positioned relative to trigger with arrow pointer. Auto-flips if doesn't fit viewport. Optional backdrop or click-outside to close.

## States

closed, open

## Theme Support

Light: white popover, gray arrow, shadow. Dark: dark gray popover, darker arrow

## Accessibility

role="tooltip" or "menu", accessibilityDescribedBy links trigger to content

## Edge Cases

Trigger near edge: auto-flip placement. Very large content: constrain size or scroll

## Dependencies

Portal, positioning library (react-native-popper or custom)

## Design Considerations

Absolute positioning, arrow points to trigger center, auto-flip, z-index above content
