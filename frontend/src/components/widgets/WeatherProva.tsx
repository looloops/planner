import React, { useState } from "react";

const apiKey = "dc3b0f9f10d947646d1f10be4bfd42c8";

interface ForecastWeather {
  city: City;
  list: List[];
}

interface List {
  dt_txt: string; // Unix timestamp
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
}
interface City {
  id: number;
  name: string;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

const WeatherProva: React.FC = () => {
  const [cityName, setCityName] = useState("Rome");
  const [forecastWeather, setForecastWeather] = useState<ForecastWeather | null>(null);
  const [error, setError] = useState(false);

  // Array con i giorni unici dai dati meteo
  const uniqueDays = forecastWeather
    ? Array.from(new Set(forecastWeather.list.map((item) => item.dt_txt.split(" ")[0])))
    : [];
  // Crea un array di oggetti Date dai giorni unici
  const uniqueDateObjects = uniqueDays.map((day) => new Date(day));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchForecast = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (res.ok) {
          const forecastWeatherData = await res.json();
          setForecastWeather(forecastWeatherData);
          setError(false); // Reset error state
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error fetching data");
        setError(true);
      }
    };

    try {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          fetchForecast(lat, lon);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("Error fetching data");
      setError(true);
    }
  };

  return (
    <div className="wrapper">
      <div>
        <form onSubmit={handleSubmit} className="rounded-5">
          <input
            type="text"
            placeholder="Type your city here"
            value={cityName}
            onChange={handleChange}
            className="p-0"
          />
          <button type="submit">Get Weather</button>
        </form>
      </div>
      {error && <p>Error fetching data</p>}
      {forecastWeather && (
        <div className="container">
          {uniqueDateObjects.map((day, index) => (
            <React.Fragment key={index}>
              <input type="radio" name="slide" id={`c${index + 1}`} defaultChecked={index === 0} />
              <label htmlFor={`c${index + 1}`} className="card">
                <h5 className="card-title text-center fs-big my-3">{day.toDateString()}</h5>
                {forecastWeather.list
                  .filter((item) => {
                    const date = new Date(item.dt_txt.split(" ")[0]);
                    return date.getDate() === day.getDate();
                  })
                  .map((dayData, index) => (
                    <React.Fragment key={index}>
                      <h6 className="fw-bold pt-2">{dayData.dt_txt.split(" ")[1].slice(0, -3)}</h6>
                      <img src={`http://openweathermap.org/img/w/${dayData.weather[0].icon}.png`} alt="Weather Icon" />
                      <p className="pt-3 fw-bold">{dayData.weather[0].main}</p>
                    </React.Fragment>
                  ))}
              </label>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherProva;
