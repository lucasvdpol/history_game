<script setup lang="ts">
import { ref } from 'vue'

const newMessage = ref('')
const messages = ref<string[]>([])

function addMessage() {
  if (newMessage.value.trim() !== '') {
    messages.value.push(newMessage.value)
    newMessage.value = ''
  }
}

function removeMessage(index: number) {
    messages.value.splice(index, 1)
}



</script>

<template>
  <div>
    <p>Aantal berichten: {{ messages.length }}</p>

    <input v-model="newMessage" placeholder="Typ een bericht..." />
    <button @click="addMessage">Voeg toe</button>

    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
        <button @click="removeMessage(index)">✕</button>
    </li>

    </ul>
  </div>
</template>


<style></style>