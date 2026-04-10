<script setup>
import { ref, computed, watch, onMounted, inject, nextTick } from 'vue';
import { getListHandlers } from './listnav';
import Dropdown from '../Dropdown.vue';
import Checkbox from '../Checkbox.vue';
import { defaultLocale } from './locale';
import { setID } from '@svar-ui/lib-dom';

defineOptions({ name: 'CoreSuggestDropdown' });

const props = defineProps({
  items: { default: () => [] },
  onselect: { type: Function },
  onready: { type: Function },
  virtualized: { default: false },
  checkboxes: {},
  multiselect: {},
  value: {},
});

const overscan = 3;
const list = ref(null);
const firstItem = ref(null);
const navIndex = ref(null);
const scrollTop = ref(0);
const itemHeight = ref(24);
let isItemHeightInitialized = false;

const i18n = inject('wx-i18n');
const _ = (i18n || defaultLocale()).getGroup('core');

const { move, keydown, init, navigate } = getListHandlers();

const scrollToVirtualized = nIndex => {
  if (list.value) {
    list.value.scrollTop =
      nIndex * itemHeight.value - list.value.clientHeight + itemHeight.value;
    scrollTop.value = list.value.scrollTop;
  }
};

const navigateVirtualized = (dir, ev) => {
  navigate(dir, ev);
  nextTick().then(() => {
    scrollToVirtualized(navIndex.value);
  });
};

const keydownVirtualized = (ev, dir) => {
  if (
    navIndex.value !== 0 &&
    navIndex.value !== props.items.length - 1 &&
    (ev.key == 'ArrowDown' || ev.key == 'ArrowUp')
  )
    ev.preventDefault();
  keydown(ev, dir);

  nextTick().then(() => {
    if (list.value) {
      const isInRange = visibleItems.value.find(
        item => item.id === navIndex.value
      );
      if (isInRange) {
        const isTargetVisibleTop =
          list.value.scrollTop <= navIndex.value * itemHeight.value;
        const isTargetVisibleBottom =
          list.value.scrollTop + list.value.clientHeight >=
          navIndex.value * itemHeight.value + itemHeight.value;

        if (!isTargetVisibleTop) {
          list.value.scrollTop = navIndex.value * itemHeight.value;
          scrollTop.value = list.value.scrollTop;
        } else if (!isTargetVisibleBottom) {
          scrollToVirtualized(navIndex.value);
        }
      } else {
        scrollToVirtualized(navIndex.value);
      }
    }
  });
};

function selectItem(ev) {
  if (ev) ev.stopPropagation();
  let nextValue;
  const nextId = props.items[navIndex.value]?.id;
  if (props.multiselect) {
    if (props.value.includes(nextId)) {
      nextValue = props.value.filter(i => i !== nextId);
    } else {
      nextValue = [...props.value, nextId];
    }
  } else {
    nextValue = nextId;
  }
  if (props.onselect) props.onselect({ id: nextValue });
}

const displayedItemsCount = computed(() =>
  Math.ceil(list.value?.clientHeight / itemHeight.value)
);

const visibleRange = computed(() => {
  if (!props.virtualized) return { start: 0, end: props.items.length };

  if (!props.items.length) return { start: 0, end: 0 };

  const start = Math.floor(scrollTop.value / itemHeight.value);
  const end = start + displayedItemsCount.value;

  return {
    start: Math.max(0, start - overscan),
    end: Math.min(props.items.length, end + overscan),
  };
});

const visibleItems = computed(() => {
  if (!props.virtualized) return props.items;

  const { start, end } = visibleRange.value;
  return props.items.slice(start, end).map(item => ({
    ...item,
  }));
});

const offsetTop = computed(() => visibleRange.value.start * itemHeight.value);
const totalHeight = computed(() => props.items.length * itemHeight.value);

const handleScroll = ev => {
  if (props.virtualized) {
    scrollTop.value = ev.target.scrollTop;
  }
};

watch(
  () => firstItem.value?.clientHeight,
  renderedItemHeight => {
    if (!isItemHeightInitialized && renderedItemHeight) {
      itemHeight.value = renderedItemHeight;
      isItemHeightInitialized = true;
    }
  },
  { immediate: true }
);

watch(
  () => [list.value, props.items],
  () => {
    init(
      list.value,
      props.items,
      i => (navIndex.value = i),
      selectItem,
      props.virtualized,
      scrollToVirtualized
    );
  },
  { immediate: true }
);

onMounted(() => {
  if (props.onready)
    props.onready({
      navigate: props.virtualized ? navigateVirtualized : navigate,
      keydown: props.virtualized ? keydownVirtualized : keydown,
      move,
    });
});
</script>

<template>
  <Dropdown
    v-if="navIndex !== null"
    :key="props.items"
    :oncancel="() => navigate(null)"
  >
    <div
      class="wx-list"
      ref="list"
      @click="selectItem"
      @mousemove="move"
      @scroll="handleScroll"
    >
      <template v-if="props.items.length">
        <template v-if="props.virtualized">
          <div
            class="wx-list-wrapper"
            :style="`height: ${totalHeight}px;`"
          >
            <div
              class="wx-list-content"
              :style="`transform: translateY(${offsetTop}px);`"
            >
              <template
                v-for="(data, visibleIndex) in visibleItems"
                :key="data.id"
              >
                <div
                  v-if="visibleIndex + visibleRange.start === 0"
                  class="wx-item"
                  :class="{ 'wx-focus': visibleIndex + visibleRange.start === navIndex }"
                  :data-id="setID(data.id)"
                  ref="firstItem"
                >
                  <Checkbox
                    v-if="props.checkboxes"
                    style="margin-right: 8px; pointer-events: none;"
                    :name="data.id"
                    :value="props.value && props.value.includes(data.id)"
                  />
                  <slot :option="data">{{ data.label }}</slot>
                </div>
                <div
                  v-else
                  class="wx-item"
                  :class="{ 'wx-focus': visibleIndex + visibleRange.start === navIndex }"
                  :data-id="setID(data.id)"
                >
                  <Checkbox
                    v-if="props.checkboxes"
                    style="margin-right: 8px; pointer-events: none;"
                    :name="data.id"
                    :value="props.value && props.value.includes(data.id)"
                  />
                  <slot :option="data">{{ data.label }}</slot>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <template
            v-for="(data, visibleIndex) in visibleItems"
            :key="data.id"
          >
            <div
              v-if="visibleIndex + visibleRange.start === 0"
              class="wx-item"
              :class="{ 'wx-focus': visibleIndex + visibleRange.start === navIndex }"
              :data-id="setID(data.id)"
              ref="firstItem"
            >
              <Checkbox
                v-if="props.checkboxes"
                style="margin-right: 8px; pointer-events: none;"
                :name="data.id"
                :value="props.value && props.value.includes(data.id)"
              />
              <slot :option="data">{{ data.label }}</slot>
            </div>
            <div
              v-else
              class="wx-item"
              :class="{ 'wx-focus': visibleIndex + visibleRange.start === navIndex }"
              :data-id="setID(data.id)"
            >
              <Checkbox
                v-if="props.checkboxes"
                style="margin-right: 8px; pointer-events: none;"
                :name="data.id"
                :value="props.value && props.value.includes(data.id)"
              />
              <slot :option="data">{{ data.label }}</slot>
            </div>
          </template>
        </template>
      </template>
      <template v-else>
        <div class="wx-no-data">{{ _('No data') }}</div>
      </template>
    </div>
  </Dropdown>
</template>


<style scoped>

	.wx-list {
		max-height: 250px;
		overflow-y: auto;
		position: relative;
	}

	.wx-list-wrapper {
		position: relative;
		width: 100%;
	}

	.wx-list-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.wx-item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
		cursor: pointer;
	}
	/* .item.selected {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	} */
	.wx-item.wx-focus {
		background: var(--wx-background-hover);
	}
	/* .item.selected.navigate {
		background: var(--wx-color-primary-hover);
	} */
	.wx-no-data {
		padding: var(--wx-input-padding);
	}

</style>