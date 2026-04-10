<script setup>
defineOptions({ name: "CoreAvatar" });

import { ref, computed, watchEffect, onWatcherCleanup } from "vue";

const props = defineProps({
	value: {},
	size: { default: 32 },
	limit: {},
});

const DEFAULT_BG = "#dfe2e6";
const DEFAULT_FONT = "#2c2f3c";

/** Overlap factor: each avatar after the first adds 75% of size (25% overlap). */
const OVERLAP_FACTOR = 0.75;

const containerEl = ref(null);
const containerWidth = ref(null);

const users = computed(() => {
	if (!props.value) return [];
	return Array.isArray(props.value) ? props.value : [props.value];
});

/** Max avatars that fit in container. Formula: width = size + (n-1) * size * 0.75. */
const maxFitting = computed(() => {
	if (containerWidth.value == null || containerWidth.value <= 0) {
		return null;
	}
	const n = 1 + (containerWidth.value / props.size - 1) / OVERLAP_FACTOR;
	return Math.max(1, Math.floor(n));
});

const displayCount = computed(() => {
	const cap =
		props.limit != null
			? Math.min(users.value.length, props.limit)
			: users.value.length;
	if (maxFitting.value != null) {
		return Math.min(cap, maxFitting.value);
	}
	return cap;
});

const displayUsers = computed(() => users.value.slice(0, displayCount.value));
const overflowCount = computed(() =>
	Math.max(0, users.value.length - displayCount.value)
);

watchEffect(() => {
	const el = containerEl.value;
	if (!el) return;
	const ro = new ResizeObserver(entries => {
		const entry = entries[0];
		if (entry) containerWidth.value = entry.contentRect.width;
	});
	ro.observe(el);
	onWatcherCleanup(() => ro.disconnect());
});

function getInitials(name) {
	name = name?.trim() || "";
	if (!name) return "";
	const words = name.split(/\s+/);
	return (words[0][0] + (words[1]?.[0] || "")).toUpperCase().slice(0, 2);
}

function getContrastColor(hex) {
	if (!hex) return DEFAULT_FONT;
	let h = hex.replace("#", "");
	if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
	if (h.length !== 6) return DEFAULT_FONT;
	const r = parseInt(h.slice(0, 2), 16) / 255;
	const g = parseInt(h.slice(2, 4), 16) / 255;
	const b = parseInt(h.slice(4, 6), 16) / 255;
	const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
	return luminance > 0.5 ? DEFAULT_FONT : "#ffffff";
}

const fontSize = computed(() => Math.round(props.size * 0.4));
const avatarBaseStyle = computed(
	() =>
		`width:${props.size}px;height:${props.size}px;min-width:${props.size}px;min-height:${props.size}px;font-size:${fontSize.value}px;`
);

function getAvatarItemStyle(user, index) {
	const margin = index === 0 ? "0" : `${props.size * -0.25}px`;
	const bg = user.avatar ? "transparent" : user.color || DEFAULT_BG;
	const color = user.avatar
		? "transparent"
		: getContrastColor(user.color || DEFAULT_BG);
	return `margin-left:${margin};background-color:${bg};color:${color};`;
}
</script>

<template>
	<div class="wx-avatar-root" ref="containerEl">
		<div v-if="displayUsers.length > 0" class="wx-avatar-stack">
			<div
				v-for="(user, index) in displayUsers"
				:key="user.id"
				class="wx-avatar wx-avatar-item"
				:class="{
					'wx-avatar-overflow':
						index === displayUsers.length - 1 &&
						overflowCount > 0,
				}"
				:style="
					avatarBaseStyle + getAvatarItemStyle(user, index)
				"
			>
				<img
					v-if="user.avatar"
					:src="user.avatar"
					alt=""
					loading="lazy"
				/>
				<span v-else-if="getInitials(user.name)">{{
					getInitials(user.name)
				}}</span>
				<span
					v-if="
						index === displayUsers.length - 1 &&
						overflowCount > 0
					"
					class="wx-avatar-overflow-badge"
					>+{{ overflowCount }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.wx-avatar {
	position: relative;
	border-radius: 50%;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	font-weight: 600;
	line-height: 1;
	user-select: none;
}

.wx-avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.wx-avatar span {
	text-transform: uppercase;
}

.wx-avatar-overflow .wx-avatar-overflow-badge {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	text-transform: none;
}

.wx-avatar-stack {
	display: inline-flex;
	align-items: center;
}

.wx-avatar-root {
	display: block;
	min-width: 0;
}
</style>
