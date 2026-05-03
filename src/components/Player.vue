<script setup>
import { Button, Select, useToast } from 'primevue'
import { usePlayersStore } from '@/stores/players'
import { useConfirm } from 'primevue/useconfirm'
import { TransitionGroup } from 'vue'

const {
  data,
  selectionAllow = true,
  selectionRole,
  roles,
} = defineProps(['data', 'selectionAllow', 'selectionRole', 'roles'])
const { color } = data

const players = usePlayersStore()
const { setSelected, deletePlayer } = players

const confirm = useConfirm()
const toast = useToast()

function deleteHandler() {
  confirm.require({
    severity: 'error',
    message: 'Видалити гравця ' + data.name + '?',
    header: 'Видалення',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Ні',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Так',
      severity: 'danger',
    },
    accept: () => {
      deletePlayer(data.id)

      toast.add({
        severity: 'error',
        summary: 'Успіх',
        detail: 'Гравця ' + data.name + ' видалено',
        life: 2500,
      })
    },
  })
}

function onPlayerClick() {
  if (!selectionAllow) return 0
  setSelected(data.id, !data.isSelected)
}
</script>

<template>
  <div class="player" @click.stop="onPlayerClick">
    <div class="about">
      <div class="emoji">{{ data.emoji }}</div>
      <div class="name">{{ data.name }}</div>
    </div>
    <div class="actions">
      <template v-if="selectionRole">
        <Select
          v-if="data.role === null"
          v-model="data.role"
          :options="roles"
          option-label="name"
          option-value="key"
          placeholder="Оберіть роль"
        />
        <Button v-else severity="secondary" icon="pi pi-lock" disabled size="medium" />
      </template>
      <template v-else>
        <!-- <Button @click.stop icon="pi pi-cog" severity="secondary" size="small" /> -->
        <Button @click.stop="deleteHandler" icon="pi pi-trash" severity="danger" size="small" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.player {
  width: 100%;
  padding: 6px 13px 6px 6px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  background-color: rgba(0, 0, 0, 0.15);
  border-left: 6px solid v-bind(color);
  outline: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;

  cursor: pointer;
}

.about {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
}

.emoji {
  width: 50px;
  height: 50px;
  font-size: 2.2rem;
}

.name {
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.actions button {
  flex-shrink: 0;
}
</style>
