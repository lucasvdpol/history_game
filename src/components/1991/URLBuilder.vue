<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const parts = [ '/hypertext/WWW/', 'info.cern.ch','http://',  'TheProject.html']
const correctOrder = ['http://', 'info.cern.ch', '/hypertext/WWW/', 'TheProject.html']

const guessed = ref<string[]>([])

const maxWrong = 3;
const wrongGuesses = ref(0)

const won = computed(() => guessed.value.join('') === correctOrder.join(''))
const lost = computed(() => wrongGuesses.value >= maxWrong)

const showRetryButton = computed(() => guessed.value.length > 0)

function add(guess: string) {
  if (!guessed.value.includes(guess)) {
    guessed.value.push(guess)

    if (guessed.value.length === 4) {
      if (!won.value) {
        wrongGuesses.value += 1
        guessed.value = [] 
      }
    }
  }
}

function retry(){
    guessed.value = []
}

function goToNextTimelineItem(){
    router.push("/timeline/1999")
}


</script>

<template>
  <div class="urlbuilder">
    <p class="intro">🌐 Het is 1991. Bouw de eerste URL naar het world wide web!</p>
    <p class="counter">Foute pogingen: <span :class="{ danger: wrongGuesses >= maxWrong - 1 }">{{ wrongGuesses }}</span> / {{ maxWrong }}</p>

    <div class="url-display">
      <span class="url-label">&gt; ADRES:</span>
      <span class="url-value" :class="{ empty: guessed.length === 0 }">
        {{ guessed.length > 0 ? guessed.join('') : '...' }}
      </span>
      <span class="cursor">█</span>
    </div>

    <div v-if="!won && !lost" class="parts-section">
      <span class="parts-label">&gt; KIES EEN DEEL:</span>
      <div class="parts">
        <button
          v-for="part in parts"
          :key="part"
          class="key"
          @click="add(part)"
          :disabled="guessed.includes(part)"
        >
          {{ part }}
        </button>
      </div>
    </div>

    <button v-if="!won && !lost && guessed.length > 0" @click="retry" class="retry-button">
      &gt; Opnieuw proberen
    </button>

    <p v-if="won" class="result win">✓ Verbinding geslaagd! De eerste website is bereikbaar.</p>
    <p v-if="lost" class="result lose">✗ Verbinding verbroken. Te veel foute pogingen.</p>
    <button @click="goToNextTimelineItem" class="continue-button" v-if="won || lost">Doorgaan →</button>
  </div>
</template>

<style scoped>
.urlbuilder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  font-family: 'Courier New', Courier, monospace;
  color: #c8ffc8;
  max-width: 580px;
  margin: 0 auto;
}

.intro {
  color: #5aff5a;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  text-align: center;
  width: 100%;
  max-width: 520px;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #1a3a1a;
}

.counter {
  color: #7fff7f;
  font-size: 0.85rem;
  margin-bottom: 1.75rem;
  letter-spacing: 0.05em;
}

.counter .danger {
  color: #ff5555;
  text-shadow: 0 0 8px #ff555566;
}

.url-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #050d05;
  border: 1px solid #2a5a2a;
  border-left: 3px solid #3dff3d;
  border-radius: 6px;
  padding: 16px 20px;
  width: 100%;
  max-width: 520px;
  margin-bottom: 2rem;
  min-height: 56px;
  box-sizing: border-box;
  box-shadow: inset 0 0 20px #0a150a, 0 0 1px #3dff3d22;
  position: relative;
  overflow: hidden;
}

.url-display::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 255, 0, 0.012) 3px,
    rgba(0, 255, 0, 0.012) 4px
  );
  pointer-events: none;
}

.url-label {
  color: #3dff3d;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
}

.url-value {
  color: #3dff3d;
  font-size: 1rem;
  text-shadow: 0 0 10px #3dff3d88;
  word-break: break-all;
  flex: 1;
  letter-spacing: 0.02em;
}

.url-value.empty {
  color: #1a3a1a;
  text-shadow: none;
  letter-spacing: 0.3em;
}

.cursor {
  color: #3dff3d;
  animation: blink 1s step-end infinite;
  flex-shrink: 0;
  text-shadow: 0 0 6px #3dff3d;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.parts-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 520px;
  margin-bottom: 1.5rem;
}

.parts-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: #3dff3d;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.parts {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
}

.key {
  background: linear-gradient(160deg, #152815 0%, #0a1a0a 100%);
  border: 1px solid #3a7a3a;
  border-bottom: 2px solid #225522;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  padding: 10px 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.12s ease;
  letter-spacing: 0.03em;
  position: relative;
}

.key::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
  pointer-events: none;
}

.key:hover:not(:disabled) {
  border-color: #5dff5d;
  border-bottom-color: #3dff3d;
  color: #3dff3d;
  box-shadow: 0 0 12px #3dff3d44;
  transform: translateY(-1px);
}

.key:active:not(:disabled) {
  transform: translateY(1px);
  border-bottom-width: 1px;
  box-shadow: none;
}

.key:disabled {
  opacity: 0.18;
  cursor: not-allowed;
  border-color: #1a3a1a;
  border-bottom-color: #152815;
}

.retry-button {
  background: transparent;
  border: 1px solid #3a5a3a;
  color: #5aff5a;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 1rem;
  letter-spacing: 0.08em;
}

.retry-button:hover {
  border-color: #5dff5d;
  color: #3dff3d;
  box-shadow: 0 0 8px #3dff3d33;
}

.result {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  text-align: left;
  line-height: 1.65;
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid;
  border-left: 3px solid;
  width: 100%;
  max-width: 520px;
  box-sizing: border-box;
}

.win {
  color: #3dff3d;
  text-shadow: 0 0 10px #3dff3d88;
  border-color: #2a5a2a;
  border-left-color: #3dff3d;
  background: #050d05;
  box-shadow: 0 0 20px #3dff3d0d;
}

.lose {
  color: #ff7070;
  text-shadow: 0 0 10px #ff555566;
  border-color: #5a2a2a;
  border-left-color: #ff5555;
  background: #0d0505;
  box-shadow: 0 0 20px #ff55550d;
}

.continue-button {
  background: linear-gradient(135deg, #1a3d1a, #0d2a0d);
  border: 1px solid #3a8a3a;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  padding: 12px 32px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-top: 1.5rem;
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.continue-button:hover {
  border-color: #5dff5d;
  color: #3dff3d;
  box-shadow: 0 0 14px #3dff3d44;
  transform: translateX(2px);
}
</style>