<script setup>
import axios from "axios";
import { ref, defineEmits } from "vue";

const props = defineProps({
  option: Object,
  qid: Number,
  isDisabled: Boolean,
});

const selected = ref(false);
const disabled = ref(false);

const emit = defineEmits(["correct"]);

const checkOption = () => {
  disabled.value = true;
  if (!props.isDisabled) {
    selected.value = true;
  }
  axios.post(`/api/options/${props.qid}/${props.option.id}`).then((res) => {
    if (res.data != 0 && !props.isDisabled) {
      emit("correct", true);
    } else {
      emit("correct", false);
    }
  });
};
</script>

<template>
  <div class="m-2 border-black border-2">
    <button
      :disabled="isDisabled || disabled"
      @click="checkOption"
      class="text-lg w-full text-left sm:p-3 p-2"
      :class="selected ? 'selected' : ''"
    >
      {{ option.option }}
    </button>
  </div>
</template>

<style scoped>
.selected {
  background-color: #173940;
}
</style>
