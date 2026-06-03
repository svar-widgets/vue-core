<script setup>
defineOptions({ name: "DemoDropdown" });
import { ref } from "vue";
import {
	Field,
	Dropdown,
	Calendar,
	RadioButtonGroup,
	Button,
} from "../../src/index";

const positions = ["bottom", "top", "left", "right"].map(id => ({
	id,
	label: id,
}));
const alignOptions = ["start", "center", "end"].map(id => ({
	id,
	label: id,
}));

const popup = ref(false);
const position = ref("bottom");
const align = ref("start");
</script>

<template>
	<div class="demo-box">
		<div class="label">Select dropdown position</div>
		<RadioButtonGroup
			:options="positions"
			v-model:value="position"
			type="inline"
		/>

		<div class="label">Select dropdown align</div>
		<RadioButtonGroup
			:options="alignOptions"
			v-model:value="align"
			type="inline"
		/>

		<div class="dropdown-box">
			<Field>
				<Button css="my-button" :onclick="() => (popup = true)">
					Click to show a dropdown
				</Button>
				<Dropdown
					v-if="popup"
					width="300px"
					:position="position"
					:align="align"
					:oncancel="() => (popup = false)"
					css="my-dropdown"
				>
					<Calendar />
				</Dropdown>
			</Field>
		</div>
	</div>
</template>

<style scoped>
	.dropdown-box {
		width: 250px;
		height: 302px;
		position: relative;
		top: 200px;
		left: 300px;
	}
	.label {
		font-weight: 600;
		padding: 10px 0;
	}
	:global(.wx-button.my-button) {
		width: 250px;
	}
	:global(.my-dropdown) {
		background: var(--wx-background-alt) !important;
	}
</style>
