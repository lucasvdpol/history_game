<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import AccessForm from './AccessForm.vue'

const router = useRouter()
const { login } = useAuth()
const bootMessage = ref('Wachten op systeem toegang...')
const isConnecting = ref(false)

function startSystem(name: string) {
  isConnecting.value = true
  bootMessage.value = `Welkom, Operator ${name}. Verbinding maken met 1983...`

  setTimeout(() => {
    login(name)
    router.push('/timeline/1983')
  }, 2000)
}
const bootLines = ref([
  "Systeem gestart...",
  "Netwerk gevonden: ARPANET_1983",
  "Verbinding beveiligd ✓",
])
const visibleCount = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    if (visibleCount.value < bootLines.value.length) {
      visibleCount.value++
    } else {
      clearInterval(interval)
    }
  }, 600)
})

const bootComplete = computed(() => visibleCount.value >= bootLines.value.length)


</script>

<template>
  <div class="system-container">
    <div class="boot-lines">
      <template v-for="(line, index) in bootLines" :key="index">
        <p v-if="index < visibleCount" class="boot-line">
          <span class="prompt">&gt;</span> {{ line }}
        </p>
      </template>
      <p class="boot-line status-line">
        <span class="prompt">&gt;</span>
        <span :class="['status-msg', { blink: isConnecting }]">{{ bootMessage }}</span>
        <span class="cursor">█</span>
      </p>
    </div>

    <AccessForm v-if="bootComplete" @loginSubmit="startSystem" />

  </div>
</template>

<style scoped>
.system-container {
  background: #070f07;
  padding: 28px 32px 32px;
  font-family: 'Courier New', Courier, monospace;
  height: 300px;
}

/* subtle scanline overlay */
.system-container::before {
  content: '';
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.18) 3px,
    rgba(0, 0, 0, 0.18) 4px
  );
  border-radius: inherit;
}

.boot-lines {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.boot-line {
  margin: 0;
  font-size: 0.88rem;
  color: #6ac86a;
  letter-spacing: 0.04em;
}

.prompt {
  color: #3dff3d;
  margin-right: 8px;
}

.status-line {
  margin-top: 6px;
  color: #afffaf;
}

.status-msg {
  color: #afffaf;
  margin-left: 8px;
}

.status-msg.blink {
  animation: textPulse 0.8s ease-in-out infinite alternate;
}

.cursor {
  color: #3dff3d;
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes textPulse {
  from { color: #afffaf; }
  to   { color: #3dff3d; }
}
</style>
