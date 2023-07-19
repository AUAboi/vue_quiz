import { mount } from "@vue/test-utils";
import Snack from "@/components/UI/Snack.vue";
import { test } from "vitest";
import { createStore } from 'vuex'

const store = createStore({
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
  store.commit("SET_SNACK", "test")
  expect(store.state.snack).toBe("test")
})
