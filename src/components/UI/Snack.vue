<script setup>
const snack = "";
</script>
<template>
  <div class="fixed w-full top-0 left-0 flex justify-center mt-3">
    <transition name="snack">
      <div
        class="bg-blue-500 text-white px-8 py-2 rounded-lg text-sm"
        id="snack"
        v-if="snack"
      >
        {{ snack }}
      </div>
    </transition>
  </div>
</template>
