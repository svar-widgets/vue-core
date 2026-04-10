<script setup>
import { inject, provide } from 'vue'
import { locale } from '@svar-ui/lib-dom'
import { en } from '@svar-ui/core-locales'

defineOptions({ name: 'CoreLocale', inheritAttrs: false })

const props = defineProps({
  words: { default: null },
  optional: { default: false }
})

const injected = inject('wx-i18n', null)
let l = injected
if (!l || props.words !== null) {
  if (!l) {
    l = locale(en)
  }
  l = l.extend(props.words, props.optional)
  provide('wx-i18n', l)
}
</script>

<template>
  <slot />
</template>