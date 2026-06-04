<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, ref } from 'vue'

const puzzleItems = ref(["<card title='Nieuws'>", "<p>Klik hier</p>", "<a href='...'>", "<card title='Menu'>"])
const correctOrder = ["<card title='Menu'>", "<card title='Nieuws'>", "<p>Klik hier</p>", "<a href='...'>"]
const correct = computed(() => puzzleItems.value.join() === correctOrder.join())

const drag = ref(false)

</script>

<template>
  <div class="puzzle-wrapper">
    <p class="instruction">Sleep de blokken in de juiste volgorde</p>
    <draggable v-model="puzzleItems" group="people" item-key="name" @start="drag=true" @end="drag=false">
      <template #item="{ element }">
        <div class="code-block">{{ element }}</div>
      </template>
    </draggable>
    <div v-if="correct" class="success">✓ Correct!</div>
  </div>
</template>

<style scoped>
.puzzle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  font-family: monospace;
}

.instruction {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.code-block {
  background: #1e1e1e;
  color: #ce9178;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 10px 16px;
  margin-bottom: 8px;
  cursor: grab;
  width: 280px;
  user-select: none;
  transition: background 0.15s;
}

.code-block:hover {
  background: #2a2a2a;
  border-color: #888;
}

.success {
  margin-top: 12px;
  color: #4caf50;
  font-weight: bold;
  font-size: 18px;
}
</style>