const apiKey = "4460c670bfffd7fd1d5fd841b004df08";

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
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
    }
}
