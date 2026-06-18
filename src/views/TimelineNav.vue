<script setup lang="ts">
import { timelineItems } from '@/data/timelineItems'
import { usePuzzleStore } from '@/stores/puzzle'

const puzzleStore = usePuzzleStore()
</script>

<template>
  <nav class="tech-timeline">
    <div class="connection-line"></div>

    <router-link
      v-for="item in timelineItems"
      :key="item.id"
      :to="`/timeline/${item.id}`"
      class="timeline-node"
    >
      <span class="digital-year">{{ item.year }}</span>
      <span class="puls-circle" :class="{ completed: puzzleStore.completedPuzzles.includes(item.id) }"></span>
      <span class="node-title">{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
.tech-timeline {
  --tech-blue: #5dff5d;
  --tech-glow: rgba(93, 255, 93, 0.45);
  --line-dark: #2a4a2a;
  --text-muted: #5a8a5a;
  --bg-color: #0d1a0d;
  
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 1rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif; 
}

.connection-line {
  position: absolute;
  top: 50%;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background-color: var(--line-dark);
  transform: translateY(-50%);
  z-index: 1;
}

.timeline-node {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 120px;
  gap: 0.75rem;
  cursor: pointer;
  outline: none;
}

.digital-year {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.puls-circle {
  width: 16px;
  height: 16px;
  background-color: var(--line-dark);
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 4px var(--bg-color);
}

.node-title {
  font-size: 0.85rem;
  text-align: center;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.3s ease;
}

.puls-circle.completed {
  background-color: var(--tech-blue);
  box-shadow: 0 0 0 4px var(--bg-color), 0 0 15px var(--tech-glow);
}

.router-link-active .puls-circle {
  background-color: var(--tech-blue);
  box-shadow: 0 0 0 4px var(--bg-color), 0 0 15px var(--tech-glow);
  transform: scale(1.3);
}

.router-link-active .digital-year,
.router-link-active .node-title {
  color: var(--tech-blue);
  font-weight: 700;
  text-shadow: 0 0 8px var(--tech-glow);
}

.timeline-node:hover:not(.router-link-active) .puls-circle {
  background-color: var(--text-muted);
  transform: scale(1.1);
}

.timeline-node:hover:not(.router-link-active) .digital-year {
  color: #a0d0a0;
}
</style>