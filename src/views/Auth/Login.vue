<script setup>
import { mapActions } from "vuex";
import { ref, reactive } from "vue";
import Loader from "@/components/UI/Loader";
import { useUserStore } from "@/store/user.js";
import router from "../../router";

const form = reactive({
  email: "",
  password: "",
});

const userStore = useUserStore();

const loading = ref(false);

const submit = async () => {
  //send action signIn form credentials
  loading.value = true;
  await userStore.signIn(form);
  //Redirects to admin
  loading.value = false;
  router.replace({ name: "Admin" });
};
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <form action="#" @submit.prevent="submit">
      <div>
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" v-model="form.email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          v-model="form.password"
        />
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input {
  border: 1px black solid;
  margin: 0.3rem 1rem;
}
</style>
