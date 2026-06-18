<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, ref, watch } from 'vue'
import { usePuzzleStore } from '@/stores/puzzle'
import { useRouter } from 'vue-router'

const router = useRouter()
const puzzleStore = usePuzzleStore()

const puzzleItems = ref(["<card title='Nieuws'>", "<p>Klik hier</p>", "<a href='...'>", "<card title='Menu'>"])
const correctOrder = ["<card title='Menu'>", "<card title='Nieuws'>", "<p>Klik hier</p>", "<a href='...'>"]

const correct = computed(() => puzzleItems.value.join() === correctOrder.join())
const won = computed(() => submitted.value && correct.value || puzzleStore.correctPuzzleIds.includes('1999'))
const lost = computed(() => submitted.value && !correct.value && attempts.value >= maxAttempts || puzzleStore.wrongPuzzleIds.includes('1999'))

const drag = ref(false)
const submitted = ref(false)
const attempts = ref(0)
const maxAttempts = 3

watch(won, (val) => { if (val) puzzleStore.completePuzzle('1999', true) })
watch(lost, (val) => { if (val) puzzleStore.completePuzzle('1999', false) })

function controleer() {
  submitted.value = true
  attempts.value++
  if (!correct.value && attempts.value < maxAttempts) {
    setTimeout(() => { submitted.value = false }, 1500)
  }
}

function goToNextTimelineItem() {
  router.push('/timeline/2007')
}
</script>

<template>
  <div class="wap">
    <p class="intro">Het jaar is 1999. Bouw een geldige WAP-pagina!</p>
    <p class="counter">Foute pogingen: <span :class="{ danger: attempts >= maxAttempts - 1 }">{{ attempts }}</span> / {{ maxAttempts }}</p>

    <div v-if="!won && !lost" class="blocks">
      <draggable v-model="puzzleItems" group="wap" item-key="name" @start="drag=true" @end="drag=false">
        <template #item="{ element }">
          <div class="code-block">{{ element }}</div>
        </template>
      </draggable>
    </div>

    <div v-if="won || lost" class="blocks static">
      <div v-for="item in correctOrder" :key="item" class="code-block">{{ item }}</div>
    </div>

    <button v-if="!won && !lost" class="check-btn" @click="controleer">
      &gt; Controleer
    </button>

    <p v-if="won" class="result win">✓ Verbinding geslaagd! De WAP-pagina is correct opgebouwd.</p>
    <p v-if="lost" class="result lose">✗ Te veel foute pogingen. De juiste volgorde staat hierboven.</p>
    <button v-if="won || lost" @click="goToNextTimelineItem" class="continue-button">Doorgaan →</button>
  </div>
</template>

<style scoped>
.wap {
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
  font-size: 0.85rem;
  margin-bottom: 1.75rem;
  letter-spacing: 0.05em;
}

.counter .danger {
  color: #ff5555;
  text-shadow: 0 0 8px #ff555566;
}

.blocks {
  width: 100%;
  max-width: 420px;
  margin-bottom: 1.5rem;
}

.code-block {
  background: #050d05;
  color: #3dff3d;
  border: 1px solid #2a5a2a;
  border-left: 3px solid #3dff3d;
  border-radius: 4px;
  padding: 10px 16px;
  margin-bottom: 8px;
  cursor: grab;
  user-select: none;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  transition: all 0.12s ease;
}

.static .code-block {
  cursor: default;
}

.code-block:hover {
  border-color: #3dff3d;
  box-shadow: 0 0 8px #3dff3d33;
}

.check-btn {
  background: linear-gradient(135deg, #1a3d1a, #0d2a0d);
  border: 1px solid #3a8a3a;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.95rem;
  padding: 10px 28px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.check-btn:hover {
  border-color: #5dff5d;
  color: #3dff3d;
  box-shadow: 0 0 12px #3dff3d44;
}

.result {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  line-height: 1.65;
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid;
  border-left: 3px solid;
  width: 100%;
  max-width: 420px;
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

.lose {
  color: #ff7070;
  text-shadow: 0 0 10px #ff555566;
  border-color: #5a2a2a;
  border-left-color: #ff5555;
  background: #0d0505;
  box-shadow: 0 0 20px #ff55550d;
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

.continue-button:hover {
  border-color: #5dff5d;
  color: #3dff3d;
  box-shadow: 0 0 14px #3dff3d44;
  transform: translateX(2px);
}
</style>
