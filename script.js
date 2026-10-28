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
  let setIcon;
  switch (icon) {
    case "01n":
      setIcon = "assets/svg/animated/night.svg";
      break;
    case "01d":
      setIcon = "assets/svg/animated/day.svg";
    default:
      setIcon = "weather.svg";
      break;
  }
  return setIcon;
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
