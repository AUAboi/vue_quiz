import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import store from "./store";

import axios from "axios";

axios.defaults.withCredentials = true;
//Set this to process.env.VUE_APP_API_URL
axios.defaults.baseURL = "http://localhost:8000/";

store.dispatch("auth/me").then(() => {
  createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
});
