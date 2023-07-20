import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
  const authenticated = ref(false)
  const user = ref(null)

  const signIn = async (credentials) => {

    await axios.get("/sanctum/csrf-cookie");

    try {
      await axios.post("/login", credentials);

    } catch (error) {
      console.log(error);
    }

    verifyLogin()
  }

  const signOut = async () => {
    await axios.post("/logout");
    verifyLogin()
  }

  const verifyLogin = () => {
    return axios
      .get("/api/user")
      .then((response) => {
        authenticated.value = true
        user.value = response.data
      })
      .catch(() => {
        authenticated.value = false
        user.value = null
      });
  }

  return { authenticated, user, signIn, signOut, verifyLogin }
})