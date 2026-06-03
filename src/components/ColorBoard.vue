<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import Button from './Button.vue';

import { sliderMove } from './helpers/sliderMove';
import colorTransformator from './helpers/colorTransformator';
import { parseColor } from './helpers/colorValidation.js';
import { defaultLocale } from './helpers/locale';
import { asDirective } from '@svar-ui/lib-vue';

defineOptions({ name: 'CoreColorBoard', inheritAttrs: false });

const vSliderMove = asDirective(sliderMove);

const props = defineProps({
  button: { default: false },
  css: { default: '' },
  onchange: {}
});
const value = defineModel("value", { default: "" });


let block = ref();
let colorLine = ref();

const i18n = inject('wx-i18n') || defaultLocale();
const _ = i18n.getGroup('core');

const BLOCK = 'Block';
const LINE = 'Line';

let blockTop = ref();
let blockLeft = ref();
let hueColor = ref();
let lineLeft = ref();
let inputValue = ref(value.value);

const color = computed(() => parseColor(value.value) || '#65D3B3');
const blockColor = computed(() => colorTransformator.hvsToHex(hueColor.value, 1, 1));

function moveBlockSlider(dx, dy) {
  const { width, height } = block.value.getBoundingClientRect();

  if (dy < 0) dy = 0;
  else if (dy > height) dy = height;

  if (dx < 0) dx = 0;
  else if (dx > width) dx = width;

  blockTop.value = dy;
  blockLeft.value = dx;

  setCurrentColor();
}

function setCurrentColor(lineSliderMove) {
  let _sValue, _vValue;

  if (lineSliderMove) {
    [, _sValue, _vValue] = colorTransformator.hexToHvs(color.value);
  } else {
    const { width, height } = block.value.getBoundingClientRect();

    const pxX = width / 100;
    const pxY = height / 100;

    _sValue = Math.ceil(blockLeft.value / pxX) / 100;
    _vValue = Math.ceil(Math.abs(blockTop.value / pxY - 100)) / 100;
  }

  const currentColor = colorTransformator.hvsToHex(hueColor.value, _sValue, _vValue);
  value.value = currentColor;
  inputValue.value = currentColor;
  props.onchange && props.onchange({ value: value.value, input: true });
}

function moveLineSlider(dx) {
  const width = colorLine.value.getBoundingClientRect().width;

  if (dx < 0) dx = 0;
  else if (dx > width) dx = width;

  toggleLineColor(dx, width);
}

function toggleLineColor(dx, width) {
  width = width || colorLine.value.getBoundingClientRect().width;

  lineLeft.value = dx;

  const h = Math.round((lineLeft.value * 359) / width);
  hueColor.value = Math.max(Math.min(h, 359), 0);

  setCurrentColor(true);
}

onMounted(() => requestAnimationFrame(setSlidersPosition));

function setSlidersPosition() {
  const [h, s, v] = colorTransformator.hexToHvs(color.value);
  const { width, height } = block.value.getBoundingClientRect();
  hueColor.value = h;

  lineLeft.value = (h * colorLine.value.getBoundingClientRect().width) / 359;
  blockLeft.value = s * width;
  blockTop.value = Math.abs(height * (v - 1));
}

function handleInput({ target }) {
  const newColor = parseColor(target.value);

  inputValue.value = target.value;
  if (newColor) {
    value.value = newColor;
    props.onchange && props.onchange({ value: value.value, input: true });
    setSlidersPosition();
  }
}

function handleSelect(ev) {
  ev.stopPropagation();
  props.onchange && props.onchange({ value: color.value });
}

function keydown(ev) {
  const slider = ev.target;
  const isSliderBlock = slider === BLOCK;
  const isSliderLine = slider === LINE;

  let css = window.getComputedStyle(slider);
  let left = parseFloat(css.left);
  let top = parseFloat(css.top);
  const code = ev.code;

  if (isSliderBlock) {
    switch (code) {
      case 'ArrowLeft': {
        left--;
        break;
      }
      case 'ArrowRight': {
        left++;
        break;
      }
      case 'ArrowDown': {
        top++;
        break;
      }
      case 'ArrowUp': {
        top--;
        break;
      }
      default:
        return;
    }

    moveBlockSlider(left, top);
  }

  if (isSliderLine) {
    if (code === 'ArrowLeft' || code === 'ArrowDown') left--;
    else if (code === 'ArrowRight' || code === 'ArrowUp') left++;
    else return;
    moveLineSlider(left);
  }

  ev.preventDefault();
}
</script>

<template>
  <div :class="['wx-colorboard', css]">
    <div
      class="wx-color-block"
      :style="{ background: blockColor }"
      ref="block"
      v-slider-move="{ moveBlockSlider }"
    >
      <div
        class="wx-color-block-slider wx-slider"
        :style="{ background: color, top: blockTop + 'px', left: blockLeft + 'px' }"
        tabindex="0"
        :data-slider="BLOCK"
        @keydown="keydown"
      ></div>
    </div>
    <div
      class="wx-color-line"
      ref="colorLine"
      v-slider-move="{ moveLineSlider }"
    >
      <div
        class="wx-color-line-slider wx-slider"
        :style="{ background: blockColor, left: lineLeft + 'px' }"
        tabindex="0"
        :data-slider="LINE"
        @keydown="keydown"
      ></div>
    </div>
    <div class="wx-color-controls">
      <div class="wx-color" :style="{ background: color }"></div>
      <input type="text" class="wx-text" :value="inputValue" @input="handleInput" />
    </div>
    <Button v-if="props.button" :onclick="handleSelect" type="secondary">{{ _('select') }}</Button>
  </div>
</template>


<style scoped>

	.wx-colorboard {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 8px;
		width: 100%;
	}

	.wx-color-block {
		height: 140px;
		width: 100%;
		position: relative;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.wx-color-block::before,
	.wx-color-block::after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.wx-color-block:before {
		background-image: linear-gradient(0deg, #000, hsla(0, 0%, 100%, 0));
		z-index: 2;
	}
	.wx-color-block::after {
		background-image: linear-gradient(90deg, #fff, hsla(20, 42%, 65%, 0));
		z-index: 1;
	}

	.wx-color-block-slider {
		height: 16px;
		width: 16px;
		margin: -8px 0 0 -8px;
	}

	.wx-slider {
		border: 2px solid white;
		border-radius: 50%;
		position: absolute;
		z-index: 3;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.wx-slider:focus,
	.wx-slider:hover {
		outline: none;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.2),
			inset 0 0 4px #ffffff;
	}

	.wx-color-line {
		width: 100%;
		height: 8px;
		background-image: linear-gradient(
			90deg,
			red,
			#ff0 17%,
			#0f0 33%,
			#0ff 50%,
			#00f 67%,
			#f0f 83%,
			red
		);
		position: relative;
		border-radius: 6px;
	}

	.wx-color-line-slider {
		height: 14px;
		width: 14px;
		margin: 0 0 0 -7px;
		top: -4px;
	}

	.wx-color-controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.wx-color,
	.wx-text {
		width: calc(50% - 4px);
	}

	.wx-color {
		height: 32px;
	}

	.wx-text {
		outline: none;
		background: var(--wx-input-background);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
	}

	.wx-text:focus {
		border: var(--wx-input-border-focus);
	}

</style>