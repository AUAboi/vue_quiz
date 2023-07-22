<script setup>
import axios from "axios";
import DataTable from "./DataTable.vue";
import { useUserStore } from "../store/user";
import { ref, onMounted } from "vue";

const labels = [
  {
    value: "Score",
    key: "score",
  },
  {
    value: "At",
    key: "created_at",
  },
];

const scores = ref([]);

const userStore = useUserStore();

const getScores = async () => {
  let res = await axios.get(`/api/score/${userStore.user.id}`);
  scores.value = res.data;
};

onMounted(() => {
  getScores();
});
</script>
<template>
  <div class="bg-white rounded-md shadow overflow-x-auto mx-4">
    <DataTable :labels="labels" :table-data="scores" />
  </div>
</template>
