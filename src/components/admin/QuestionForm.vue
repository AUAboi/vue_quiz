<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useSnackStore } from "@/store/snack";

const form = reactive({
  question: "",
  option: [
    {
      name: "",
      is_correct: false,
    },
    {
      name: "",
      is_correct: false,
    },
    {
      name: "",
      is_correct: false,
    },
  ],
});

const emit = defineEmits(["fetchall"]);

const snackStore = useSnackStore();

const submit = () => {
  axios
    .post("api/questions", form)
    .then((res) => {
      form.question = "";
      form.option = [
        {
          name: "",
          is_correct: false,
        },
        {
          name: "",
          is_correct: false,
        },
        {
          name: "",
          is_correct: false,
        },
      ];

      snackStore.snack({
        text: res.data,
        delay: 1000,
      });

      emit("fetchall");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <div>
    <h1 class="font-bold text-lg text-center mt-5">Add Question</h1>
    <p class="text-center">Check the correct options. A question can have more than one correct option</p>
    <form @submit.prevent="submit" class="form mx-auto my-3 w-6/12 text-center">
      <input
        type="text"
        class="border border-black my-3"
        placeholder="Question"
        v-model="form.question"
      />
      <div v-for="(op, i) in form.option" :key="i">
        <input
          type="checkbox"
          class="form-checkbox mx-1"
          v-model="op.is_correct"
        />

        <input
          type="text"
          class="form-input border border-black my-3"
          v-model="op.name"
        />
      </div>
      <button type="submit" class="text-white bg-sky-900 border-0 py-2 px-8 focus:outline-none">Submit</button>
    </form>
  </div>
</template>
