# Drawer

## Overview

Side navigation panel that slides in from screen edge for navigation menus or additional content. Provides off-canvas space for navigation or secondary UI elements.

## Component Behavior

Drawer slides in from left or right edge. Full height, configurable width. Backdrop prevents background interaction. Swipe from edge or backdrop press dismisses. Typically contains navigation links or menu items.

## Props

| Prop                 | Type                   | Default     | Description                |
| -------------------- | ---------------------- | ----------- | -------------------------- |
| isOpen               | `boolean`              | required    | Controls visibility        |
| onClose              | `() => void`           | required    | Close callback             |
| children             | `ReactNode`            | required    | Drawer content (nav, menu) |
| position             | `"left" \| "right"`    | `"left"`    | Screen edge for drawer     |
| width                | `number`               | `280`       | Drawer width in pixels     |
| closeOnBackdropPress | `boolean`              | `true`      | Allow backdrop dismiss     |
| style                | `StyleProp<ViewStyle>` | `undefined` | Custom styles              |

## States

closed, opening, open, closing

## Theme Support

Light: white drawer. Dark: dark gray drawer. Backdrop: semi-transparent black

## Accessibility

role="navigation", focus first element on open, swipe gestures announced

## Edge Cases

width > screen: constrained to screen width. Nested navigation: breadcrumb or back button

## Dependencies

Portal, gesture handler for swipe, Animated API

## Design Considerations

Full height, slides from edge, optional shadow/elevation, swipe from edge to open (native gesture)
