<script setup lang="ts">
import MissionLog from '@/components/MissionLog.vue'
import ArpanetPuzzle from '@/components/1983/ArpanetPuzzle.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WordGuess from '@/components/1983/WordGuess.vue'
import { timelineItems } from '@/data/timelineItems'

const route = useRoute()

const currentYear = computed(() => route.params.id)
const currentItem = computed(() => timelineItems.find(item => item.id === currentYear.value))
</script>

<template>
  <main>
    <div class="content">
    <h1>Tijdperk: {{ currentYear }}</h1>
    <p>{{ currentItem?.description }}</p>
  </div>
  <WordGuess v-if="currentYear === '1983'" />
  <!-- <MissionLog/> -->
  </main>
</template>

<style scoped>
.content {
  padding: 2rem;
  font-family: sans-serif;
}
</style>