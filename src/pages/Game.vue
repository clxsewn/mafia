<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { currentActionComponent } = storeToRefs(gameStore)
const { reset } = gameStore

reset()
</script>

<template>
  <div class="game-page">
    <Transition name="fade" mode="out-in">
      <component :is="currentActionComponent"></component>
    </Transition>
  </div>
</template>

<style scoped>
.game-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
