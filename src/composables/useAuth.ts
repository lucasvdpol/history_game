import { ref } from 'vue'

const isLoggedIn = ref(false)
const operatorName = ref('')

export function useAuth() {
  function login(name: string) {
    operatorName.value = name
    isLoggedIn.value = true
  }

  return { isLoggedIn, operatorName, login }
}
