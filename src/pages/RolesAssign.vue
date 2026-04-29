<script setup>
import { usePagerStore } from '@/stores/pager'
import { Button } from 'primevue'

const pager = usePagerStore()
const { toPage } = pager
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
  </div>
</template>

<stlye scoped></stlye>
