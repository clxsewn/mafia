<script setup>
import Player from '@/components/Player.vue'
import { usePagerStore } from '@/stores/pager'
import { usePlayersStore } from '@/stores/players'
import { useRolesStore } from '@/stores/roles'
import { Button, useToast } from 'primevue'

const toast = useToast()
const { toPage } = usePagerStore()
const { players, reloadRoles, checkRoles } = usePlayersStore()
const { getAvailableRoles } = useRolesStore()

function startGame() {
  const res = checkRoles()

  if (res.isError) {
    toast.add({
      severity: 'error',
      summary: 'Помилка!',
      detail: res.msg,
      life: 2500,
    })

    return 0
  }

  toPage('Game')
}
</script>

<template>
  <div class="roles-assign-page">
    <div class="mb-3" style="display: flex; align-items: center; gap: 12px">
      <Button
        icon="pi pi-chevron-left"
        severity="secondary"
        aria-label="На головну"
        @click="toPage('RolesSelect')"
      ></Button>
      <h1>Присвоєння ролей</h1>
    </div>
    <div class="assign">
      <template v-for="p in players" :key="p.id">
        <Player
          v-if="p.isSelected"
          :data="p"
          :selectionAllow="false"
          :selectionRole="true"
          :roles="getAvailableRoles()"
        />
      </template>
    </div>
    <Button
      @click="reloadRoles"
      label="Скинути ролі"
      severity="secondary"
      icon="pi pi-refresh"
      size="large"
      fluid
      class="mb-2"
    />
    <Button @click="startGame" label="Розпочати гру" icon="pi pi-play" size="large" fluid />
  </div>
</template>

<style scoped>
.roles-assign-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.assign {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
}
</style>
