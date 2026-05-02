<script setup>
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'
const { nextStage } = useGameStore()

onMounted(() => {
  setTimeout(() => {
    nextStage()
  }, 5000)
})
</script>

<template>
  <div class="night">Ніч 🌙</div>
</template>

<style scoped>
.night {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.4rem;
  text-align: center;
}
</style>
