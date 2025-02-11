import React from 'react';

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherDetails } = weather;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p className="description">{weatherDetails[0].description}</p>
      <p className="temp">{main.temp}°C</p>
      <p className="humidity">Humidity: {main.humidity}%</p>
      <p className="pressure">Pressure: {main.pressure} hPa</p>
    </div>
  );
};

export default WeatherCard;
