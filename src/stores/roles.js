import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayersStore } from './players'
import { Roles, rolesData } from '@/utils'

export const useRolesStore = defineStore('roles', () => {
  const { selectedPlayersCount } = storeToRefs(usePlayersStore())

  const roles = ref(
    rolesData.map((r) => {
      r.count = 0
      return r
    }),
  )

  const totalSelectedRoles = computed(() => roles.value.reduce((a, b) => a + b.count, 0))

  function rolesToDefault() {
    _role(Roles.Innocent).count = selectedPlayersCount.value - 2
    _role(Roles.Mafia).count = 1
    _role(Roles.Doc).count = 1
    _role(Roles.Shreiff).count = 0
  }

  rolesToDefault()

  function getMax(role) {
    return selectedPlayersCount.value - totalSelectedRoles.value + _role(role).count
  }

  function _role(role) {
    return roles.value.find((r) => r.key === role)
  }

  function getAvailableRoles() {
    return roles.value
      .filter((r) => r.count > 0)
      .map((r) => {
        return { key: r.key, name: r.name }
      })
  }

  function confirm() {
    if (totalSelectedRoles.value !== selectedPlayersCount.value) {
      return { isError: true, msg: 'Недостатньо ролей на всіх гравців!' }
    }

    if (_role(Roles.Mafia).count === 0) {
      return { isError: true, msg: 'Оберіть хочаб одну мафію.' }
    }

    const allInnocentsCount = totalSelectedRoles.value - _role(Roles.Mafia).count
    const docVal = _role(Roles.Doc).count > 0 ? 1 : 0

    if (allInnocentsCount - _role(Roles.Mafia).count + docVal <= 1) {
      return { isError: true, msg: 'Забагато мафій!' }
    }

    return { isError: false }
  }

  return { roles, totalSelectedRoles, getMax, confirm, rolesToDefault, getAvailableRoles }
})
