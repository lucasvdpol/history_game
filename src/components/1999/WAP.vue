<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, ref } from 'vue'

const puzzleItems = ref(["<card title='Nieuws'>", "<p>Klik hier</p>", "<a href='...'>", "<card title='Menu'>"])
const correctOrder = ["<card title='Menu'>", "<card title='Nieuws'>", "<p>Klik hier</p>", "<a href='...'>"]
const correct = computed(() => puzzleItems.value.join() === correctOrder.join())

const drag = ref(false)

</script>

<template>
  <div>
    <draggable v-model="puzzleItems" group="people" item-key="name" @start="drag=true" @end="drag=false">
    <template #item="{ element }">
      <div>{{ element }}</div>
    </template>
  </draggable>
  </div>
  <div v-if="correct">Correct!</div>
</template>

<style></style>