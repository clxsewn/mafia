<script setup>
import Toast from 'primevue/toast'
import { usePagerStore } from './stores/pager'
import { storeToRefs } from 'pinia'
import { Transition } from 'vue'
import { ConfirmDialog } from 'primevue'

const pager = usePagerStore()
const { currentPage } = storeToRefs(pager)
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <Toast style="left: 12px; max-width: calc(100% - 24px)" />
  <Transition name="fade" mode="out-in">
    <component :is="currentPage"></component>
  </Transition>
</template>

<style>
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/Ubuntu-400-latin.woff2) format('woff2');
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
    U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts/Ubuntu-700-latin.woff2) format('woff2');
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
    U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/Ubuntu-400-cyrillic.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts/Ubuntu-700-cyrillic.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

* {
  padding: 0;
  margin: 0;
}

html {
  font-family: 'Ubuntu', 'Courier New', Courier, monospace;
}

#app {
  height: 100dvh;
  max-width: min(500px, 100%);
  margin: 0 auto;
  padding: 20px 12px;
  overflow: hidden;
}

.mb-1 {
  margin-bottom: 8px;
}
.mb-2 {
  margin-bottom: 12px;
}
.mb-3 {
  margin-bottom: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.1s linear,
    opacity 0.1s linear;
}

.fade-leave-to {
  opacity: 0.3;
  transform: translateX(-30px);
}

.fade-enter-from {
  opacity: 0.3;
  transform: translateX(30px);
}

.p-dialog {
  max-width: calc(100% - 20px);
}

button,
.player {
  -webkit-tap-highlight-color: transparent;
}
</style>
