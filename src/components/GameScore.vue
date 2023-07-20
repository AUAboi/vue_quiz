<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  score: Number,
  newScore: Number,
  i: Number,
});

const show = ref(false);

watch(
  () => props.i,
  () => {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 750);
  }
);
</script>

<template>
  <div>
    <p class="text-3xl my-3 mx-2 p-3">
      <span class="temp-score" :class="show ? 'score-show' : ''"
        >+{{ newScore }}</span
      >
      {{ score }} points
    </p>
  </div>
</template>

<style scoped>
.temp-score {
  transition: all 250ms ease-out;
  opacity: 0;
}
.score-show {
  opacity: 1 !important;
}
</style>
