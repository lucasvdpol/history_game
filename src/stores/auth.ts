import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const operatorName = ref('')

  function login(name: string) {
    operatorName.value = name
    isLoggedIn.value = true
  }

  function logout() {
    operatorName.value = ''
    isLoggedIn.value = false;
  }

  return { isLoggedIn, operatorName, login, logout }
})
