import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

const API_KEY = '36823fefb588e141b2ad4161901349e7';
const cities = ['paris', 'new york', 'tokyo', 'sidney'];

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
      setLoading(true);
    } else {
      getWeatherByCity();
      setLoading(true);
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color='#f88c6b' loading={loading} size={150} />
        </div>
      ) : (
        <div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </div>
  );
};

export default App;
