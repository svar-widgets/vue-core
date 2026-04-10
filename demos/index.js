import { createApp } from 'vue'
import Demos from './common/Index.vue'

import Willow from '../src/themes/Willow.vue';
import WillowDark from '../src/themes/WillowDark.vue';

import { Globals, Button, Segmented, Locale } from '../src/index.js';
import { router } from "./common/helpers.js";

const skins = [
  { id: 'willow', label: 'Willow', component: Willow },
  { id: 'willow-dark', label: 'Dark', component: WillowDark },
];

const app = createApp(Demos, {
  publicName: "Core",
  skins,
  productTag: "core",
  productLink: "core",
  Globals,
  Button,
  Segmented,
  Locale
});
app.use(router);
app.mount('#app');
