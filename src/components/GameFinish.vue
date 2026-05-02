<script setup>
import { useGameStore } from '@/stores/game'
import { usePagerStore } from '@/stores/pager'
import { Groups, pauseSound } from '@/utils'
import { storeToRefs } from 'pinia'
import { Button } from 'primevue'
import { onMounted } from 'vue'

const { game } = storeToRefs(useGameStore())

const { toPage } = usePagerStore()

onMounted(() => {
  pauseSound('ambience')
})
</script>

<template>
  <div class="finish-page">
    <div class="main">
      <template v-if="game.victory === Groups.Innocent">
        <div class="emoji">❤️</div>
        <div class="text">Перемога Мирних</div>
      </template>
      <template v-else-if="game.victory === Groups.Mafia">
        <div class="emoji">💀</div>
        <div class="text">Перемога Мафії</div>
      </template>
    </div>
    <Button
      class="new-game"
      label="Нова гра"
      size="large"
      icon="pi pi-play"
      @click="toPage('GamePlayersSelect')"
    />
  </div>
</template>

<style scoped>
.finish-page {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.main {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  text-align: center;
}

.emoji {
  font-size: 3.2rem;
}

.text {
  font-size: 2.4rem;
}

.new-game {
  flex-shrink: 0;
}
</style>
