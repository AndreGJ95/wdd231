// OpenWeatherMap API Setup
const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Cambia esto por tu API Key real cuando la tengas
const lat = '-2.1969';
const lon = '-79.8862';

const currentTempEl = document.querySelector('#current-temp');
const weatherDescEl = document.querySelector('#weather-desc');
const forecastEl = document.querySelector('#forecast');

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=es`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      console.warn('Weather API key not set or invalid response');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {
  const current = data.list[0];
  if (currentTempEl) currentTempEl.textContent = Math.round(current.main.temp);
  if (weatherDescEl) weatherDescEl.textContent = current.weather[0].description;

  if (forecastEl) {
    forecastEl.innerHTML = '';
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(1, 4);

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString('es-ES', { weekday: 'short' });
      const temp = Math.round(day.main.temp);
      
      const dayCard = document.createElement('div');
      dayCard.classList.add('forecast-day');
      dayCard.innerHTML = `<p><strong>${date.toUpperCase()}</strong></p><p>${temp}°C</p>`;
      forecastEl.appendChild(dayCard);
    });
  }
}

fetchWeather();