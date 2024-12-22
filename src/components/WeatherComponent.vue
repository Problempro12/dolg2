<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="weather">
      <h1>Погода в {{ weather.name }}</h1>
      <p>Температура: {{ weather.main.temp }} °C</p>
      <p>Влажность: {{ weather.main.humidity }} %</p>
      <p>Давление: {{ weather.main.pressure }} мм рт. ст.</p>
      <p>Состояние: {{ weather.weather[0].description }}</p>
      <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" alt="Weather Icon" />
  </div>
  <div v-else>
      <p>Нет данных о погоде.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getWeatherByLocation } from '@/stores/WeatherStore';
import { WeatherResponse } from '@/models/WeatherModel';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export default defineComponent({
  name: 'WeatherComponent',
  setup() {
      const weather = ref<WeatherResponse | null>(null);
      const isLoading = ref(true); // Переменная состояния загрузки

      const getCurrentLocation = () => {
          return new Promise<GeolocationCoordinates>((resolve, reject) => {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(resolve, (error) => {
                      console.error('Ошибка получения местоположения:', error);
                      reject(error);
                  });
              } else {
                  reject(new Error('Geolocation is not supported by this browser'));
              }
          });
      };

      onMounted(() => {
          from(getCurrentLocation()).pipe(
              switchMap((position) => {
                  console.log('Получение погоды для:', position);
                  return getWeatherByLocation(position.coords.latitude, position.coords.longitude); // Используйте coords.latitude и coords.longitude
              })
          ).subscribe({
              next: (data) => {
                  console.log('Данные погоды:', data); // Логирование данных
                  weather.value = data; // Присваивание данных переменной weather
                  isLoading.value = false; // Установите состояние загрузки в false
              },
              error: (err) => {
                  console.log('Ошибка при получении данных погоды:', err);
                  isLoading.value = false; // Установите состояние загрузки в false даже при ошибке
              }
          });
      });

      return { weather, isLoading }; // Верните переменные состояния загрузки и данных о погоде
  }
});
</script>

<style scoped>

</style>
