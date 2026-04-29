import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayersStore } from './players'

export const useRolesStore = defineStore('roles', () => {
  const { selectedPlayersCount } = storeToRefs(usePlayersStore())

  const roles = ref({
    innocent: { name: '❤️ Мирний', count: selectedPlayersCount.value - 2 },
    mafia: { name: '💀 Мафія', count: 1 },
    doc: { name: '🩺 Доктор', count: 1 },
    sheriff: { name: '👮 Комісар', count: 0 },
  })

  const totalSelectedRoles = computed(() =>
    Object.values(roles.value).reduce((a, b) => a + b.count, 0),
  )

  function getMax(role) {
    return selectedPlayersCount.value - totalSelectedRoles.value + roles.value[role].count
  }

  function confirm() {
    if (totalSelectedRoles.value !== selectedPlayersCount.value) {
      return { isError: true, msg: 'Недостатньо ролей на всіх гравців!' }
    }

    if (roles.value.mafia.count === 0) {
      return { isError: true, msg: 'Оберіть хочаб одну мафію.' }
    }

    const allInnocentsCount = totalSelectedRoles.value - roles.value.mafia.count
    const docVal = roles.value.doc.count > 0 ? 1 : 0

    if (allInnocentsCount - roles.value.mafia.count + docVal <= 1) {
      return { isError: true, msg: 'Забагато мафій!' }
    }

    return true
  }

  return { roles, totalSelectedRoles, getMax, confirm }
})
