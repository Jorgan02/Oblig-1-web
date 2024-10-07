// Open-Meteo API URL
const api_url = 'https://api.open-meteo.com/v1/forecast?current_weather=true';

// Coordinates for 5 different locations (New York, Tokyo, London, Sydney, Paris)
const locations = [
    { name: 'New York', latitude: 40.7143, longitude: -74.0060 },
    { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
    { name: 'London', latitude: 51.5085, longitude: -0.1257 },
    { name: 'Sydney', latitude: -33.8678, longitude: 151.2073 },
    { name: 'Paris', latitude: 48.8534, longitude: 2.3488 }
];

// Map for weather codes
const weatherCodes = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Drizzle: Light Intensity',
    53: 'Drizzle: Moderate Intensity',
    55: 'Drizzle: Dense Intensity',
    56: 'Freezing Drizzle: Light Intensity',
    57: 'Freezing Drizzle: Heavy Intensity',
    61: 'Rain: Slight Intensity',
    63: 'Rain: Moderate Intensity',
    65: 'Rain: Heavy Intensity',
    66: 'Freezing Rain: Light Intensity',
    67: 'Freezing Rain: Heavy Intensity',
    71: 'Snow Fall: Slight Intensity',
    73: 'Snow Fall: moderate Intensity',
    75: 'Snow Fall: Heavy Intensity',
    77: 'Snow grains',
    80: 'Rain Showers: Slight',
    81: 'Rain Showers: Moderate',
    82: 'Rain Showers: Violent',
    85: 'Snow Showers: Slight',
    86: 'Snow Showers: moderate',
    95: 'Thunderstorm: Slight or Moderate',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail'
};

// Function to fetch weather data for a location
function fetchWeather(location) {
    const url = `${api_url}&latitude=${location.latitude}&longitude=${location.longitude}`;
    
    // Create an XMLHttpRequest object
    const xhttp = new XMLHttpRequest();
    
    // Define the response handler
    xhttp.onreadystatechange = function () {
        // Checks if the request is successful
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            // Parse the JSON response from the server
            const data = JSON.parse(xhttp.responseText);
            // Extract the current weather data from the parsed response
            const weather = data.current_weather;
            // Creates an HTML string to display the weather information
            const weatherHtml = `
                <h3>${location.name}</h3>
                <p>Temperature: ${weather.temperature}°C</p>
                <p>Windspeed: ${weather.windspeed} km/h</p>
                <p>Weather Condition: ${weatherCodes[weather.weathercode]}</p>
            `;
            // Updates the HTML content of the element with the ID corresponding to the location
            document.getElementById(`${location.name}-content`).innerHTML = weatherHtml;
        }
    };
    
    // Send a GET request to the API
    xhttp.open('GET', url, true);
    xhttp.send();
}

// Function to initialize weather display for all locations
function displayWeather() {
    locations.forEach(location => {
        // Check if the weather card already exists
        let weatherCard = document.getElementById(location.name);

        if (!weatherCard) {
            // If it doesn't exist, create a new card
            const weatherContainer = document.getElementById('weather-container');
            // Create a new div element to hold the weather information
            weatherCard = document.createElement('div');
            // Set the id of the weather card to the name of the location
            weatherCard.id = location.name;
            // Adds style to the weather card
            weatherCard.classList.add('weather-card');
            // Set the cards to show loading text and create a content div for updates
            weatherCard.innerHTML = `<div id="${location.name}-content">Loading weather for ${location.name}...</div>`;
             // Append the new weather card to the weather container
            weatherContainer.appendChild(weatherCard);
        }

        // Fetch and updates the weather data for the location
        fetchWeather(location);
    });
}

// Update weather data every 10 seconds
setInterval(displayWeather, 10000);

// Display weather on initial load
displayWeather();
