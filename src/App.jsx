// App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('Multan'); // Set default city to Multan
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(city); // Fetch weather data for default city when component mounts
  }, []);

  const fetchWeatherData = async (cityName) => {
    try {
      const apiKey = 'e4f81c81f8ec70bfeb4c9765fd21968b';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherIconName = (weatherCondition) => {
    const iconMap = {
      Clear: 'wb_sunny',
      Clouds: 'wb_cloudy',
      Rain: 'umbrella',
      Thunderstorm: 'flash_on',
      Drizzle: 'grain',
      Snow: 'ac_unit',
      Mist: 'cloud',
      Smoke: 'cloud',
      Haze: 'cloud',
      Fog: 'cloud',
    };
    return iconMap[weatherCondition] || 'help';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-yellow-500 max-w-2xl mx-auto p-8 rounded-lg">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          className="flex-1 px-4 py-2 border-2 border-blue-500 rounded-lg text-lg focus:outline-none"
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
          type="submit"
        >
          Search
        </button>
      </form>
      {weatherData && (
        <div className="mt-8">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl opacity-90">{weatherData.name}</h2>
            <p className="bg-blue-200 px-2 py-1 rounded-lg mt-2">
              {new Date().toDateString()}
            </p>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="flex items-center">
              <i className="material-icons text-4xl opacity-80">
                {getWeatherIconName(weatherData.weather[0].main)}
              </i>
              <span className="text-xl ml-2">
                {weatherData.weather[0].description}
              </span>
            </div>
            <div className="text-7xl mt-4">
              {Math.round(weatherData.main.temp)}°
            </div>
          </div>
          <div className="flex justify-around mt-8 gap-4">
            <div className="bg-gray-200 p-4 flex-1 flex flex-col rounded-lg">
              <i className="material-icons text-5xl opacity-80">air</i>
              <div className="mt-2">
                <h3 className="text-xl">{weatherData.wind.speed} km/h</h3>
                <p className="text-sm">Wind</p>
              </div>
            </div>
            <div className="bg-gray-200 p-4 flex-1 flex flex-col rounded-lg">
              <i className="material-icons text-5xl opacity-80">water_drop</i>
              <div className="mt-2">
                <h3 className="text-xl">{weatherData.main.humidity}%</h3>
                <p className="text-sm">Humidity</p>
              </div>
            </div>
            <div className="bg-gray-200 p-4 flex-1 flex flex-col rounded-lg">
              <i className="material-icons text-5xl opacity-80">visibility</i>
              <div className="mt-2">
                <h3 className="text-xl">
                  {weatherData.visibility / 1000} km
                </h3>
                <p className="text-sm">Visibility</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
