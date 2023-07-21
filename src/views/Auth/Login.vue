<script setup>
import { ref, reactive } from "vue";
import Loader from "@/components/UI/Loader";
import { useUserStore } from "@/store/user.js";
import { useSnackStore } from "@/store/snack.js";

import router from "../../router";

const form = reactive({
  email: "",
  password: "",
});

const userStore = useUserStore();
const snackStore = useSnackStore();

const loading = ref(false);

const submit = async () => {
  loading.value = true;
  await userStore.signIn(form);

  loading.value = false;

  if (!userStore.authenticated) {
    snackStore.snack({ text: "Authentication failed" });
    return;
  }

  router.replace({ name: "Admin" });
};
</script>

<template>
  <div class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
        >
          Login
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Login user or admin using your given email and password
        </p>
      </div>
      <Loader v-if="loading" />
      <form
        class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"
      >
        <div class="relative flex-grow w-full">
          <label for="email" class="leading-7 text-sm text-gray-600"
            >Email</label
          >
          <input
            type="text"
            id="email"
            name="email"
            v-model="form.email"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 sel focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative flex-grow w-full">
          <label for="password" class="leading-7 text-sm text-gray-600"
            >Password</label
          >
          <input
            type="password"
            id="password"
            name="password"
            v-model="form.password"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 sel focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          class="text-white bg-sky-900 border-0 py-2 px-8 focus:outline-none"
          @click.prevent="submit"
        >
          Button
        </button>
      </form>
    </div>
  </div>
</template>
