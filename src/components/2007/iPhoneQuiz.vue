<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { usePuzzleStore } from '@/stores/puzzle'
import { useRouter } from 'vue-router'

const router = useRouter()
const puzzleStore = usePuzzleStore()

const questions = [
  {
    question: "Wie liet de allereerste iPhone aan de wereld zien?",
    answer1: "Bill Gates",
    answer2: "Steve Jobs",
    answer3: "Elon Musk",
    correctAnswer: "answer2"
  },
  {
    question: "Wat was er zo bijzonder aan de eerste iPhone?",
    answer1: "Het had bijna geen knopjes, maar een groot touchscreen.",
    answer2: "Je kon het scherm opvouwen.",
    answer3: "Het was de eerste telefoon met een zaklamp.",
    correctAnswer: "answer1"
  },
  {
    question: "In welk jaar werd de allereerste iPhone gepresenteerd?",
    answer1: "1999",
    answer2: "2007",
    answer3: "2015",
    correctAnswer: "answer2"
  },
  {
    question: "Wat kon je allemaal doen met deze eerste slimme telefoon?",
    answer1: "Alleen maar bellen en sms'en.",
    answer2: "Alleen spelletjes spelen.",
    answer3: "Bellen, muziek luisteren én websites bekijken.",
    correctAnswer: "answer3"
  }
];

const currentQuestion = ref(0)
const correctQuestions = ref(0)
const wrongQuestions = ref(0)
const isFinished = ref(false)
const lastAnswerCorrect = ref<boolean | null>(null)
const isCompleted = computed(() => puzzleStore.completedPuzzles.includes("2007"))
const isCorrect = computed(() => puzzleStore.correctPuzzleIds.includes("2007"))
const isWrong = computed (() => puzzleStore.wrongPuzzleIds.includes("2007"))

const activeQuestion = computed(() => questions[currentQuestion.value]!)
const won = computed(() => isFinished.value && correctQuestions.value >= 3 || puzzleStore.correctPuzzleIds.includes('2007'))
const lost = computed(() => isFinished.value && correctQuestions.value < 3 || puzzleStore.wrongPuzzleIds.includes('2007'))

watch(won, (val) => { if (val) puzzleStore.completePuzzle('2007', true) })
watch(lost, (val) => { if (val) puzzleStore.completePuzzle('2007', false) })

function guessAnswer(key: string) {
  const isCorrect = activeQuestion.value.correctAnswer === key
  lastAnswerCorrect.value = isCorrect

  if (isCorrect) correctQuestions.value++
  else wrongQuestions.value++

  setTimeout(() => {
    lastAnswerCorrect.value = null
    if (currentQuestion.value < questions.length - 1) {
      currentQuestion.value++
    } else {
      isFinished.value = true
    }
  }, 600)
}

function goToNextTimelineItem() {
  router.push('/timeline/2020')
}
</script>

<template>
  <div class="iphonequiz">
    <p class="intro">Het is 2007. Test jouw kennis over de iPhone!</p>

    <div v-if="!isFinished && !isCompleted" class="quiz-container">
      <div class="progress-bar">
        <span class="progress-label">&gt; VRAAG {{ currentQuestion + 1 }} / {{ questions.length }}</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
        </div>
      </div>
      <div v-if="!isCompleted">CORRECT: {{ correctQuestions }} / {{ questions.length }}</div>

      <div class="question-block" :class="{ correct: lastAnswerCorrect === true, wrong: lastAnswerCorrect === false }">
        <span class="block-label">&gt; VRAAG</span>
        <p class="question-text">{{ activeQuestion.question }}</p>
      </div>

      <div class="answers">
        <button
          v-for="(key, index) in ['answer1', 'answer2', 'answer3']"
          :key="key"
          class="answer-btn"
          :disabled="lastAnswerCorrect !== null"
          @click="guessAnswer(key)"
        >
          <span class="answer-letter">{{ ['A', 'B', 'C'][index] }}</span>
          <span class="answer-text">{{ activeQuestion[key as keyof typeof activeQuestion] }}</span>
        </button>
      </div>
    </div>

    <div v-if="isFinished || isCompleted">
      <p v-if="won || isCorrect" class="result win">✓ Goed gedaan! Je hebt de puzzel gehaald. Ga door naar de volgende.</p>
      <p v-if="lost || isWrong" class="result lose">✗ Helaas. Je hebt de puzzel niet gehaald. Ga door naar de volgende!</p>
      <button @click="goToNextTimelineItem" class="continue-button">Doorgaan →</button>
    </div>
  </div>
</template>

<style scoped>
.iphonequiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  font-family: 'Courier New', Courier, monospace;
  color: #c8ffc8;
  max-width: 520px;
  margin: 0 auto;
}

.intro {
  color: #3dff3d;
  letter-spacing: 0.05em;
  margin-bottom: 1.75rem;
  font-size: 0.95rem;
}

.quiz-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.progress-bar {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: #3dff3d;
  text-transform: uppercase;
}

.progress-track {
  height: 4px;
  background: #1a3a1a;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3dff3d;
  box-shadow: 0 0 8px #3dff3d88;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.question-block {
  background: #050d05;
  border: 1px solid #2a5a2a;
  border-left: 3px solid #3dff3d;
  border-radius: 6px;
  padding: 20px 24px;
  width: 100%;
  max-width: 460px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.question-block.correct {
  border-left-color: #3dff3d;
  box-shadow: 0 0 20px #3dff3d22;
}

.question-block.wrong {
  border-left-color: #ff5555;
  box-shadow: 0 0 20px #ff555522;
}

.block-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: #3dff3d;
  text-transform: uppercase;
}

.question-text {
  font-size: 1rem;
  color: #c8ffc8;
  line-height: 1.65;
  margin: 0;
}

.answers {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.answer-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(160deg, #152815 0%, #0a1a0a 100%);
  border: 1px solid #3a7a3a;
  border-bottom: 2px solid #225522;
  color: #7fff7f;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  padding: 12px 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.12s ease;
  letter-spacing: 0.03em;
  text-align: left;
  width: 100%;
  position: relative;
}

.answer-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
  pointer-events: none;
}

.answer-btn:hover:not(:disabled) {
  border-color: #5dff5d;
  border-bottom-color: #3dff3d;
  color: #3dff3d;
  box-shadow: 0 0 12px #3dff3d44;
  transform: translateY(-1px);
}

.answer-btn:active:not(:disabled) {
  transform: translateY(1px);
  border-bottom-width: 1px;
  box-shadow: none;
}

.answer-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.answer-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 1px solid #3dff3d;
  border-radius: 3px;
  font-size: 0.75rem;
  color: #3dff3d;
  flex-shrink: 0;
}

.answer-text {
  flex: 1;
}

.result {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  line-height: 1.65;
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid;
  border-left: 3px solid;
  width: 100%;
  max-width: 460px;
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
