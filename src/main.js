import { createApp } from 'vue'

import App from "./App.vue";
import "./index.css";
import router from "./router";
import { createPinia } from 'pinia'
import axios from "axios";
import { useUserStore } from "@/store/user.js";

axios.defaults.withCredentials = true;
//Set this to process.env.VUE_APP_API_URL
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "http://localhost:8000"
const pinia = createPinia()



const app = createApp(App)
  .use(pinia)

const userStore = useUserStore()
await userStore.verifyLogin()

app.use(router)
  .mount("#app");

