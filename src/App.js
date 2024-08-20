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
  const [apiError, setAPIError] = useState('');
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      setWeather(data);
      sunriseAndSunsetSetUp(data);
    } catch (err) {
      setAPIError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      setWeather(data);
      sunriseAndSunsetSetUp(data);
    } catch (err) {
      setAPIError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity('');
    } else {
      setCity(city);
    }
  };

  const sunriseAndSunsetSetUp = (data) => {
    setSunrise(msToLocalTimeCalculate(data.sys.sunrise));
    setSunset(msToLocalTimeCalculate(data.sys.sunset));
  };

  const msToLocalTimeCalculate = (ms) => {
    const date = new Date(ms * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  useEffect(() => {
    if (city === '') {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color='#f88c6b' loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className='container'>
          <WeatherBox weather={weather} sunrise={sunrise} sunset={sunset} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
};

export default App;
