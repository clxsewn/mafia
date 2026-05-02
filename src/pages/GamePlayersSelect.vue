<script setup>
import { Button, useToast } from 'primevue'
import { usePagerStore } from '@/stores/pager'
import { usePlayersStore } from '@/stores/players'
import Player from '@/components/Player.vue'
import { storeToRefs } from 'pinia'
import { TransitionGroup } from 'vue'
import { useRolesStore } from '@/stores/roles'

const pager = usePagerStore()
const { toPage } = pager

const playersStore = usePlayersStore()
const { players, confirm } = playersStore
const { selectedPlayersCount } = storeToRefs(playersStore)

const { rolesToDefault } = useRolesStore()

const toast = useToast()

function toRolesHandler() {
  const res = confirm()

  if (res.isError == true) {
    toast.add({
      severity: 'error',
      summary: 'Помилка!',
      detail: res.message,
      life: 2500,
    })

    return 0
  }

  rolesToDefault()
  toPage('RolesSelect')
}
</script>

<template>
  <div class="player-select-page">
    <h1 class="mb-3">Вибір гравців</h1>
    <div class="page-grow">
      <h2 class="mb-2">Грають ({{ selectedPlayersCount }}):</h2>
      <div class="player-list">
        <TransitionGroup name="p1">
          <template v-for="p in players" :key="p.id">
            <Player v-if="p.isSelected" :data="p" />
          </template>
        </TransitionGroup>
      </div>
      <h2 class="mb-2">Запас:</h2>
      <div class="player-list">
        <TransitionGroup name="p2">
          <template v-for="p in players" :key="p.id">
            <Player v-if="p.isSelected === false" :data="p" />
          </template>
        </TransitionGroup>
      </div>
    </div>

    <Button
      class="mb-2"
      severity="secondary"
      label="Новий гравець"
      size="large"
      icon="pi pi-plus"
      style="width: 100%"
      @click="toPage('NewPlayer')"
    />
    <Button
      severity="info"
      label="Перейти до вибору ролей"
      size="large"
      icon="pi pi-arrow-right"
      style="width: 100%"
      @click="toRolesHandler"
    />
  </div>
</template>

<style scoped>
.player-select-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.player-select-page > * {
  flex-shrink: 0;
}

.player-select-page .page-grow {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
}

.player-list {
  position: relative;
}

.p1-leave-active {
  position: absolute;
  transition: all 0.2s ease;
}

.p1-move,
.p1-enter-active {
  transition: all 0.2s ease 0.1s;
}

.p1-enter-from,
.p1-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.p2-leave-active {
  position: absolute;
  transition: all 0.2s ease;
}

.p2-move,
.p2-enter-active {
  transition: all 0.2s ease 0.1s;
}

.p2-enter-from,
.p2-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
