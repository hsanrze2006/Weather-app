//
const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  });
};

const getWeather = async (lat, lon) => {
  api = "2e3977592e2b9cdda447ec3091330103";
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function geticon(icon) {
  switch (icon) {
    // Clear sky
    case "01d":
      return "assets/svg/animated/day.svg";
    case "01n":
      return "assets/svg/animated/night.svg";

    // Few clouds
    case "02d":
      return "assets/svg/animated/cloudy-day-1.svg";
    case "02n":
      return "assets/svg/animated/cloudy-night-1.svg";

    // Scattered clouds
    case "03d":
      return "assets/svg/animated/cloudy-day-2.svg";
    case "03n":
      return "assets/svg/animated/cloudy-night-2.svg";

    // Broken clouds
    case "04d":
      return "assets/svg/animated/cloudy.svg";
    case "04n":
      return "assets/svg/animated/cloudy.svg";

    // Shower rain
    case "09d":
      return "assets/svg/animated/rainy-7.svg";
    case "09n":
      return "assets/svg/animated/rainy-6.svg";

    // Rain
    case "10d":
      return "assets/svg/animated/rainy-3.svg";
    case "10n":
      return "assets/svg/animated/rainy-6.svg";

    // Thunderstorm
    case "11d":
      return "assets/svg/animated/thunder.svg";
    case "11n":
      return "assets/svg/animated/thunder.svg";

    // Snow
    case "13d":
      return "assets/svg/animated/snowy-3.svg";
    case "13n":
      return "assets/svg/animated/snowy-6.svg";

    // Mist, fog, haze
    case "50d":
      return "assets/svg/animated/fog.svg";
    case "50n":
      return "assets/svg/animated/fog.svg";

    default:
      return "assets/svg/animated/cloudy.svg";
  }
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
    cityName.textContent = location.timezone;
    getWeather(location.lat, location.lon).then((weather) => {
      const weatherTemp = weather.main.temp;
      const weatherIcon = weather.weather[0].icon;
      const weatherDescription = weather.weather[0].description;
      console.log(weatherIcon);

      image.src = geticon(weatherIcon);

      degree.textContent = `${Math.floor(weatherTemp - 273.15)}°`;
      description.textContent = weatherDescription;

      greeting.textContent = getGreeting();
      weekdays.textContent = getWeekday();
    });
  });
});
