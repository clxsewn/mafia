import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayersStore } from './players'
import { useRolesStore } from './roles'

export const useGameStore = defineStore('game', () => {
  const { players, selectedPlayersCount } = storeToRefs(usePlayersStore())
  const { roles } = storeToRefs(useRolesStore)

  const game = ref({
    game: {},
  })

  return { loadPlayers }
})
