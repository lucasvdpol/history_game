import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const operatorName = ref('')

  function login(name: string) {
    operatorName.value = name
    isLoggedIn.value = true
  }

  return { isLoggedIn, operatorName, login }
})
