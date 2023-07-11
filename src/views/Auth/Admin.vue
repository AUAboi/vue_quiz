<template>
  <div>
    <Question-Form @fetchall="getQuestions" />
    <Question-Table :questions="questions" @fetchall="getQuestions" />
  </div>
</template>

<script>
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionTable from "@/components/admin/QuestionTable";

import auth from "../../router/middleware/auth";
import axios from "axios";

export default {
  middleware: [auth],
  name: "Admin",
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    getQuestions() {
      axios.get("api/questions/show").then((response) => {
        this.questions = response.data;
      });
    },
  },
  components: {
    QuestionForm,
    QuestionTable,
  },
  created() {
    this.getQuestions();
  },
};
</script>

<style></style>
