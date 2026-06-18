<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  imageUrl: string
  position: number
}>()

const backgroundPosition = computed(() => {
  const col = props.position % 3
  const row = Math.floor(props.position / 3)
  return `${col * 50}% ${row * 50}%`
})
</script>

<template>
  <div
    class="puzzle-piece-img"
    :style="{
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition,
    }"
  ></div>
</template>

<style scoped>
.puzzle-piece-img {
  width: 100%;
  height: 100%;
  background-size: 300% 300%;
  background-repeat: no-repeat;
}
</style>
