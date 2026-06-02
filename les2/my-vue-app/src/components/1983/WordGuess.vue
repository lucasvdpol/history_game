<script setup lang="ts">
import { ref, computed } from 'vue'
const word = 'PACMAN'
const guessed = ref<string[]>([])
const maxWrong = 5
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const wrongGuesses = computed(() =>
  guessed.value.filter(l => !word.includes(l)).length
)

const displayWord = computed(() =>
  word.split('').map(l => guessed.value.includes(l) ? l : '_').join(' ')
)

const won = computed(() => word.split('').every(l => guessed.value.includes(l)))
const lost = computed(() => wrongGuesses.value >= maxWrong)

function guess(letter: string) {
  if (!guessed.value.includes(letter)) {
    guessed.value.push(letter)
  }
}



</script>

<template>
  <div>
    <p>🖥️ Het jaar is 1983. Raad het geheime woord!</p>
    <p>Foute gokken: {{ wrongGuesses }} / {{ maxWrong }}</p>

    <p class="word">{{ displayWord }}</p>

    <div v-if="!won && !lost">
      <button
        v-for="letter in letters"
        :key="letter"
        @click="guess(letter)"
        :disabled="guessed.includes(letter)"
      >
        {{ letter }}
      </button>
    </div>

    <p v-if="won">🎉 Gewonnen! Het woord was {{ word }}!</p>
    <p v-if="lost">💀 Verbinding verbroken... Het woord was {{ word }}.</p>
  </div>
</template>


<style></style>