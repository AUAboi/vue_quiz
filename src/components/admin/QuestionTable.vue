<script setup>
import axios from "axios";
import { useSnackStore } from "../../store/snack";

const emit = defineEmits(["fetchall"]);

const snackStore = useSnackStore();

const props = defineProps({
  questions: {
    required: true,
    default: () => {
      return [];
    },
  },
});

const deleteEntry = async (id) => {
  await axios.delete(`api/questions/${id}`);
  snackStore.snack({
    text: "Deleted Successfully",
    delay: 500,
  });
  emit("fetchall");
};
</script>

<style></style>

<template>
  <div class="bg-white rounded-md shadow overflow-x-auto mx-4">
    <table class="w-full whitespace-nowrap">
      <tr class="bg-gray-800">
        <th class="px-16 py-2">
          <span class="text-gray-300">Id</span>
        </th>
        <th class="px-16 py-2">
          <span class="text-gray-300">Question</span>
        </th>
        <th class="px-16 py-2">
          <span class="text-gray-300">Option</span>
        </th>
        <th class="px-16 py-2">
          <span class="text-gray-300">Option</span>
        </th>

        <th class="px-16 py-2">
          <span class="text-gray-300">Option</span>
        </th>

        <th class="px-16 py-2">
          <span class="text-gray-300">Action</span>
        </th>
      </tr>
      <tr
        v-for="question in questions"
        :key="question.id"
        class="bg-white border-4 border-gray-200"
      >
        <td class="px-16 py-2 flex flex-row items-center">
          <span class="text-center ml-2 font-semibold">{{ question.id }}</span>
        </td>
        <td>
          <span class="text-center ml-2 font-semibold">{{
            question.question
          }}</span>
        </td>
        <td
          v-for="option in question.options"
          :key="option.id"
          class="px-16 py-2"
          :class="option.is_correct == 1 ? 'bg-green-200' : 'bg-white'"
        >
          <span>{{ option.option }}</span>
        </td>

        <td class="px-16 py-2">
          <button
            @click="deleteEntry(question.id)"
            class="bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black"
          >
            DELETE
          </button>
        </td>
      </tr>
      <tr v-if="questions.length === 0">
        <td class="border-t px-6 py-4" colspan="4">No entry found.</td>
      </tr>
    </table>
  </div>
</template>
