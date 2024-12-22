export class Weather {
  id: number; // Объявление свойства id
  main: string; // Объявление свойства main
  description: string; // Объявление свойства description
  icon: string; // Объявление свойства icon

  // Конструктор для инициализации свойств
  constructor(id: number, main: string, description: string, icon: string) {
      this.id = id; // Инициализация свойства id
      this.main = main; // Инициализация свойства main
      this.description = description; // Инициализация свойства description
      this.icon = icon; // Инициализация свойства icon
  }
}

export class WeatherResponse {
  weather: Weather[]; // Массив объектов Weather
  main: {
      temp: number; // Температура
      pressure: number; // Давление
      humidity: number; // Влажность
  };
  name: string; // Название города

  // Конструктор для инициализации свойств
  constructor(weather: Weather[], main: { temp: number; pressure: number; humidity: number }, name: string) {
      this.weather = weather; // Инициализация массива weather
      this.main = main; // Инициализация объекта main
      this.name = name; // Инициализация свойства name
  }
}
