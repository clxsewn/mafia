<script setup>
import { Actions, PlayerStatuses } from '@/utils'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { useConfirm } from 'primevue'
import { computed } from 'vue'

const confirm = useConfirm()

const { data } = defineProps(['data'])
const { color } = data

const gameStore = useGameStore()
const { doAction } = gameStore
const { game } = storeToRefs(gameStore)

function actionHandler() {
  if (game.value.action === Actions.Eject) {
    confirm.require({
      severity: 'error',
      message: 'Вигнати гравця ' + data.name + ' в результаті голосування?',
      header: 'Вигнання',
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
        doAction(data.id)
      },
    })
  } else {
    doAction(data.id)
  }
}

const disabled = computed(
  () => data.status === PlayerStatuses.Eliminated || data.status === PlayerStatuses.Ejected,
)
</script>

<template>
  <button @click="actionHandler" class="tile" :disabled="disabled">
    <div v-if="disabled" class="status">
      <template v-if="data.status === PlayerStatuses.Ejected">Вигнано</template>
      <template v-else-if="data.status === PlayerStatuses.Eliminated">Усунуто</template>
    </div>
    <Transition name="action">
      <div v-if="data.isTarget" class="action-target" :class="{ ['action-' + game.action]: true }">
        {{ game.targetText }}
      </div>
    </Transition>
    <span class="emoji">{{ data.emoji }}</span>
    <span class="name">{{ data.name }}</span>
  </button>
</template>

<style scoped>
.tile {
  width: 100%;
  align-self: stretch;
  justify-self: stretch;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6px;

  position: relative;

  border-radius: 6px;
  outline: none;
  border: none;
  background-color: v-bind(color);

  overflow: hidden;

  cursor: pointer;
}

.tile:focus {
  outline: 2px solid #fff;
}

.tile:disabled {
  cursor: default;
}

.emoji {
  font-size: 3.8rem;
}

.name {
  max-width: 100%;
  font-size: 1.9rem;

  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-shadow:
    1px 1px 1px #00000088,
    -1px -1px 1px #00000088,
    1px -1px 1px #00000088,
    -1px 1px 1px #00000088;
}

.status,
.action-target {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  -webkit-text-stroke: 1px black;
}

.status {
  background-color: rgba(0, 0, 0, 0.2);
}

.action-target {
  outline-offset: -10px;
  outline-width: 20px;
  outline-style: solid;

  border-radius: 20px;

  font-size: 4rem;
}

/* Elimination */
.action-0 {
  background-color: rgba(255, 0, 0, 0.5);
  outline-color: red;
}

/* Heal */
.action-1 {
  background-color: rgba(58, 246, 101, 0.5);
  outline-color: rgb(58, 246, 101);
}

/* Find */
.action-2 {
  background-color: rgba(255, 230, 0, 0.5);
  outline-color: rgb(255, 230, 0);
}

.action-enter-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease,
    outline-width 0.5s ease 0.5s;
}

.action-enter-from {
  opacity: 0;
  transform: translateX(-100%);
  outline-width: 0;
}

.action-enter-to {
  outline-width: 20px;
  opacity: 1;
  transform: translateX(0);
}
</style>
