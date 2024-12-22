<template>
  <WeatherComponent />
  <RouterView />
</template>

<script setup lang="ts">
import WeatherComponent from '@/components/WeatherComponent.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
/* Ваши стили */
</style>
