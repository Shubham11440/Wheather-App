import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiKeys from './apiKeys'
import ReactAnimatedWeather from 'react-animated-weather'

const Forecast = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [weather, setWeather] = useState({})

  const search = async (city) => {
    try {
      const response = await axios.get(
        `${apiKeys.base}weather?q=${encodeURIComponent(
          city
        )}&units=metric&APPID=${apiKeys.key}`
      )

      setWeather(response.data)
      setQuery('')
      setError('')
    } catch (error) {
      console.error(error)

      setWeather({})
      setQuery('')
      setError({ message: 'Not Found', query: city })
    }
  }

  useEffect(() => {
    search('Delhi')
  }, [])

  const renderWeatherInfo = () => {
    if (weather && weather.main) {
      return (
        <div>
          <li className="cityHead">
            <p>
              {weather.name}, {weather.sys.country}
            </p>
            <img
              className="temp"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </li>
          <li>
            Temperature{' '}
            <span className="temp">
              {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
            </span>
          </li>
          <li>
            Humidity{' '}
            <span className="temp">{Math.round(weather.main.humidity)}%</span>
          </li>
          <li>
            Visibility{' '}
            <span className="temp">{Math.round(weather.visibility)} mi</span>
          </li>
          <li>
            Wind Speed{' '}
            <span className="temp">{Math.round(weather.wind.speed)} Km/h</span>
          </li>
        </div>
      )
    } else {
      return <li>{error ? `${error.query} ${error.message}` : null}</li>
    }
  }

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={weather.weather ? weather.weather[0].icon : 'CLEAR_DAY'}
          color="white"
          size={112}
          animate={true}
        />
      </div>
      <div className="today-weather">
        <h3>{weather.weather ? weather.weather[0].main : 'Unknown Weather'}</h3>
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
        <ul>{renderWeatherInfo()}</ul>
      </div>
    </div>
  )
}

export default Forecast
