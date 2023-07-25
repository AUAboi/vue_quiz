import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
  const authenticated = ref(false)
  const user = ref(null)

  const signIn = async (credentials) => {
    await axios.get("/sanctum/csrf-cookie");

    try {
      await axios.post("/api/login", credentials);

    } catch (error) {
      console.log(error);
    }

    await verifyLogin()
  }

  const signUp = async (credentials) => {

    try {
      await axios.post("/api/register", credentials);

    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    await axios.post("/logout");
    await verifyLogin()
  }

  const verifyLogin = async () => {
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

  return { authenticated, user, signIn, signUp, signOut, verifyLogin }
})
