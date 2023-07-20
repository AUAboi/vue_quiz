import { defineStore } from "pinia";
import { ref } from "vue";

let defaults = {
  time: 2000,
  delay: 0,
  text: "",
};

export const useSnackStore = defineStore('snack', () => {
  const snackText = ref('')

  function snack(options) {
    options = { ...defaults, ...options };

    setTimeout(() => {
      snackText.value = options.text

      //Destroy snacks after 2 seconds
      setTimeout(() => {
        snackText.value = null
      }, options.time);
    }, options.delay);
  }

  return { snackText, snack }
})
