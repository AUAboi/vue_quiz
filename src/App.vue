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
        <router-link v-if="userStore.user.is_admin" to="/admin">{{
          userStore.user.name
        }}</router-link>
        <router-link v-else to="/profile">{{
          userStore.user.name
        }}</router-link>
        |
        <a class="cursor-pointer" @click.prevent="signOut">Sign out</a>
      </template>
    </div>
    <router-view />
    <footer class="fixed bottom-0">
      &copy; Awais Faisal & Umar Nadeem 
      <span class="text-blue-500"> PF_Project</span>
    </footer>
  </div>
</template>
<style>
body {
  background: #f5f5f5;
}
#nav {
  text-align: center;
}
</style>
