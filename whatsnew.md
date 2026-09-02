## Version 2.6.1

### Fixes

- RangeCalendar fails to render on server side
- Container scrollbar size is excluded from the available space

## Version 2.6.0

### New features

- Tooltip component

### Updates

- All controls receive `css` property to define custom CSS class name
- All controls can be tuned to show `tooltip` if wrapper in `Tooltip` component
- MultiCombo: `keepText` property to configure text input on option selection

### Fixes

- MultiCombo dropdown is detached when input size changes
- SideArea closes on clicking inner controls dropdown
- ModalArea size is incorrect in a long scrollable container
- Week numbers are incorrect from locale-based `%w` helper

## Version 2.5.1

### Fixes

-   ModalArea size is incorrect in a long scrollable container
-   Week numbers are incorrect from locale-base `%w` helper
-   Calendar month jumps to previous selected month in bound context

## 2.5.0

### Initial features

Provides all the same functionality as Svelte Core 2.5.0