import { createApp } from 'vue'

import App from "./App.vue";
import "./index.css";
import router from "./router";
import { createPinia } from 'pinia'
import axios from "axios";
import { useUserStore } from "@/store/user.js";

axios.defaults.withCredentials = true;

// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URI
const pinia = createPinia()



const app = createApp(App)
  .use(pinia)

const userStore = useUserStore()
userStore.verifyLogin()

app.use(router)
  .mount("#app");

