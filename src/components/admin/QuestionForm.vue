<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useSnackStore } from "@/store/snack";
import { useArrayIncludes } from "@vueuse/core";

const form = reactive({
  file: null,
  question: "",
  options: [
    {
      option: "",
      is_correct: false,
    },
    {
      option: "",
      is_correct: false,
    },
    {
      option: "",
      is_correct: false,
    },
  ],
});

const emit = defineEmits(["fetchall"]);

const canSubmit = useArrayIncludes(form.options, true, "is_correct");

const snackStore = useSnackStore();

const submit = () => {
  if (!canSubmit.value) {
    snackStore.snack({
      text: "Atleast one option must be correct",
    });
    return;
  }
  axios
    .post("api/questions", form)
    .then((res) => {
      form.question = "";
      form.options = [
        {
          option: "",
          is_correct: false,
        },
        {
          option: "",
          is_correct: false,
        },
        {
          option: "",
          is_correct: false,
        },
      ];

      snackStore.snack({
        text: res.data,
        delay: 1000,
      });

      emit("fetchall");
    })
    .catch((error) => {
      if (error.response.data.errors) {
        snackStore.snack({
          text: error.response.data.message,
          delay: 1000,
        });
      }
    });
};

const bulk = () => {
  let f = new FormData()
  f.append('file', form.file)
  axios
    .post("api/questions-import", f)
    .then((res) => {
      form.file = null
      emit("fetchall");


      snackStore.snack({
        text: res.data,
        delay: 1000,
      });

    })
    .catch((error) => {
      if (error.response.data.errors) {
        snackStore.snack({
          text: error.response.data.message,
          delay: 1000,
        });
      }
    });
}

const addField = () => {
  form.options.push({
    option: "",
    is_correct: false,
  });
};

const removeField = (i) => {
  form.options.splice(i, 1);
};
</script>
<template>
  <div>
    <h1 class="font-bold text-lg text-center mt-5">Add Question</h1>
    <p class="text-center">
      Check the correct options
    </p>
    <form @submit.prevent="submit" class="form mx-auto my-3 w-6/12 text-center">
      <input type="text" class="border border-black my-3 w-1/2" placeholder="Question" v-model="form.question" />
      <div class="flex justify-center gap-4 items-center" v-for="(op, i) in form.options" :key="i">
        <input type="checkbox" class="form-checkbox mx-1" v-model="op.is_correct" />

        <input type="text" class="form-input border border-black my-3" v-model="op.option" />
        <div>
          <button @click.prevent="removeField(i)" v-if="i > 2" class="">
            X
          </button>
        </div>
      </div>

      <button type="submit"
        class="text-white bg-sky-900 border-0 py-2 px-8 focus:outline-none disabled:cursor-not-allowed">
        Submit
      </button>
    </form>
    <div class="flex flex-col items-center my-10 gap-6">
      <h3 class="text-xl font-semibold text-center">Bulk Import</h3>
      <input @change="e => form.file = e.target.files[0]" class="text-center block" type="file">

      <button @click.prevent="bulk"
        class="text-white bg-sky-900 border-0 py-2 px-8 focus:outline-none disabled:cursor-not-allowed">
        Upload
      </button>
    </div>
  </div>
</template>


<style scoped>
input {
  padding: 10px;
}
</style>