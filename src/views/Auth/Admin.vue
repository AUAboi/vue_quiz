<script setup>
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionTable from "@/components/admin/QuestionTable";
import axios from "axios";
import { ref, onMounted } from "vue";
import ScoreHistory from "../../components/ScoreHistory.vue";

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
    <div class="mt-16">
      <h2 class="font-bold text-center text-4xl">Score History</h2>

      <ScoreHistory />
    </div>
  </div>
</template>
