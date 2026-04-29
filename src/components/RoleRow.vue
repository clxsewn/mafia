<script setup>
import { InputNumber } from 'primevue'

const props = defineProps(['id', 'data', 'max'])
</script>

<template>
  <div class="row">
    <span class="role-name">{{ data.name }}</span>
    <div class="input">
      <InputNumber
        v-model="data.count"
        showButtons
        buttonLayout="horizontal"
        :min="0"
        :max="max"
        fluid
        style="text-align: center"
      >
        <template #incrementbuttonicon>
          <span class="pi pi-plus" />
        </template>
        <template #decrementbuttonicon>
          <span class="pi pi-minus" />
        </template>
      </InputNumber>
    </div>
  </div>
</template>

<style scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input {
  width: 120px;
}

.role-name {
  font-size: 1.3rem;
}
</style>

<style>
.input input {
  text-align: center;
}
</style>
