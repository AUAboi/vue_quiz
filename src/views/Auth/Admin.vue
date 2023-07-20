<script setup>
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionTable from "@/components/admin/QuestionTable";
import axios from "axios";
import { ref, onMounted } from "vue";

const questions = ref([]);

const getQuestions = () => {
  axios.get("api/questions/show").then((response) => {
    questions.value = response.data;
  });
};

onMounted(() => {
  getQuestions();
});
</script>

<template>
  <div>
    <QuestionForm @fetchall="getQuestions" />
    <QuestionTable :questions="questions" @fetchall="getQuestions" />
  </div>
</template>
