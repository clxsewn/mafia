<script setup>
defineProps(['name', 'emoji', 'color'])
</script>

<template>
  <div class="avatar-wrapper">
    <span class="emoji">{{ emoji }}</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<style scoped>
.avatar-wrapper {
  width: 100%;
  height: 160px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: v-bind(color);
  border-radius: 24px;
  border: 1px solid #ffffff77;
}

.emoji {
  font-size: 62px;
}

.name {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  text-shadow:
    1px 1px 1px #00000088,
    -1px -1px 1px #00000088,
    1px -1px 1px #00000088,
    -1px 1px 1px #00000088;
}
</style>
