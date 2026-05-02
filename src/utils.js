import Day from './components/Day.vue'
import GameAction from './components/GameAction.vue'
import Night from './components/Night.vue'

export const PlayerStatuses = {
  Alive: 0,
  Eliminated: 1,
  Ejected: 2,
  Eliminating: 3,
}

export const Roles = {
  Innocent: 0,
  Mafia: 1,
  Doc: 2,
  Shreiff: 3,
}

export const rolesData = [
  { key: Roles.Innocent, name: '❤️ Мирний' },
  { key: Roles.Mafia, name: '💀 Мафія' },
  { key: Roles.Doc, name: '🩺 Доктор' },
  { key: Roles.Shreiff, name: '👮 Комісар' },
]

export const Groups = {
  Innocent: 0,
  Mafia: 1,
}

export const GameStatuses = {
  Pending: 0,
  InProgress: 1,
  Finished: 2,
}

export const Stages = {
  Day: 0,
  NightAmbience: 1,
  Mafia: 2,
  Doc: 3,
  Sheriff: 4,
}

export const Actions = {
  Eliminate: 0,
  Heal: 1,
  Find: 2,
  Eject: 3,
}

export const stagesData = {
  list: {
    [Stages.Day]: {
      component: Day,
      action: Actions.Eject,
      role: null,
      notificationSound: 'day',
      actionSound: 'day-action',
    },
    [Stages.NightAmbience]: {
      component: Night,
      action: null,
      role: null,
      notificationSound: 'ambience',
      actionSound: null,
    },
    [Stages.Mafia]: {
      component: GameAction,
      action: Actions.Eliminate,
      role: Roles.Mafia,
      notificationSound: 'mafia',
      actionSound: 'mafia-action',
    },
    [Stages.Doc]: {
      component: GameAction,
      action: Actions.Heal,
      role: Roles.Doc,
      notificationSound: 'doc',
      actionSound: 'doc-action',
    },
    [Stages.Sheriff]: {
      component: GameAction,
      action: Actions.Find,
      role: Roles.Shreiff,
      notificationSound: 'sheriff',
      actionSound: 'sheriff-action',
    },
  },

  activeStagesOrder: [Stages.Mafia, Stages.Doc, Stages.Sheriff],
}

export const actionsTitle = {
  [Actions.Eliminate]: 'Кого усуваємо? 😏',
  [Actions.Heal]: 'Кого лікуємо? ➕',
  [Actions.Find]: 'Кого перевіряємо? 🔍',
}

export function getStagesOrder(uniqueRoles) {
  const _stgs = [Stages.Day, Stages.NightAmbience]

  stagesData.activeStagesOrder.forEach((s) => {
    if (uniqueRoles.includes(stagesData.list[s].role)) {
      _stgs.push(s, Stages.NightAmbience)
    }
  })

  return _stgs
}

export function playSound(sound) {
  switch (sound) {
    case Groups.Innocent:
      _playSound('victory-innocent')
      break

    case Groups.Mafia:
      _playSound('victory-mafia')
      break

    default:
      _playSound(sound)
  }
}

function _playSound(sound) {
  document.getElementById('sound_' + sound).play()
}

export function pauseSound(sound) {
  document.getElementById('sound_' + sound).pause()
}
