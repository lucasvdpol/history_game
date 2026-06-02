<script setup lang="ts">
import { ref } from 'vue'

const operatorName = ref('')
const emit = defineEmits(['loginSubmit'])

function handleLogin() {
  if (operatorName.value.trim() !== '') {
    emit('loginSubmit', operatorName.value)
  }
}
</script>

<template>
  <div class="terminal-form">
    <label class="form-label" for="operator-input">
      <span class="prompt">&gt;</span> Identificeer jezelf, operator:
    </label>
    <div class="input-row">
      <span class="input-prefix">NAME://</span>
      <input
        id="operator-input"
        type="text"
        v-model="operatorName"
        @keyup.enter="handleLogin"
        placeholder="jouw naam..."
        autocomplete="off"
      />
    </div>
    <button class="connect-btn" @click="handleLogin" :disabled="operatorName.trim() === ''">
      <span class="btn-icon"></span> Maak verbinding
    </button>
  </div>
</template>

<style scoped>
.terminal-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: 'Courier New', Courier, monospace;
}

.form-label {
  font-size: 0.9rem;
  color: #afffaf;
  letter-spacing: 0.05em;
  display: block;
}

.prompt {
  color: #3dff3d;
  margin-right: 6px;
}

.input-row {
  display: flex;
  align-items: center;
  border: 1px solid #3a7a3a;
  border-radius: 6px;
  background: #050e05;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-row:focus-within {
  border-color: #5dff5d;
  box-shadow: 0 0 10px #5dff5d33;
}

.input-prefix {
  padding: 10px 10px 10px 14px;
  color: #3dff3d;
  font-size: 0.85rem;
  user-select: none;
  letter-spacing: 0.05em;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #c8ffc8;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.92rem;
  padding: 10px 14px 10px 4px;
  caret-color: #3dff3d;
}

input::placeholder {
  color: #3a5a3a;
}

.connect-btn {
  align-self: flex-start;
  background: linear-gradient(135deg, #1a3d1a, #0d2a0d);
  border: 1px solid #3a8a3a;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  padding: 10px 22px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.connect-btn:not(:disabled):hover {
  background: linear-gradient(135deg, #2a5d2a, #1a4a1a);
  border-color: #5dff5d;
  color: #c8ffc8;
  box-shadow: 0 0 14px #3dff3d44;
}

.connect-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1rem;
}
</style>
