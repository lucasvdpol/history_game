<script setup lang="ts">
import { timelineItems } from '@/data/timelineItems.js';
import SystemBoot from '../components/home/SystemBoot.vue'
</script>

<template>
  <main class="home-screen">
    <section class="intro-section">
      <div class="intro-card">
        <span class="intro-tag">📡 Tijdreis: 1983 – 2007</span>
        <h2 class="intro-title">Van nul naar altijd online</h2>
        <p class="intro-text">
          Stel je voor: geen YouTube, geen WhatsApp, geen Google Maps. Zo was het vroeger!
          In de jaren '80 begon alles met een rare pieptoon via de telefoonlijn.
          Rond 2007 paste ineens het hele internet in je broekzak.
        </p>
      </div>

      <section class="terminal-section">
      <div class="terminal-wrapper">
        <div class="terminal-topbar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">GLOBAL NETWORK TERMINAL v1.0</span>
        </div>
        <SystemBoot />
      </div>
    </section>

      <div class="fact-grid">
        <div class="fact-card" v-for="item in timelineItems">
          <div class="fact-icon">{{ item.emoji }}</div>
          <div class="fact-year">{{ item.year }}</div>
          <div class="fact-label">{{ item.title }}</div>
          <p class="fact-desc">{{ item.description }}</p>
        </div>
       
      </div>
    </section>

    
  </main>
</template>

<style scoped>
.home-screen {
  min-height: 100vh;
  background: #0a0a0f;
  color: #c8ffc8;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 40px 24px 60px;
}

/* ── Intro section ── */
.intro-section {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.intro-card {
  background: linear-gradient(135deg, #0d1f0d 0%, #0a1a1f 100%);
  border: 1px solid #2a5a2a;
  border-radius: 12px;
  padding: 32px 36px;
  text-align: center;
}

.intro-tag {
  display: inline-block;
  background: #1a3a1a;
  border: 1px solid #3a7a3a;
  color: #7fff7f;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.intro-title {
  font-size: 2rem;
  color: #7fff7f;
  margin: 0 0 16px;
  text-shadow: 0 0 18px #3aff3a55;
  letter-spacing: 0.04em;
}

.intro-text {
  font-size: 1.05rem;
  color: #a0dca0;
  line-height: 1.7;
  margin: 0;
  max-width: 640px;
  margin: 0 auto;
}

/* ── Fact grid ── */
.fact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 600px) {
  .fact-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .fact-card {
    grid-column: span 2;
  }

  /* Center de laatste 2 items in de onderste rij */
  .fact-card:nth-child(4) {
    grid-column: 2 / 4;
  }

  .fact-card:nth-child(5) {
    grid-column: 4 / 6;
  }
}

.fact-card {
  background: #0d1a0d;
  border: 1px solid #2a4a2a;
  border-radius: 10px;
  padding: 20px 16px 24px;
  text-align: center;
  transition: border-color 0.2s, transform 0.2s;
  cursor: default;
  height: 280px
}

.fact-card:hover {
  border-color: #5aff5a;
  transform: translateY(-3px);
}

.fact-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.fact-year {
  font-size: 1.4rem;
  font-weight: bold;
  color: #5aff5a;
  text-shadow: 0 0 10px #5aff5a88;
  margin-bottom: 4px;
}

.fact-label {
  font-size: 0.8rem;
  color: #7fff7f;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.fact-desc {
  font-size: 0.82rem;
  color: #7aa87a;
  line-height: 1.55;
  margin: 0;
}

/* ── Terminal section ── */
.terminal-section {
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.terminal-wrapper {
  border: 2px solid #3a7a3a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 40px #1aff1a22, 0 0 80px #1aff1a0a;
}

.terminal-topbar {
  background: #1a2e1a;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #2a5a2a;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.dot.red    { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green  { background: #28c840; }

.terminal-title {
  margin-left: 10px;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: #5aaa5a;
  text-transform: uppercase;
}
</style>
