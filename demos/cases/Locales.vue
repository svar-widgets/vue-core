<script setup>
import { ref } from "vue";
import { Calendar, Segmented, Locale, Text } from "../../src/index";
import { en, cn, de, es, fr, it, ja, pt, ru } from "@svar-ui/core-locales";

defineOptions({ name: "CoreLocales" });

const lang = ref("en");
const numValue = ref(1256790.567);

const options = [
  { id: "en", label: "EN", locale: en },
  { id: "cn", label: "CN", locale: cn },
  { id: "de", label: "DE", locale: de },
  { id: "es", label: "ES", locale: es },
  { id: "fr", label: "FR", locale: fr },
  { id: "it", label: "IT", locale: it },
  { id: "ja", label: "JA", locale: ja },
  { id: "pt", label: "PT", locale: pt },
  { id: "ru", label: "RU", locale: ru },
];

function getWords(l) {
  const op = options.find((op) => op.id == l);
  return op?.locale || en;
}

function getFormattedNumber(l, n) {
  const locale = getWords(l);
  const localeName = locale.lang || "en-US";
  return new Intl.NumberFormat(localeName, {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "EUR",
  }).format(n);
}

const value = new Date(2024, 2, 18);
</script>

<template>
  <div class="demo-box">
    <div class="demo-hscroll">
      <div>
        <Segmented :options="options" v-model:value="lang" />
      </div>
    </div>
  </div>

  <div class="demo-box" style="width: 300px">
    <Locale :key="lang" :words="getWords(lang)">
      <div class="calendar">
        <Calendar v-model:value="value" />
      </div>

      <div class="bar">
        <div class="text">
          <Text v-model:value="numValue" />
        </div>
        {{ getFormattedNumber(lang, numValue) }}
      </div>
    </Locale>
  </div>
</template>


<style scoped>

	.calendar {
		border: var(--wx-border);
		border-radius: 3px;
	}
	.bar {
		display: flex;
		margin-top: 20px;
		gap: 20px;
		align-items: center;
	}
	.text {
		width: 150px;
	}

</style>
