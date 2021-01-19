import { createStore } from "vuex";
import auth from "./auth";
import snack from "./snack";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    snack,
  },
});
