<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useRouter } from 'vue-router'
import { usePuzzleStore } from '@/stores/puzzle'
import type { PuzzlePieceModel } from '@/models/puzzle-piece'
import PuzzlePieceComponent from '@/components/PuzzlePieceComponent.vue'
import fiveGImage from '@/assets/2020/5g-network.svg'

const router = useRouter()
const puzzleStore = usePuzzleStore()

function shuffledPieces(): PuzzlePieceModel[] {
  const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j]!, positions[i]!]
  }
  return positions.map((correctPosition) => ({ correctPosition }))
}

const pieceImages = ref<PuzzlePieceModel[]>(shuffledPieces())

let originalIndex = 0
let futureIndex = 0

const solved = ref(false)
const isCompleted = computed(() => puzzleStore.completedPuzzles.includes('2020'))
const won = computed(() => solved.value || isCompleted.value)

watch(won, (val) => { if (val) puzzleStore.completePuzzle('2020', true) })

function handleMove(e: any) {
  originalIndex = e.draggedContext.index
  futureIndex = e.draggedContext.futureIndex
  return false
}

function checkSolution() {
  const isSolved = pieceImages.value.every((piece, index) => piece.correctPosition === index)
  if (isSolved) {
    solved.value = true
  }
}

function handleDragEnd() {
  const temp = pieceImages.value[originalIndex]
  pieceImages.value[originalIndex] = pieceImages.value[futureIndex]!
  pieceImages.value[futureIndex] = temp!
  checkSolution()
}

function goToNextTimelineItem() {
  router.push('/')
}
</script>

<template>
  <div class="slidepuzzle">
    <p class="intro">Het is 2020. Zet de 5G-illustratie weer in elkaar!</p>

    <draggable
      v-if="!won"
      v-model="pieceImages"
      item-key="correctPosition"
      id="puzzleContainer"
      :move="handleMove"
      @end="handleDragEnd"
    >
      <template #item="{ element }">
        <div class="puzzlePieceWrapper">
          <puzzle-piece-component
            :key="element.correctPosition"
            :imageUrl="fiveGImage"
            :position="element.correctPosition"
            class="puzzlePiece"
          />
        </div>
      </template>
    </draggable>

    <div v-if="won" id="puzzleContainer" class="static">
      <div v-for="n in 9" :key="n" class="puzzlePieceWrapper">
        <puzzle-piece-component :imageUrl="fiveGImage" :position="n - 1" class="puzzlePiece" />
      </div>
    </div>

    <p v-if="won" class="result win">✓ Mooi! De puzzel is opgelost. 5G verbindt alles met elkaar.</p>
    <button v-if="won" @click="goToNextTimelineItem" class="continue-button">Doorgaan →</button>
  </div>
</template>

<style scoped>
.slidepuzzle {
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

#puzzleContainer {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-auto-rows: auto;
  gap: 2px;
  margin-top: 2em;
  margin-bottom: 2em;
}

.puzzlePiece {
  max-width: 6em;
  max-height: 6em;
  width: 6em;
  height: 6em;
  border: 1px solid #2a5a2a;
}

.puzzlePieceWrapper {
  display: flex;
  cursor: grab;
}

#puzzleContainer.static .puzzlePieceWrapper {
  cursor: default;
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
  max-width: 460px;
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
