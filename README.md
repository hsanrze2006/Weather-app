# Weather App 🌦️

A simple weather application built with **HTML, CSS, and JavaScript** that displays current weather information based on the user's approximate location.

## ✨ Features

- 🌍 Detects approximate location using an IP-based location service
- 🌡️ Displays the current temperature in Celsius
- ☁️ Shows the current weather description
- 🎨 Uses animated SVG icons for different weather conditions
- 🕒 Displays a greeting based on the time of day
- 📅 Displays the current weekday

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API
- Animated SVG icons

## 📂 Project Structure

```text
weather-app/
├── assets/
│   └── svg/
│       ├── animated/
│       └── static/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/hsanrze2006/weather-app.git
   ```

2. Open the project folder.

3. Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

## 🌐 API Services

- [OpenWeatherMap](https://openweathermap.org/api) — provides current weather data.
- [IP-API](https://ip-api.com/) — estimates the user's location based on their IP address.

## ⚠️ Notes

- Location detection is approximate and may not identify the user's exact city.
- An internet connection is required to retrieve weather information.
- The application currently uses an API key in the client-side JavaScript. For public deployment, avoid exposing sensitive API credentials and consider using a backend proxy.

## 👨‍💻 Author

**Hasan Rezaei**

- GitHub: [@hsanrze2006](https://github.com/hsanrze2006)

---

Built as a learning project to practice front-end web development and API integration.
