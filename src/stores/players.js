import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

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

  function confirm() {
    if (selectedPlayersCount.value < 3) {
      return {
        isError: true,
        message: 'Оберіть щонайменше 3-х гравців!',
      }
    }

    return { isError: false }
  }

  return { players, add, setSelected, selectedPlayersCount, deletePlayer, confirm }
})
