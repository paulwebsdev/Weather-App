const apiKey = "4460c670bfffd7fd1d5fd841b004df08";

// When page loads → auto detect location
window.onload = function () {
    getLocationWeather();
};

// 🌍 AUTO LOCATION WEATHER
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation not supported");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetchWeather(url);
}

function error() {
    alert("Location access denied. Please search manually.");
}

// 🔍 SEARCH CITY WEATHER
async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetchWeather(url);
}

// 🌦️ FETCH & DISPLAY WEATHER
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        document.getElementById("city").innerText = data.name;
        document.getElementById("temp").innerText = data.main.temp + "°C";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity;
        document.getElementById("wind").innerText = data.wind.speed;

    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}
