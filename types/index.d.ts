import { TPosition } from "@svar-ui/lib-dom";
import type { DefineComponent } from "vue";

export interface DropdownOptions {
	inline?: boolean;
	position?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	css?: string;
	width?: string | "unset" | "auto";
	trackScroll?: boolean;
	virtualized?: boolean;
}

export interface IUser {
	id: string | number;
	name?: string;
	avatar?: string;
	color?: string;
}

export declare const Avatar: DefineComponent<{
	value: IUser | IUser[];
	size?: number;
	limit?: number;
}>;

export declare const TextArea: DefineComponent<{
	value?: string;
	id?: string | number;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	readonly?: boolean;
	onchange?: (ev: { value: string; input?: boolean }) => void;
}>;

export declare const Button: DefineComponent<{
	type?:
		| "primary"
		| "secondary"
		| "danger"
		| "link"
		| "primary block"
		| "secondary block"
		| "danger block"
		| "link block";
	css?: string;
	icon?: string;
	disabled?: boolean;
	title?: string;
	text?: string;
	children?: () => any;
	onclick?: (ev: MouseEvent) => void;
}>;

export declare const Checkbox: DefineComponent<{
	id?: string | number;
	label?: string;
	inputValue?: string | number;
	value?: boolean;
	style?: string;
	disabled?: boolean;
	onchange?: (ev: { value: boolean; inputValue: string | number }) => void;
}>;

export declare const CheckboxGroup: DefineComponent<{
	options?: { id: string | number; label: string }[];
	value?: (string | number)[];
	type?: "inline" | "grid";
	onchange?: (ev: { value: (string | number)[] }) => void;
}>;

export declare const ColorSelect: DefineComponent<{
	colors?: string[];
	value?: string;
	id?: string | number;
	clear?: boolean;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	onchange?: (ev: { value: string }) => void;
}>;

export declare const ColorBoard: DefineComponent<{
	value?: string;
	button?: boolean;
	onchange?: (ev: { value: string; input?: boolean }) => void;
}>;

export declare const ColorPicker: DefineComponent<{
	value?: string;
	id?: string | number;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	clear?: boolean;
	dropdown?: DropdownOptions;
	onchange?: (ev: { value: string }) => void;
}>;

export declare const Combo: DefineComponent<{
	value?: string | number;
	id?: string | number;
	options?: { id: string | number; label: string }[];
	textOptions?: { id: string | number; label: string }[];
	textField?: string;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	clear?: boolean;
	dropdown?: DropdownOptions & {
		virtualized?: boolean;
	};
	children?: () => any;
	onchange?: (ev: { value: string | number }) => void;
}>;

export declare const DatePicker: DefineComponent<{
	value?: Date;
	id?: string | number;
	disabled?: boolean;
	error?: boolean;
	width?: string;
	align?: "start" | "center" | "end";
	placeholder?: string;
	format?: string | ((value: Date) => string);
	buttons?: boolean | ("clear" | "today")[];
	css?: string;
	title?: string;
	editable?: boolean | ((value: string) => Date | null);
	clear?: boolean;
	dropdown?: DropdownOptions;
	onchange?: (ev: { value: Date | null }) => void;
}>;

export declare const DateRangePicker: DefineComponent<{
	value?: { start: Date; end?: Date };
	id?: string | number;
	disabled?: boolean;
	error?: boolean;
	width?: string;
	align?: "start" | "center" | "end";
	placeholder?: string;
	css?: string;
	title?: string;
	format?: string | ((date: Date) => string);
	months?: 1 | 2;
	buttons?: boolean | ("clear" | "today" | "done")[];
	editable?: boolean | ((value: string) => Date | null);
	clear?: boolean;
	dropdown?: DropdownOptions;
	onchange?: (ev: {
		value: { start: Date; end: Date | null } | null;
	}) => void;
}>;

export declare const Fullscreen: DefineComponent<{
	hotkey?: string;
	toggleButton?: () => any;
	children?: () => any;
}>;

export declare const Icon: DefineComponent<{
	css?: string;
	title?: string;
	children?: () => any;
	onclick?: (ev: MouseEvent) => void;
}>;

export declare const MultiCombo: DefineComponent<{
	id?: string | number;
	value?: (string | number)[];
	options?: { id: string | number; label: string }[];
	textOptions?: { id: string | number; label: string }[];
	textField?: string;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	checkboxes?: boolean;
	dropdown?: DropdownOptions & {
		virtualized?: boolean;
	};
	children?: () => any;
	onchange?: (ev: { value: (string | number)[] }) => void;
}>;

export declare const Popup: DefineComponent<{
	left?: number;
	top?: number;
	at?: TPosition;
	parent?: HTMLElement;
	children?: () => any;
	oncancel?: (ev: MouseEvent) => void;
}>;

export declare const Dropdown: DefineComponent<
	DropdownOptions & {
		children?: () => any;
		oncancel?: (ev: MouseEvent) => void;
	}
>;

export declare const Pager: DefineComponent<{
	total?: number;
	pageSize?: number;
	value?: number;
	onchange?: (ev: { value: number; from: number; to: number }) => void;
}>;

export declare const RadioButton: DefineComponent<{
	id?: string | number;
	label?: string;
	value?: boolean;
	name?: string;
	inputValue?: string | number;
	disabled?: boolean;
	onchange?: (ev: { value: boolean; inputValue: string | number }) => void;
}>;

export declare const RadioButtonGroup: DefineComponent<{
	options?: { id: string | number; label: string }[];
	value?: string | number;
	type?: "inline" | "grid";
	onchange?: (ev: { value: string | number }) => void;
}>;

export declare const RichSelect: DefineComponent<{
	value?: string | number;
	options?: { id: string | number; label: string }[];
	textOptions?: { id: string | number; label: string }[];
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	title?: string;
	textField?: string;
	clear?: boolean;
	dropdown?: DropdownOptions & {
		virtualized?: boolean;
	};
	children?: () => any;
	onchange?: (ev: { value: string | number }) => void;
}>;

export declare const Segmented: DefineComponent<{
	options?: {
		id: string | number;
		label: string;
		icon?: string;
		title?: string;
	}[];
	value?: string | number;
	css?: string;
	children?: () => any;
	onchange?: (ev: { value: string | number }) => void;
}>;

export declare const Select: DefineComponent<{
	value?: string | number;
	options?: { id: string | number; label: string }[];
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	textField?: string;
	clear?: boolean;
	id?: string | number;
	onchange?: (ev: { value: string | number }) => void;
}>;

export declare const Slider: DefineComponent<{
	id?: string | number;
	label?: string;
	width?: string;
	min?: number;
	max?: number;
	value?: number;
	step?: number;
	title?: string;
	disabled?: boolean;
	onchange?: (ev: {
		value: number;
		previous: number;
		input?: boolean;
	}) => void;
}>;

export declare const Switch: DefineComponent<{
	id?: string | number;
	value?: boolean;
	disabled?: boolean;
	onchange?: (ev: { value: boolean }) => void;
}>;

export declare const Tabs: DefineComponent<{
	options?: {
		id: string | number;
		label?: string;
		title?: string;
		icon?: string;
	}[];
	value?: string | number;
	type?: "top" | "bottom";
	onchange?: (ev: { value: string | number }) => void;
}>;

export declare const Text: DefineComponent<{
	value?: string | number;
	id?: string | number;
	readonly?: boolean;
	focus?: boolean;
	select?: boolean;
	type?: "text" | "number" | "password";
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	inputStyle?: string;
	title?: string;
	css?: string;
	icon?: string;
	clear?: boolean;
	onchange?: (ev: { value: string | number; input?: boolean }) => void;
}>;

export declare const Counter: DefineComponent<{
	id?: string | number;
	value?: number;
	step?: number;
	min?: number;
	max?: number;
	error?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	onchange?: (ev: { value: number; input?: boolean }) => void;
}>;

export declare const Field: DefineComponent<{
	label?: string;
	position?: "left";
	width?: string;
	error?: boolean;
	type?: "checkbox" | "slider" | "switch";
	required?: boolean;
	children?: () => any;
}>;

export declare const Calendar: DefineComponent<{
	value?: Date;
	current?: Date;
	markers?: (date: Date) => string;
	buttons?: boolean | ("clear" | "today")[];
	onchange?: (ev: { value: Date | null }) => void;
}>;

export declare const Month: DefineComponent<{
	value?: { start: Date; end: Date } | Date;
	current?: Date;
	part?: string;
	markers?: (date: Date) => string;
	oncancel?: () => void;
	onchange?: (ev: Date) => void;
}>;

export declare const RangeCalendar: DefineComponent<{
	start?: Date;
	end?: Date;
	current?: Date;
	months?: 1 | 2;
	markers?: (date: Date) => string;
	buttons?: boolean | ("clear" | "today" | "done")[];
	onchange?: (ev: { start: Date | null; end: Date | null }) => void;
}>;

export declare const TimePicker: DefineComponent<{
	value?: Date;
	id?: string | number;
	title?: string;
	css?: string;
	disabled?: boolean;
	error?: boolean;
	format?: string | ((value: Date) => string);
	dropdown?: DropdownOptions;
	onchange?: (ev: { value: Date }) => void;
}>;

export declare const TwoState: DefineComponent<{
	value?: boolean;
	type?:
		| "primary"
		| "secondary"
		| "danger"
		| "link"
		| "primary block"
		| "secondary block"
		| "danger block"
		| "link block";
	icon?: string;
	disabled?: boolean;
	iconActive?: string;
	title?: string;
	css?: string;
	text?: string;
	textActive?: string;
	active?: () => any;
	children?: () => any;
	onclick?: (ev: MouseEvent) => void;
	onchange?: (ev: { value: boolean }) => void;
}>;

export declare const Modal: DefineComponent<{
	title?: string;
	buttons?: boolean | string[];
	header?: any;
	footer?: any;
	children?: () => any;
	onconfirm?: (ev: { button?: string; event: MouseEvent }) => void;
	oncancel?: (ev: { button?: string; event: MouseEvent }) => void;
}>;

export declare const ModalArea: DefineComponent<{
	children?: () => any;
}>;

export declare const SideArea: DefineComponent<{
	position?: "right";
	children?: () => any;
	oncancel?: () => void;
}>;

export declare const Portal: DefineComponent<{
	theme?: "willow" | "willow-dark";
	target?: HTMLElement;
	children?: () => any;
}>;

export declare const Material: DefineComponent<{
	fonts?: boolean;
	children?: () => any;
}>;

export declare const Willow: DefineComponent<{
	fonts?: boolean;
	children?: () => any;
}>;

export declare const WillowDark: DefineComponent<{
	fonts?: boolean;
	children?: () => any;
}>;

export declare const Locale: DefineComponent<{
	words?: any;
	optional?: boolean;
	children?: () => any;
}>;

export declare const Globals: DefineComponent<{
	children?: () => any;
}>;

export declare const SuggestDropdown: DefineComponent<
	DropdownOptions & {
		items?: { id: string | number; label: string }[];
		children?: () => any;
		onselect?: (ev: { id: string | number | (string | number)[] }) => void;
		onready?: (ev: {
			navigate?: (dir: number | null, ev?: KeyboardEvent) => void;
			keydown?: (ev: KeyboardEvent, dir: number) => void;
			move?: (ev: KeyboardEvent) => void;
		}) => void;
		multiselect?: boolean;
		checkboxes?: boolean;
		value?: string | number | (string | number)[];
		virtualized?: boolean;
	}
>;

export type { ILocale, Terms, TPosition } from "@svar-ui/lib-dom";

export declare const locale: {
	(words: Record<string, any>): void;
	getRaw: () => Record<string, any>;
};

export declare const en: Record<string, any>;

export declare function popupContainer(node: HTMLElement): void;
