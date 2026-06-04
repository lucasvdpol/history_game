import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePuzzleStore = defineStore('puzzle', () => {
  const correctPuzzleIds = ref<string[]>([])
  const wrongPuzzleIds = ref<string[]>([])
  const completedPuzzles = ref<string[]>([])

  const totalPuzzles = 5
  const currentPuzzle = ref('')

  function completePuzzle(id: string, isCorrect: boolean) {
    if (completedPuzzles.value.includes(id)) return

    completedPuzzles.value.push(id)

    if (isCorrect) {
      correctPuzzleIds.value.push(id)
    } else {
      wrongPuzzleIds.value.push(id)
    }
  }

  return { correctPuzzleIds, wrongPuzzleIds, completedPuzzles, totalPuzzles, currentPuzzle, completePuzzle }
})