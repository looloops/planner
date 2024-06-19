import { useState, useEffect } from "react";

const apiKey = "dc3b0f9f10d947646d1f10be4bfd42c8";
const limit = 1;
const daysOfForecast = 3;

const Weather = function () {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchCurrentWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (response.ok) {
          const currentWeatherData = await response.json();
          setCurrentWeather(currentWeatherData);
          // console.log("CURRENT WEATHER", currentWeatherData);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error fetching datas");

        setError(true);
      }
    };

    const fetchForecast = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=${daysOfForecast}&appid=${apiKey}`
        );
        if (res.ok) {
          const forecastWeatherData = await res.json();
          setForecastWeather(forecastWeatherData);
          // console.log("FORECAST", forecastWeatherData);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error fetching datas");

        setError(true);
      }
    };

    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        /*         console.log(data); */
        const { lat, lon } = data[0];
        /*     console.log(data[0].lat);
        console.log(data[0].lon); */
        fetchCurrentWeather(lat, lon);
        fetchForecast(lat, lon);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("Error fetching datas");
      setError(true);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col">
            <h1 className="text-black">Weather</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-8 rounded-5 py-4 px-4 mx-auto">
            <form onSubmit={handleSubmit} className="rounded-5">
              <input
                type="text"
                placeholder="Type your city here"
                value={cityName}
                onChange={handleChange}
                className="p-0"
              />
            </form>
          </div>
        </div>

        <div className="row gap-2 justify-content-center">
          {currentWeather && (
            <div className="col-10 col-md-5 col-lg-4">
              <p>Today's weather</p>
              <p>{currentWeather.weather[0].main}</p>
            </div>
          )}

          {forecastWeather && (
            <div className="col-10 col-md-5 col-lg-4">
              <p>Tomorrow's weather</p>
              <p>{forecastWeather.list[0].weather[0].main}</p>
            </div>
          )}
        </div>
      </div>

      {!currentWeather ||
        (!forecastWeather && (
          <div className="text-center mt-3">
            <p>Loading</p>
          </div>
        ))}
    </>
  );
};
export default Weather;
