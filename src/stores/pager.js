import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import GamePlayersSelect from '@/pages/GamePlayersSelect.vue'
import NewPlayer from '@/pages/NewPlayer.vue'
import RolesSelect from '@/pages/RolesSelect.vue'
import RolesAssign from '@/pages/RolesAssign.vue'
import Game from '@/pages/Game.vue'

export const usePagerStore = defineStore('pager', () => {
  const pages = {
    GamePlayersSelect: GamePlayersSelect,
    NewPlayer: NewPlayer,
    RolesSelect: RolesSelect,
    RolesAssign: RolesAssign,
    Game: Game,
  }

  const page = ref('GamePlayersSelect')

  const currentPage = computed(() => pages[page.value])

  function toPage(_page) {
    if (_page in pages) {
      page.value = _page
    }
  }

  return { currentPage, toPage }
})
