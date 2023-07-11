<template>
  <div>
    <h1 class="font-bold text-lg">Add Question</h1>
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
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "QuestionForm",
  data() {
    return {
      form: {
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
      },
    };
  },
  methods: {
    ...mapActions({
      snack: "snack/snack",
    }),
    submit() {
      axios
        .post("api/questions", this.form)
        .then((res) => {
          this.form.question = "";
          this.form.option = [
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

          this.snack({
            text: res.data,
            delay: 1000,
          });

          this.$emit("fetchall");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
