<script setup>
import GameAction from '@/components/GameAction.vue'
import { useGameStore } from '@/stores/game'
import { pauseSound } from '@/utils'
import { storeToRefs } from 'pinia'
import { Button } from 'primevue'
import { onMounted } from 'vue'

const gameStore = useGameStore()
const { nextStage } = gameStore
const { game } = storeToRefs(gameStore)

onMounted(() => {
  pauseSound('ambience')
})
</script>

<template>
  <div class="day">
    <h1>День {{ game.day }}</h1>
    <GameAction />
    <Button
      @click="nextStage"
      class="to-night-btn"
      severity="contrast"
      label="В ніч"
      icon="pi pi-moon"
      fluid
      size="large"
    />
  </div>
</template>

<style scoped>
.day {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.to-night-btn {
  flex-shrink: 0;
}

h1 {
  text-align: center;
}
</style>
