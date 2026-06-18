<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePuzzleStore } from '@/stores/puzzle'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore();
const puzzleStore = usePuzzleStore()

const score = computed(() => puzzleStore.correctPuzzleIds.length)
const allCorrect = computed(() => score.value === puzzleStore.totalPuzzles)

if (puzzleStore.completedPuzzles.length < puzzleStore.totalPuzzles) {
  router.replace('/')
}

function restart() {
  puzzleStore.resetGame()
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <main class="result-main">
    <div class="content">
      <span class="block-label">&gt; MISSIE VOLTOOID</span>
      <h1 class="title">Je hebt de tijdreis afgerond!</h1>

      <div class="score-block">
        <span class="score-label">SCORE</span>
        <span class="score-value">{{ score }} / {{ puzzleStore.totalPuzzles }}</span>
      </div>

      <p v-if="allCorrect" class="result win">✓ Perfect! Je hebt alle puzzels goed opgelost.</p>
      <p v-else class="result info">Je hebt {{ score }} van de {{ puzzleStore.totalPuzzles }} puzzels goed opgelost. Probeer het nog eens voor een hogere score!</p>

      <button @click="restart" class="continue-button">Opnieuw beginnen →</button>
    </div>
  </main>
</template>

<style scoped>
.result-main {
  min-height: 100vh;
  background: #0a0a0f;
  color: #c8ffc8;
  font-family: 'Courier New', Courier, monospace;
  padding: 40px 24px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.content {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.block-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: #3dff3d;
  text-transform: uppercase;
}

.title {
  font-size: 1.8rem;
  color: #7fff7f;
  margin: 0;
  text-shadow: 0 0 16px #3aff3a44;
  letter-spacing: 0.04em;
}

.score-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: #0d1a0d;
  border: 1px solid #2a5a2a;
  border-radius: 10px;
  padding: 20px 40px;
}

.score-label {
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  color: #5aff5a;
}

.score-value {
  font-size: 2.4rem;
  font-weight: bold;
  color: #3dff3d;
  text-shadow: 0 0 14px #3dff3d88;
}

.result {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  line-height: 1.65;
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid;
  border-left: 3px solid;
  width: 100%;
  box-sizing: border-box;
}

.win {
  color: #3dff3d;
  text-shadow: 0 0 10px #3dff3d88;
  border-color: #2a5a2a;
  border-left-color: #3dff3d;
  background: #050d05;
  box-shadow: 0 0 20px #3dff3d0d;
}

.info {
  color: #a8d8a8;
  border-color: #2a5a2a;
  border-left-color: #5aff5a;
  background: #0d1a0d;
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
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.continue-button:hover {
  border-color: #5dff5d;
  color: #3dff3d;
  box-shadow: 0 0 14px #3dff3d44;
  transform: translateX(2px);
}
</style>
