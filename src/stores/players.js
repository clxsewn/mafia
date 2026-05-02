import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { useRolesStore } from './roles'

export const usePlayersStore = defineStore('players', () => {
  const localStorageName = 'players'

  const players = ref(
    localStorage.getItem(localStorageName)
      ? JSON.parse(localStorage.getItem(localStorageName))
      : [],
  )

  const selectedPlayersCount = computed(() => {
    return players.value.reduce((acc, p) => (p.isSelected ? acc + 1 : acc), 0)
  })

  const uniqueRoles = computed(() => [
    ...new Set(players.value.filter((p) => p.isSelected).map((p) => p.role)),
  ])

  function add(name, emoji, color) {
    name = name.value.trim()

    if (name === '') {
      return { isError: true, message: "Ви маєте вказати ім'я!" }
    }

    if (players.value.some((p) => p.name === name)) {
      return { isError: true, message: 'Гравець з таким іменем вже є!' }
    }

    players.value.push({ id: uuid(), name, emoji, color, isSelected: false })
    localStorage.setItem('players', JSON.stringify(players.value))

    return { isError: false, message: 'Гравця ' + name + ' створено!' }
  }

  function setSelected(id, selected) {
    const p = players.value.find((p) => p.id === id)
    p.isSelected = selected

    localStorage.setItem('players', JSON.stringify(players.value))
  }

  function deletePlayer(id) {
    players.value.splice(
      players.value.findIndex((p) => p.id === id),
      1,
    )

    localStorage.setItem('players', JSON.stringify(players.value))
  }

  function reloadRoles() {
    players.value.forEach((p) => {
      if (p.isSelected) p.role = null
    })
  }

  function checkRoles() {
    const { roles } = storeToRefs(useRolesStore())

    if (Object.values(players.value).some((p) => p.isSelected && p.role === null)) {
      return {
        isError: true,
        msg: 'Не всі гравці обрали роль',
      }
    }

    const _roles = {}
    Object.entries(roles.value).map(([k, v]) => {
      _roles[k] = v.count
    })

    players.value.forEach((p) => {
      if (p.isSelected) _roles[p.role]--
    })

    if (Object.values(_roles).some((c) => c !== 0)) {
      return {
        isError: true,
        msg: 'Ролі присвоєно з помилкою. Спробуйте знову.',
      }
    }

    return {
      isError: false,
    }
  }

  function confirm() {
    if (selectedPlayersCount.value < 3) {
      return {
        isError: true,
        message: 'Оберіть щонайменше 3-х гравців!',
      }
    }

    return { isError: false }
  }

  return {
    players,
    add,
    setSelected,
    selectedPlayersCount,
    deletePlayer,
    confirm,
    reloadRoles,
    checkRoles,
    uniqueRoles,
  }
})
