<script setup lang="ts">
import TimelineNav from './views/TimelineNav.vue'
import { useAuth } from './composables/useAuth'

const { isLoggedIn } = useAuth()
</script>

<template>
  <header v-if="isLoggedIn">
    <TimelineNav />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0a0a0f;
  color: #c8ffc8;
  font-family: 'Courier New', Courier, monospace;
  min-height: 100vh;
}

header {
  background: #0d1a0d;
  border-bottom: 1px solid #2a5a2a;
  padding: 0 24px;
}

main {
  min-height: calc(100vh - 56px);
}
</style>