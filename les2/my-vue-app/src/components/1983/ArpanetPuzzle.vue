<script setup lang="ts">
import { ref, computed } from 'vue'

const nodes = ['UCLA', 'SRI', 'UCSB', 'UTAH']
const correctOrder = ['UCLA', 'SRI', 'UCSB', 'UTAH']

const selected = ref<string[]>([])
const solved = ref(false)

function selectNode(node: string){
    if(!selected.value.includes(node)){
        selected.value.push(node)
    }
}

function resetNodes(){
    selected.value = []
}

const isCorrect = computed(() =>
  selected.value.join(',') === correctOrder.join(',')
    && selected.value.length === correctOrder.length
)


</script>

<template>
  <div>
    <p>Klik de ARPANET-nodes in historische volgorde:</p>

    <div>
      <button
        v-for="node in nodes"
        :key="node"
        @click="selectNode(node)"
        :disabled="selected.includes(node)"
      >
        {{ node }}
      </button>
    </div>

    <p>Jouw volgorde: {{ selected.join(' → ') }}</p>

    <p v-if="isCorrect">✓ Verbinding hersteld!</p>
    <p v-else-if="selected.length === nodes.length">✗ Verkeerde volgorde.</p>

    <button @click="resetNodes">Reset</button>
  </div>
</template>


<style></style>