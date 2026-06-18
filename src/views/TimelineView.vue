<script setup lang="ts">
import MissionLog from '@/components/MissionLog.vue'
import ArpanetPuzzle from '@/components/1983/ArpanetPuzzle.vue'
import WAP from '@/components/1999/WAP.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WordGuess from '@/components/1983/WordGuess.vue'
import { timelineItems } from '@/data/timelineItems'
import URLBuilder from '@/components/1991/URLBuilder.vue'
import iPhoneQuiz from '@/components/2007/iPhoneQuiz.vue'
const route = useRoute()

const currentYear = computed(() => route.params.id)
const currentItem = computed(() => timelineItems.find(item => item.id === currentYear.value))
</script>

<template>
  <main class="timeline-main">
    <div class="content">
      <div class="year-tag">{{ currentItem?.emoji }} {{ currentYear }}</div>
      <h1 class="year-title">{{ currentItem?.title }}</h1>

      <div class="explanation-block" v-if="currentItem?.explanation">
        <span class="block-label">&gt; ACHTERGROND</span>
        <p class="explanation-text">{{ currentItem.explanation }}</p>
      </div>
    </div>

    <WordGuess v-if="currentYear === '1983'" />
    <URLBuilder v-if="currentYear === '1991'" />
    <WAP v-if="currentYear === '1999'"/>
    <iPhoneQuiz v-if="currentYear === '2007'"/>
  </main>
</template>

<style scoped>
.timeline-main {
  min-height: 100vh;
  background: #0a0a0f;
  color: #c8ffc8;
  font-family: 'Courier New', Courier, monospace;
  padding: 40px 24px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.content {
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.year-tag {
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  color: #5aff5a;
  text-transform: uppercase;
}

.year-title {
  font-size: 1.8rem;
  color: #7fff7f;
  margin: 0;
  text-shadow: 0 0 16px #3aff3a44;
  letter-spacing: 0.04em;
}

.explanation-block {
  background: #0d1a0d;
  border: 1px solid #2a5a2a;
  border-left: 3px solid #3dff3d;
  border-radius: 8px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.block-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: #3dff3d;
  text-transform: uppercase;
}

.explanation-text {
  font-size: 1rem;
  color: #a8d8a8;
  line-height: 1.75;
  margin: 0;
}
</style>