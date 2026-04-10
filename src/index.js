export { default as TextArea } from "./components/TextArea.vue";
export { default as Button } from "./components/Button.vue";
export { default as Checkbox } from "./components/Checkbox.vue";
export { default as CheckboxGroup } from "./components/CheckboxGroup.vue";
export { default as ColorSelect } from "./components/ColorSelect.vue";
export { default as ColorBoard } from "./components/ColorBoard.vue";
export { default as ColorPicker } from "./components/ColorPicker.vue";
export { default as Combo } from "./components/Combo.vue";
export { default as DatePicker } from "./components/DatePicker.vue";
export { default as DateRangePicker } from "./components/DateRangePicker.vue";
export { default as Fullscreen } from "./components/Fullscreen.vue";
export { default as Avatar } from "./components/Avatar.vue";
export { default as Icon } from "./components/Icon.vue";
export { default as MultiCombo } from "./components/MultiCombo.vue";
export { default as Popup } from "./components/Popup.vue";
export { default as Dropdown } from "./components/Dropdown.vue";
export { default as Pager } from "./components/Pager.vue";
export { default as RadioButton } from "./components/RadioButton.vue";
export { default as RadioButtonGroup } from "./components/RadioButtonGroup.vue";
export { default as RichSelect } from "./components/RichSelect.vue";
export { default as Segmented } from "./components/Segmented.vue";
export { default as Select } from "./components/Select.vue";
export { default as Slider } from "./components/Slider.vue";
export { default as Switch } from "./components/Switch.vue";
export { default as Tabs } from "./components/Tabs.vue";
export { default as Text } from "./components/Text.vue";
export { default as Counter } from "./components/Counter.vue";
export { default as Globals } from "./components/Globals.vue";
export { default as Field } from "./components/Field.vue";
export { default as Calendar } from "./components/Calendar.vue";
export { default as Month } from "./components/calendar/Month.vue";
export { default as RangeCalendar } from "./components/RangeCalendar.vue";
export { default as TimePicker } from "./components/TimePicker.vue";
export { default as TwoState } from "./components/TwoState.vue";
export { default as Modal } from "./components/Modal.vue";
export { default as ModalArea } from "./components/ModalArea.vue";
export { default as SideArea } from "./components/SideArea.vue";
export { default as Portal } from "./components/Portal.vue";

export { default as Willow } from "./themes/Willow.vue";
export { default as WillowDark } from "./themes/WillowDark.vue";

export { default as Locale } from "./Locale.vue";
export { locale } from "@svar-ui/lib-dom";

export { popupContainer } from "./components/helpers";
export { default as SuggestDropdown } from "./components/helpers/SuggestDropdown.vue";

export { en } from "@svar-ui/core-locales";

import { env, setEnv } from "@svar-ui/lib-dom";
setEnv(env);
