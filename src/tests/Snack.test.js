import { mount } from "@vue/test-utils";
import Snack from "@/components/UI/Snack.vue";
import { test } from "vitest";
import { createStore } from 'vuex'

let defaults = {
  time: 2000,
  delay: 0,
  text: "",
};

const store = createStore({
  namespaced: true,

  state: {
    snack: null,
  },

  getters: {
    snack(state) {
      return state.snack;
    },
  },

  mutations: {
    SET_SNACK(state, text) {
      state.snack = text;
    },
  },
  actions: {
    snack({ commit }, options) {
      options = { ...defaults, ...options };

      setTimeout(() => {
        commit("SET_SNACK", options.text);

        //Destroy snacks after 2 seconds
        setTimeout(() => {
          commit("SET_SNACK", null);
        }, options.time);
      }, options.delay);
    },
  },
});


const wrapper = mount(Snack, {
  props: {
    snack: null,
  },
  global: {
    plugins: [store]
  }
});

it("mounts Snack component", async () => {
  expect(Snack).toBeTruthy();
});

it("is not visible without vuex", async () => {
  expect(wrapper.find('#snack').exists()).toBe(false)
})

it("is visible after vuex action is passed", async () => {
  expect(wrapper.find('#snack').exists()).toBe(true)
})
