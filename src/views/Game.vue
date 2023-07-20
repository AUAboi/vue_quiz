<script setup>
import axios from "axios";

import GameOption from "@/components/GameOption";
import GameScore from "@/components/GameScore";

import Modal from "@/components/UI/Modal";
import Loader from "@/components/UI/Loader";
import { onMounted, ref } from "vue";

const questions = ref([]);
const options = ref([]);
const currentQuestion = ref(0);
const timer = ref(10);
const playerScore = ref(0);
const newScore = ref(0);
const i = ref(0);
const showModal = ref(false);
const disableNext = ref(true);
const optionDisabled = ref(false);
const loading = ref(false);
let timeout;

const gameRender = () => {
  loading.value = true;
  getQuestions();
};

const getQuestions = () => {
  axios
    .get("/api/questions")
    .then((res) => {
      questions.value = res.data;
      getOptions(questions.value[currentQuestion.value].id);
      countDown();
    })
    .catch((err) => console.log(err));
};

const getOptions = (id) => {
  axios.get(`api/options/${id}`).then((res) => {
    options.value = res.data;
    timer.value = 10;
    countDown();
  });
  loading.value = false;
};

const countDown = () => {
  if (timer.value > 0) {
    timeout = setTimeout(() => {
      timer.value--;
      clearTimeout(timeout);
      countDown();
    }, 1000);
  }
};

const renderQuestion = () => {
  if (disableNext.value) {
    return;
  }
  disableNext.value = true;

  clearTimeout(timeout);
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++;
    getOptions(questions.value[currentQuestion.value].id);
    optionDisabled.value = false;
  } else {
    axios
      .post("api/score/store", { score: playerScore.value })
      .then((res) => {
        console.log("Stored successfully");
      })
      .catch((e) => {
        console.log(e);
      });
    showModal.value = true;
  }
};

const processOption = (correct) => {
  //Checks if correct
  optionDisabled.value = true;

  disableNext.value = false;
  timer.value = 0;
  clearTimeout(timeout);
  i.value++;
  if (correct) {
    playerScore.value++;
    newScore.value = 1;
  } else {
    newScore.value = 0;
  }
};

onMounted(() => {
  gameRender();
});
</script>
<template>
  <div>
    <Modal :show="showModal" :score="playerScore" />
    <Loader v-if="loading" />
    <div
      v-if="questions.length"
      class="quiz-container mt-12 mx-auto md:p-12 p-3 w-10/12 sm:w-9/12 bg-gray-200 text-white rounded-lg"
    >
      <div>
        <Game-Score :score="playerScore" :newScore="newScore" :i="i" />
        <p
          v-if="questions[currentQuestion]"
          class="sm:mx-2 mx-1 md:text-lg text-xl p-3"
        >
          Question {{ currentQuestion + 1 }}
          {{ questions[currentQuestion].question }}
        </p>

        <div class="grid md:grid-cols-2">
          <div class="md:row-start-1">
            <Game-Option
              v-for="option in options"
              :option="option"
              :qid="questions[currentQuestion].id"
              :isDisabled="optionDisabled"
              :key="option.id"
              @correct="processOption"
            />
          </div>
          <div class="m-auto row-start-1">
            <p class="sm:text-9xl text-6xl">{{ timer }}</p>
          </div>
        </div>

        <button
          :disabled="disableNext"
          class="mx-2 p-3 text-xl"
          :class="!timer ? 'block' : 'hidden'"
          @click="renderQuestion"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  background-color: #1e606e;
}
</style>
