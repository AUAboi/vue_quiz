<script setup>
import Snack from "./components/UI/Snack";
import { useUserStore } from "@/store/user.js";
import router from "./router";

const userStore = useUserStore();

const signOut = async () => {
  await userStore.signOut();
  router.replace({ name: "Home" });
};
</script>
<template>
  <div id="app">
    <Snack />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="!userStore.authenticated">
        <router-link to="/login">Sign in</router-link>
      </template>
      <template v-else>
        <router-link to="/admin">{{ userStore.user.name }}</router-link> |
        <a class="cursor-pointer" @click.prevent="signOut">Sign out</a>
      </template>
    </div>
    <router-view />
    <footer class="fixed bottom-0">
      &copy; Ahsan_AUA
      <a class="text-blue-500" href="https://auaboi.github.io/auaahsan/dist/"
        >Portfolio</a
      >
    </footer>
  </div>
</template>
<style>
body {
  background: #c7d5c3;
}
#nav {
  text-align: center;
}
</style>
