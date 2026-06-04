<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle';
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const puzzleStore = usePuzzleStore();

const isCompleted = puzzleStore.completedPuzzles.includes("1983")

const word = 'PACMAN'
const guessed = ref<string[]>([])
const maxWrong = 5
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const wrongGuesses = computed(() =>
  guessed.value.filter(l => !word.includes(l)).length
)

const displayWord = computed(() => {
  if (won.value || lost.value) return word.split('').join(' ')
  return word.split('').map(l => guessed.value.includes(l) ? l : '_').join(' ')
})

const won = computed(() => word.split('').every(l => guessed.value.includes(l))  || puzzleStore.correctPuzzleIds.includes('1983'))
const lost = computed(() => wrongGuesses.value >= maxWrong || puzzleStore.wrongPuzzleIds.includes('1983'))

function guess(letter: string) {
  if (!guessed.value.includes(letter)) {
    guessed.value.push(letter)
  }
}

watch(won, (val) => { if (val) puzzleStore.completePuzzle('1983', true) })
watch(lost, (val) => { if (val) puzzleStore.completePuzzle('1983', false) })

function goToNextTimelineItem(){
  router.push("/timeline/1991")
}



</script>

<template>
  <div class="wordguess">
    <p class="intro">🖥️ Het jaar is 1983. Raad het geheime woord!</p>
    <p class="counter">Foute gokken: <span :class="{ danger: wrongGuesses >= maxWrong - 1 }">{{ wrongGuesses }}</span> / {{ maxWrong }}</p>

    <p class="word">{{ displayWord }}</p>

    <div v-if="!won && !lost && !isCompleted" class="keyboard">
      <button
        v-for="letter in letters"
        :key="letter"
        class="key"
        @click="guess(letter)"
        :disabled="guessed.includes(letter)"
      >
        {{ letter }}
      </button>
    </div>

    <p v-if="won" class="result win">Gewonnen! Het woord was {{ word }}!</p>
    <p v-if="lost" class="result lose">Verbinding verbroken... Het woord was {{ word }}.</p>
    <button @click="goToNextTimelineItem" class="continue-button" v-if="won || lost">Doorgaan →</button>
  </div>
</template>


<style scoped>
.wordguess {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  font-family: 'Courier New', Courier, monospace;
  color: #c8ffc8;
  max-width: 520px;
  margin: 0 auto;
}

.intro {
  color: #3dff3d;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.counter {
  color: #7fff7f;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.continue-button {
  background: linear-gradient(135deg, #1a3d1a, #0d2a0d);
  border: 1px solid #3a8a3a;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  padding: 12px 32px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-top: 1.5rem;
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}


.counter .danger {
  color: #ff5555;
}

.word {
  font-size: 2.5rem;
  letter-spacing: 0.5em;
  color: #3dff3d;
  text-shadow: 0 0 12px #3dff3d88;
  margin-bottom: 2rem;
  font-weight: bold;
}

.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  max-width: 420px;
  margin-bottom: 1.5rem;
}

.key {
  background: linear-gradient(135deg, #1a3d1a, #0d2a0d);
  border: 1px solid #3a8a3a;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  min-width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.key:hover:not(:disabled) {
  border-color: #5dff5d;
  color: #3dff3d;
  box-shadow: 0 0 10px #3dff3d66;
}

.key:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.result {
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  margin-top: 1rem;
}

.win {
  color: #3dff3d;
  text-shadow: 0 0 10px #3dff3d88;
}

.lose {
  color: #ff5555;
  text-shadow: 0 0 10px #ff555588;
}
</style>