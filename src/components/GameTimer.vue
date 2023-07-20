<script setup>
import { ref, onMounted } from "vue";

const timer = ref(10);
const countDown = () => {
  if (timer.value > 0) {
    setTimeout(() => {
      timer.value--;
      countDown();
    }, 1000);
  }
};

onMounted(() => {
  countDown();
});
</script>

<template>
  <div>
    <p class="text-8xl">
      {{ timer }}
    </p>
  </div>
</template>
