<script setup>
import RoleRow from '@/components/RoleRow.vue'
import { usePagerStore } from '@/stores/pager'
import { usePlayersStore } from '@/stores/players'
import { useRolesStore } from '@/stores/roles'
import { storeToRefs } from 'pinia'
import { Button, useToast } from 'primevue'

const { reloadRoles } = usePlayersStore()

const pager = usePagerStore()
const { toPage } = pager

const toast = useToast()

const rolesStore = useRolesStore()
const { roles } = storeToRefs(rolesStore)
const { getMax, confirm } = rolesStore

function check() {
  const res = confirm()

  if (res.isError) {
    toast.add({
      severity: 'error',
      summary: 'Помилка!',
      detail: res.msg,
      life: 2500,
    })

    return false
  }

  return true
}

function startGame() {
  if (!check()) return 0
}

function toAssign() {
  if (!check()) return 0
  reloadRoles()
  toPage('RolesAssign')
}
</script>

<template>
  <div class="page-roles">
    <div class="mb-3" style="display: flex; align-items: center; gap: 12px">
      <Button
        icon="pi pi-chevron-left"
        severity="secondary"
        aria-label="На головну"
        @click="toPage('GamePlayersSelect')"
      />
      <h1>Вибір ролей</h1>
    </div>
    <div class="mb-3 roles-rows">
      <RoleRow v-for="(r, k) in roles" :key="k" :id="k" :data="r" :max="getMax(k)" />
    </div>
    <Button
      @click="toAssign"
      label="Присвоєння ролей"
      severity="info"
      icon="pi pi-th-large"
      size="large"
      fluid
    />
    <!-- <Button @click="startGame" label="Анонімна гра" icon="pi pi-play" size="large" fluid /> -->
  </div>
</template>

<style scoped>
.page-roles {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
}

.page-roles > * {
  flex-shrink: 0;
}

.roles-rows {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}
</style>
