import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faGlassWater,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

const WeatherBox = ({ weather, sunrise, sunset }) => {
  console.log('weather', weather);

  return (
    <div className='weather-box'>
      <div className='weather_info_on'>
        <div>{weather?.name}</div>
        <h2>
          {weather?.main.temp}°C / {Math.floor(weather?.main.temp * 1.8 + 32)}°F
        </h2>
        <h3>{weather?.weather[0].description}</h3>
      </div>
      <div className='weather_info_under'>
        <div>
          <div className='one_line'>
            <h3>{weather?.main.humidity}</h3>
            <p>Humidity</p>
            <FontAwesomeIcon icon={faWind} size='2x' />
          </div>
          <div className='one_line'>
            <h3>{weather?.wind.speed}</h3>
            <p>Wind-Speed</p>
            <FontAwesomeIcon icon={faGlassWater} size='2x' />
          </div>
        </div>
        <div>
          <div className='one_line'>
            <div>{sunrise}</div>
            <p>일출시간</p>
            <FontAwesomeIcon icon={faSun} size='2x' />
          </div>
          <div className='one_line'>
            <div>{sunset}</div>
            <p>일몰시간</p>
            <FontAwesomeIcon icon={faMoon} size='2x' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
