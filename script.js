
const getLocation = async () => {
  const response = await fetch("https://ipapi.co/json/");

  if (!response.ok) {
    throw new Error("Failed to get location");
  }

  const data = await response.json();

  return {
    city: data.city,
    lat: data.latitude,
    lon: data.longitude,
    timezone: data.timezone
  };
};


const getWeather = async (lat, lon) => {
  const api = "2e3977592e2b9cdda447ec3091330103";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function geticon(icon) {
  // OpenWeatherMap icon codes: d = day, n = night
  const icons = {
    // Clear sky
    "01d": "assets/svg/animated/day.svg",
    "01n": "assets/svg/animated/night.svg",

    // Few clouds
    "02d": "assets/svg/animated/cloudy-day-1.svg",
    "02n": "assets/svg/animated/cloudy-night-1.svg",

    // Scattered clouds
    "03d": "assets/svg/animated/cloudy-day-2.svg",
    "03n": "assets/svg/animated/cloudy-night-2.svg",

    // Broken / overcast clouds
    "04d": "assets/svg/animated/cloudy.svg",
    "04n": "assets/svg/animated/cloudy.svg",

    // Shower rain
    "09d": "assets/svg/animated/rainy-7.svg",
    "09n": "assets/svg/animated/rainy-3.svg",

    // Rain
    "10d": "assets/svg/animated/rainy-5.svg",
    "10n": "assets/svg/animated/rainy-6.svg",

    // Thunderstorm
    "11d": "assets/svg/animated/thunder.svg",
    "11n": "assets/svg/animated/thunder.svg",

    // Snow
    "13d": "assets/svg/animated/snowy-5.svg",
    "13n": "assets/svg/animated/snowy-6.svg",

    // Mist, fog, haze, smoke, etc.
    "50d": "assets/svg/animated/fog.svg",
    "50n": "assets/svg/animated/fog.svg",
  };

  // Use a valid existing icon for unknown or missing codes.
  return icons[icon] ?? "assets/svg/animated/cloudy.svg";
}

function getDayOrNight() {
  let dayOrNight;
  const date = new Date();
  const hours = date.getHours();
  if (hours > 6 && hours < 18) {
    dayOrNight = "day";
  } else {
    dayOrNight = "night";
  }
  return dayOrNight;
}

function getGreeting() {
  const date = new Date();
  const hours = date.getHours();
  if (hours > 6 && hours < 12) {
    return "Good Morning,";
  } else if (hours >= 12 && hours < 18) {
    return "Good Afternoon,";
  } else {
    return "Good Evening,";
  }
}

function getWeekday() {
  const date = new Date();
  const weekday = date.getDay();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[weekday];
}
const cityName = document.querySelector(".city-name");
const image = document.querySelector(".image");
const degree = document.querySelector(".degree");
const description = document.querySelector(".description");
const greeting = document.querySelector(".greeting");
const weekdays = document.querySelector(".weekdays");

window.addEventListener("load", async () => {
  getLocation().then((location) => {
    cityName.textContent = location.city;
    getWeather(location.lat, location.lon).then((weather) => {
      const weatherTemp = weather.main.temp;
      const weatherIcon = weather.weather[0].icon;
      const weatherDescription = weather.weather[0].description;

      const iconName = geticon(weatherIcon);
      image.src = iconName;

      degree.textContent = `${Math.floor(weatherTemp - 273.15)}°`;
      description.textContent = weatherDescription;

      greeting.textContent = getGreeting();
      weekdays.textContent = getWeekday();
    });
  });
});
