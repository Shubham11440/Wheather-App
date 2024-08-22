import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiKeys from './apiKeys'
import ReactAnimatedWeather from 'react-animated-weather'

const Forcast = ({ icon, weather }) => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [weatherData, setWeatherData] = useState({})

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city !== '[object Object]' ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeatherData(response.data)
        setQuery('')
      })
      .catch((error) => {
        console.log(error)
        setWeatherData({})
        setQuery('')
        setError({ message: 'Not Found', query })
      })
  }

  const defaults = {
    color: 'white',
    size: 112,
    animate: true,
  }

  useEffect(() => {
    search('Bhopal');
  },[] );

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
              alt="Search"
            />
          </div>
        </div>
        <ul>
          {typeof weatherData.main !== 'undefined' ? (
            <div>
              <li className="cityHead">
                <p>
                  {weatherData.name}, {weatherData.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </li>
              <li>
                Temperature{' '}
                <span className="temp">
                  {Math.round(weatherData.main.temp)}°c (
                  {weatherData.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{' '}
                <span className="temp">
                  {Math.round(weatherData.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{' '}
                <span className="temp">
                  {Math.round(weatherData.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{' '}
                <span className="temp">
                  {Math.round(weatherData.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Forcast

// "start": "react-scripts --openssl-legacy-provider start",