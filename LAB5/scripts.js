document.addEventListener('DOMContentLoaded',initWeatherApp);

async function initWeatherApp() {
    try{
        const weatherData = await fetchWeatherData('Calgary');
        displayerWeatherInfo(weatherData);
    } catch(error) {
        console.error('Failed to fetch weather data:', error);
        displayError();
    }
}

async function fetchWeatherData(city) {
    const apiKey = '6a8011f4c59f71289d3cfa5cb4572e0a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units-metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data could not be retrieved');
    return response.json();
}

function displayerWeatherInfo(weatherData) {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    if (weatherData && weatherData.weather && weatherData.main) {
        const {temp} = weatherData.main;
        const [weather] = weatherData.weather;
        temperatureElement.textContent = `Temperature: ${temp}°C`;
        descriptionElement.textContent = `Weather: ${weather.description}`;
        } else {
            displayError ('Weather data is not available');
        }
}

function displayError(message = 'Unable to display weather data') {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    temperatureElement.textContent = '';
    descriptionElement.textContent = message;
}