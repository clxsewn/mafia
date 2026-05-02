<script setup>
import { ref } from 'vue'
import { InputText, FloatLabel, Button, ColorPicker } from 'primevue'
import { usePlayersStore } from '@/stores/players'
import { usePagerStore } from '@/stores/pager'
import { useToast } from 'primevue'
import Avatar from '@/components/Avatar.vue'

const pager = usePagerStore()
const { toPage } = pager

const store = usePlayersStore()
const { add } = store

// prettier-ignore
const faceEmojis = [
  "😀","😃","😄","😁","😆","😅","😂","🤣","🥲","☺️",
  "😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗",
  "😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓",
  "😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕",
  "🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤",
  "😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰",
  "😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑",
  "😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤",
  "😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕"
];

const toast = useToast()

const name = ref('')
const color = ref('81b29a')
const emoji = ref(faceEmojis[10])

function submitHandler() {
  const { isError, message } = add(name, emoji, '#' + color.value)

  toast.add({
    severity: isError ? 'error' : 'success',
    summary: isError ? 'Помилка!' : 'Успіх!',
    detail: message,
    life: 2500,
  })

  if (!isError) toPage('GamePlayersSelect')
}
</script>

<template>
  <div class="new-player-page">
    <div class="mb-3" style="display: flex; align-items: center; gap: 12px">
      <Button
        icon="pi pi-chevron-left"
        severity="secondary"
        aria-label="На головну"
        @click="toPage('GamePlayersSelect')"
      ></Button>
      <h1>Новий гравець</h1>
    </div>
    <Avatar :name="name" :emoji="emoji" :color="'#' + color" class="mb-3" />
    <FloatLabel variant="in" class="mb-3">
      <InputText id="name" v-model="name" autocomplete="off" fluid />
      <label for="name">Ім'я</label>
    </FloatLabel>
    <div class="mb-3" style="display: flex; align-items: center; gap: 12px">
      <span>Колір:</span>
      <ColorPicker v-model="color" style="display: flex; justify-content: center" />
    </div>
    <div class="emojis">
      <template v-for="(emj, id) in faceEmojis" :key="id">
        <input
          class="hiddenInput"
          :id="'emoji-' + id"
          type="radio"
          name="emoji"
          v-model="emoji"
          :value="emj"
        />
        <label class="radio" :for="'emoji-' + id">{{ emj }}</label>
      </template>
    </div>
    <Button
      class="submit"
      label="Створити"
      size="large"
      icon="pi pi-check"
      style="width: 100%"
      @click="submitHandler"
    />
  </div>
</template>

<style scoped>
.new-player-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.new-player-page > * {
  flex-shrink: 0;
}

.new-player-page .emojis {
  flex-shrink: 1;
  flex-grow: 1;
}

.emojis {
  margin-bottom: 20px;
  padding: 3px 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;

  overflow: auto;
}

.hiddenInput {
  display: none;
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  top: -9999px;
  left: -9999px;
}

.radio {
  padding: 4px;
  aspect-ratio: 1;
  font-size: 26px;
  cursor: pointer;
  border-radius: 6px;
}

.radio:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hiddenInput:checked + label {
  background-color: rgba(0, 0, 0, 0.3);
  outline: 2px solid #34d399;
}

/* .submit {
  position: sticky;
  bottom: 20px;
} */
</style>
