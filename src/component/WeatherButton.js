import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className='btn_box'>
      <Button
        variant={`${selectedCity === '' ? 'outline-primary' : 'primary'}`}
        onClick={() => handleCityChange('current')}
      >
        Current Location
      </Button>

      {cities.map((city, index) => {
        return (
          <Button
            variant={`${selectedCity === city ? 'outline-primary' : 'primary'}`}
            key={index}
            onClick={() => handleCityChange(city)}
          >
            {city}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
