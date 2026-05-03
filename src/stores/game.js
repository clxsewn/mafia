import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayersStore } from './players'
import { useRolesStore } from './roles'
import {
  Actions,
  actionsTitle,
  GameStatuses,
  getStagesOrder,
  Groups,
  PlayerStatuses,
  playSound,
  Roles,
  stagesData,
} from '@/utils'
import GameFinish from '@/components/GameFinish.vue'

export const useGameStore = defineStore('game', () => {
  const { players, uniqueRoles } = storeToRefs(usePlayersStore())
  const { roles } = storeToRefs(useRolesStore)

  const game = ref({})

  function reset() {
    game.value = structuredClone({
      players: players.value
        .filter((p) => p.isSelected)
        .map((p) => {
          return {
            id: p.id,
            name: p.name,
            emoji: p.emoji,
            color: p.color,
            role: p.role,
            status: PlayerStatuses.Alive,
            isTarget: false,
          }
        }),
      victory: null,
      status: GameStatuses.Pending,
      action: null,
      actionAvailable: false,
      currentStage: 0,
      day: 1,
      targetText: '',
      heals: [],
    })
  }

  const gameStages = computed(() => getStagesOrder(uniqueRoles.value))

  const currentActionComponent = computed(() => {
    return game.value.status === GameStatuses.Finished
      ? GameFinish
      : stagesData.list[gameStages.value[game.value.currentStage]].component
  })

  const alivePlayers = computed(() => {
    return game.value.players.filter(
      (p) => p.status !== PlayerStatuses.Eliminated && p.status !== PlayerStatuses.Ejected,
    )
  })

  const playersCount = computed(() => game.value.players.length)
  const actionTitle = computed(() => actionsTitle[game.value.action])

  function nextStage() {
    if (game.value.status === GameStatuses.Finished) return 0

    const targeted = game.value.players.find((p) => p.isTarget)
    if (targeted) targeted.isTarget = false
    game.value.targetText = ''

    if (game.value.currentStage + 1 < gameStages.value.length) {
      game.value.currentStage++
    } else {
      // new day
      const elim = game.value.players.find((p) => p.status === PlayerStatuses.Eliminating)
      if (elim) elim.status = PlayerStatuses.Eliminated

      game.value.currentStage = 0
      game.value.day++

      if (checkForGameFinish()) return 0
    }

    const { action, notificationSound } = stagesData.list[gameStages.value[game.value.currentStage]]

    game.value.action = action
    game.value.actionAvailable = true

    // check if anyone of current role alive
    if (stagesData.activeStagesOrder.includes(gameStages.value[game.value.currentStage])) {
      const _role = stagesData.list[gameStages.value[game.value.currentStage]].role

      // no players alive
      if (!alivePlayers.value.some((p) => p.role === _role)) {
        game.value.actionAvailable = false
        setTimeout(() => {
          doAction(null)
        }, 7000)
      }
    }

    if (notificationSound) playSound(notificationSound)
  }

  function doAction(targetId) {
    if (targetId !== null) {
      const target = game.value.players.find((p) => p.id === targetId)

      if (
        !target ||
        game.value.action === null ||
        game.value.actionAvailable === false ||
        target.status === PlayerStatuses.Ejected ||
        target.status === PlayerStatuses.Eliminated
      )
        return 0

      if (game.value.action === Actions.Heal) {
        if (game.value.heals.length === 2) {
          if (targetId === game.value.heals[0] && targetId === game.value.heals[1]) {
            return 0
          }

          game.value.heals.shift()
        }

        game.value.heals.push(targetId)
      }

      target.isTarget = true

      switch (game.value.action) {
        case Actions.Eject:
          target.status = PlayerStatuses.Ejected
          checkForGameFinish()
          break

        case Actions.Eliminate:
          target.status = PlayerStatuses.Eliminating
          game.value.targetText = '🔪'
          break

        case Actions.Heal:
          target.status = PlayerStatuses.Alive
          game.value.targetText = '💕'
          break

        case Actions.Find:
          game.value.targetText = target.role === Roles.Mafia ? '💀' : '❤️'
          break
      }

      game.value.actionAvailable = false
    }

    const sound = stagesData.list[gameStages.value[game.value.currentStage]].actionSound
    if (sound) playSound(sound)

    if (game.value.currentStage !== 0) {
      setTimeout(nextStage, 3000)
    }
  }

  function checkForGameFinish() {
    const aliveMafiaCount = game.value.players.reduce((count, p) => {
      return p.status === PlayerStatuses.Alive && p.role == Roles.Mafia ? count + 1 : count
    }, 0)

    if (aliveMafiaCount == 0) {
      return finishGame(Groups.Innocent)
    }

    if (alivePlayers.value.length - aliveMafiaCount <= aliveMafiaCount) {
      return finishGame(Groups.Mafia)
    }

    return false
  }

  function finishGame(victory) {
    game.value.victory = victory
    game.value.status = GameStatuses.Finished

    playSound(victory)

    return true
  }

  return {
    game,
    alivePlayers,
    playersCount,
    checkForGameFinish,
    nextStage,
    doAction,
    currentActionComponent,
    actionTitle,
    reset,
  }
})
