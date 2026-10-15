import { createPinia } from "pinia";
import { createApp } from "vue";

import { App, router } from "@app";

import "./app/styles/index.scss";

createApp(App).use(createPinia()).use(router).mount("#app");
