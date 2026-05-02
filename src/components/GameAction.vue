<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import PlayerTile from './PlayerTile.vue'

const gameStore = useGameStore()
const { game, playersCount, actionTitle } = storeToRefs(gameStore)
</script>

<template>
  <div class="action">
    <h1>{{ actionTitle }}</h1>
    <div class="tiles" :class="'tiles-' + playersCount">
      <PlayerTile v-for="p in game.players" :data="p" />
    </div>
  </div>
</template>

<style scoped>
.action {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 4px;
}

.tiles {
  flex-grow: 1;
  display: grid;
  gap: 8px;
}

.tiles-3 {
  grid-template: 1fr 1fr 1fr / 1fr;
}

.tiles-4 {
  grid-template: 1fr 1fr 1fr 1fr / 1fr;
}

.tiles-5 {
  grid-template: repeat(8, 1fr) / 1fr 1fr;
}

.tiles-5 > :nth-child(1) {
  grid-area: 1 / 1 / 4 / 2;
}

.tiles-5 > :nth-child(2) {
  grid-area: 1 / 2 / 4 / 3;
}

.tiles-5 > :nth-child(3) {
  grid-area: 4 / 1 / 7 / 2;
}

.tiles-5 > :nth-child(4) {
  grid-area: 4 / 2 / 7 / 3;
}

.tiles-5 > :nth-child(5) {
  grid-area: 7 / 1 / 9 / 3;
}

.tiles-6 {
  grid-template: 1fr 1fr 1fr / 1fr 1fr;
}

.tiles-7 > :last-child {
  grid-column: 1 / 3;
}

.tiles-7 {
  grid-template: repeat(4, 1fr) / 1fr 1fr;
}

.tiles-8 {
  grid-template: 1fr 1fr 1fr 1fr / 1fr 1fr;
}
</style>
