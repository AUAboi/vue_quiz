let defaults = {
  time: 2000,
  delay: 0,
  text: "",
};

export default {
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
};
