import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './WeatherCard';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Git from './git';

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const apiKey = 'b3796e2b3517ac04f3fcb01bc36bad53';  // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeather(weatherResponse.data);

      // Fetch hourly forecast data (for the next 5 days, 3-hour intervals)
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list);  // Save hourly forecast data
      setError('');
    } catch (err) {
      console.log(err);
      setWeather(null);
      setHourlyForecast([]);
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  // Prepare data for the hourly forecast chart
  const prepareChartData = () => {
    const hours = hourlyForecast.map(item => new Date(item.dt * 1000).getHours());
    const temperatures = hourlyForecast.map(item => item.main.temp);

    return {
      labels: hours,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          fill: false,
          borderColor: '#0072ff',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={location} 
        onChange={handleInputChange} 
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p className="error-message">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      
      {hourlyForecast.length > 0 && (
        <div className="chart-container">
          <h2>Hourly Temperature Forecast</h2>
          <Line data={prepareChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}
      <Git/>
    </div>
  );
};

export default App;
