import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css"; //icon的css
import "./style.scss";

//router
import router from "./router/router";
//pinia
import { createPinia } from "pinia";
// Vuetify
// @ts-ignore(忽略型別的註記)
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
//icon
import { aliases, mdi } from "vuetify/iconsets/mdi";

import App from "./App.vue";
//pinia
const pinia = createPinia();
// Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
