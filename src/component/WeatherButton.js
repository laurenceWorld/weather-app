import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  return (
    <div>
      <Button variant='success'>Current Location</Button>

      {cities.map((city, index) => {
        return (
          <Button variant='success' key={index} onClick={() => setCity(city)}>
            {city}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
