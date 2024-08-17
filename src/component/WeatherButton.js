import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
      <Button variant='success'>Success</Button>{' '}
      <Button variant='success'>Paris</Button>{' '}
      <Button variant='success'>New York</Button>{' '}
    </div>
  );
};

export default WeatherButton;
