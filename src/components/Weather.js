// import React from 'react'
// import './Weather.css'
// const Weather = () => {
//   return (
//     <div>
//       <h2>I am Weather App</h2>
//     </div>
//   )
// }

// export default Weather

import React, { useState } from 'react';
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";
import { FaTemperatureFull } from "react-icons/fa6";
import { SiWorldhealthorganization } from "react-icons/si";
import './Weather.css';
const API_KEY = 'c6a0cfef2157b9d99c7136de8e4b79b4';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  

  const getWeather = async () => {
    try {
     
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      console.log( "response " , data);
      setWeather(data);
      setError('');
      setCity('');
      setSuggestions([]); // Clear suggestions after getting weather
    } catch (err) {
      console.log('Failed to get weather update');
      setError(err.message);
      setWeather(null);
    }
  };

  const handleChange = async (e) => {
    setCity(e.target.value);

    // Fetch city suggestions as the user types
    if (e.target.value.length > 2) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log('data ' + data )
      setSuggestions(data.list || []); // Store the suggestions
    } else {
      setSuggestions([]); // Clear suggestions when input is less than 3 chars
    }
  };

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className='weather-main-container'>
      <div className='weather-container' >
        <div className='button-input' >
          <input
            type='text'
            className='searchbar-input'
            value={city}
            placeholder='Enter City Name'
            onChange={handleChange}
          />

         
         
      
        <button 
        className="search-icon"
        onClick={getWeather}
        >search</button>
        

        </div>

        {suggestions.length > 0 && (
          <ul className='suggestions-list'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className='suggestion-item'
                onClick={() => handleSelectCity(suggestion.name)}
              >
                {suggestion.name}, {suggestion.sys.country}
              </li>
            ))}
          </ul>
        )}

        {error && <p style={{ color: 'red', fontSize: '15px' }}>{error}</p>}
       
        {weather && (
          <div className='weather-card' >
            <div className='world-container'>
              <SiWorldhealthorganization className='world-icon' />
              <h3 className='heading-card'>
                {weather.name}, {weather.sys.country}
              </h3>
            </div>

            <div className='world-container'>
              < FaTemperatureFull className='world-icon' />
              <p className='para-card'>Temperature: {weather.main.temp} °C</p>
            </div>

            <div className='world-container'>
             
              <TiWeatherCloudy className='world-icon' />
              <p className='para-card'>Condition: {weather.weather[0].description}</p>
            </div>

            <div className='world-container'>
              
              <WiHumidity  className='world-icon' />
              <p className='para-card'>Humidity: {weather.main.humidity}%</p>
            </div>
            <div className='world-container'>
            <FaWind  className='world-icon'  />
              <p className='para-card'>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
