import Avatar from "./cases/Avatar.vue";
import Basic from "./cases/Basic.vue";
import TextArea from "./cases/TextArea.vue";
import Buttons from "./cases/Buttons.vue";
import Calendar from "./cases/Calendar.vue";
import Month from "./cases/Month.vue";
import RangeCalendar from "./cases/RangeCalendar.vue";
import Checkbox from "./cases/Checkbox.vue";
import ColorSelect from "./cases/ColorSelect.vue";
import ColorPicker from "./cases/ColorPicker.vue";
import Combo from "./cases/Combo.vue";
import DatePicker from "./cases/DatePicker.vue";
import DateRangePicker from "./cases/DateRangePicker.vue";
import Fullscreen from "./cases/Fullscreen.vue";
import Dropdown from "./cases/Dropdown.vue";
import DropdownScroll from "./cases/DropdownScroll.vue";
import Tooltips from "./cases/Tooltips.vue";
import Locales from "./cases/Locales.vue";
import Messages from "./cases/Messages.vue";
import TwoState from "./cases/TwoState.vue";
import Text from "./cases/Text.vue";
import Counter from "./cases/Counter.vue";
import MultiCombo from "./cases/MultiCombo.vue";
import Popup from "./cases/Popup.vue";
import Radio from "./cases/Radio.vue";
import RichSelect from "./cases/RichSelect.vue";
import Select from "./cases/Select.vue";
import Slider from "./cases/Slider.vue";
import Tabs from "./cases/Tabs.vue";
import Switch from "./cases/Switch.vue";
import Pager from "./cases/Pager.vue";
import TimePicker from "./cases/TimePicker.vue";
import Field from "./cases/Field.vue";
import Segmented from "./cases/Segmented.vue";
import Icon from "./cases/Icon.vue";
import SideArea from "./cases/SideArea.vue";
import ModalArea from "./cases/ModalArea.vue";

export const links = [
	["/avatar/:skin", "Avatar", Avatar, "Avatar"],
	["/base/:skin", "Basic UI", Basic, "Basic"],
	["/button/:skin", "Button", Buttons, "Buttons"],
	["/calendar/:skin", "Calendar", Calendar, "Calendar"],
	["/month/:skin", "Month", Month, "Month"],
	["/checkbox/:skin", "Checkbox", Checkbox, "Checkbox"],
	["/colorpicker/:skin", "ColorPicker", ColorPicker, "ColorPicker"],
	["/colorselect/:skin", "ColorSelect", ColorSelect, "ColorSelect"],
	["/combo/:skin", "Combo", Combo, "Combo"],
	["/datepicker/:skin", "DatePicker", DatePicker, "DatePicker"],
	[
		"/daterangepicker/:skin",
		"DateRangePicker",
		DateRangePicker,
		"DateRangePicker",
	],
	["/dropdown/:skin", "Dropdown", Dropdown, "Dropdown"],
	[
		"/dropdown-scroll/:skin",
		"Dropdown: track scroll",
		DropdownScroll,
		"DropdownScroll",
	],
	["/field/:skin", "Field", Field, "Field"],
	["/fullscreen/:skin", "Fullscreen", Fullscreen, "Fullscreen"],
	["/locales/:skin", "Locales", Locales, "Locales"],
	["/messages/:skin", "Messages", Messages, "Messages"],
	["/multicombo/:skin", "MultiCombo", MultiCombo, "MultiCombo"],
	["/range/:skin", "Range", RangeCalendar, "RangeCalendar"],
	["/pager/:skin", "Pager", Pager, "Pager"],
	["/popup/:skin", "Popup", Popup, "Popup"],
	["/radio/:skin", "Radio", Radio, "Radio"],
	["/richselect/:skin", "Rich Select", RichSelect, "RichSelect"],
	["/segmented/:skin", "Segmented", Segmented, "Segmented"],
	["/select/:skin", "Select", Select, "Select"],
	["/slider/:skin", "Slider", Slider, "Slider"],
	["/switch/:skin", "Switch", Switch, "Switch"],
	["/tabs/:skin", "Tabs", Tabs, "Tabs"],
	["/inputs/:skin", "Text Inputs", Text, "Text"],
	["/textarea/:skin", "TextArea", TextArea, "TextArea"],
	["/counter/:skin", "Counter Input", Counter, "Counter"],
	["/timepicker/:skin", "TimePicker", TimePicker, "TimePicker"],
	["/tooltips/:skin", "Tooltips", Tooltips, "Tooltips"],
	["/twostate/:skin", "Two State", TwoState, "TwoState"],
	["/icon/:skin", "Icon", Icon, "Icon"],
	["/sidearea/:skin", "Side Area", SideArea, "SideArea"],
	["/modalarea/:skin", "Modal Area", ModalArea, "ModalArea"],
];
