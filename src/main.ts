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
//引用snackbar替代alert
import { useSnackbarStore } from "./stores/snackbar";

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

//全域路由守衛 (to是要進入的路由 from是要離開的路由 next是繼續)
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    const snackbar = useSnackbarStore();
    snackbar.warning("請先登入");
    next("/login");
  } else {
    next();
  }
});

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
