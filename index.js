const apiKey = 'e51a973dd6298524578ebbd3289fb680';

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

document.getElementById('fetch-weather-current-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod !== 200) {
        alert('Location not found.');
        return;
    }

    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}


