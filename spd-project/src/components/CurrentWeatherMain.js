import React, { useState, useEffect } from "react";

const key = "57ec25fe836ff428fdaf3d0167c32f00";
const k = 273.15;

const useGeolocate = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("Date");
  const [time, setTime] = useState("0:00:00");
  const [weather, setWeather] = useState("01d");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
        );
        const data = await response.json();
        setData(data);

        var dt = data.dt;
        const dateObj = new Date(dt * 1000);

        setDate(dateObj.toDateString());
        setTime(
          `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
        );

        setWeather(weatherClass(data.weather[0].icon));

        setLoading(false);
      });
    } else {
      setError(true);
    }
  }, []);

  return { error, data, loading, date, time, weather };
};

function weatherClass(weather) {
  let map = {};
  map[("01d", "01n")] = "weather-main-current-clear-sky";
  map[("02d", "02n", "03d", "03n", "04d", "04n")] =
    "weather-main-current-clouds";
  map[("09d", "09n", "10d", "10n")] = "weather-main-current-rain";
  map[("11d", "11n")] = "weather-main-current-thunderstorm";
  map[("13d", "13n")] = "weather-main-current-snow";
  map[("50d", "50n")] = "weather-main-current-mist";
  return map[weather];
}

export default () => {
  const { error, data, loading, date, time, weather } = useGeolocate();
  if (!error) {
    return (
      <>
        <div class="weather-main-current-header">
          {loading ? (
            <div class="weather-main-date">...loading</div>
          ) : (
            <div class="weather-main-date">{date}</div>
          )}
        </div>
        {loading ? (
          <div class="weather-main-current-loading">
            Loading Weather Data Please Wait
          </div>
        ) : (
          <div class={weather}>
            {loading ? (
              <div class="weather-main-locat">...loading</div>
            ) : (
              <div class="weather-main-locat">
                {data.name}, {data.sys.country}
              </div>
            )}
            {loading ? (
              <div class="weather-main-dt">...loading</div>
            ) : (
              <div class="weather-main-dt">{time}</div>
            )}
            {loading ? (
              <div class="weather-main-temp">...loading</div>
            ) : (
              <div class="weather-main-temp">
                {Math.floor(data.main.temp - k)}° C
              </div>
            )}
            {loading ? (
              <div class="weather-main-temp-hilo">...loading</div>
            ) : (
              <div class="weather-main-temp-hilo">
                {Math.floor(data.main.temp_max - k)}° C /
                {Math.floor(data.main.temp_min - k)}° C
              </div>
            )}
            {loading ? (
              <div class="weather-main-desc">...loading</div>
            ) : (
              <div class="weather-main-desc">{data.weather[0].description}</div>
            )}
          </div>
        )}
      </>
    );
  } else {
    return (
      <div class="weather-main-current">
        Error: Your browser does not support Geolocation. For more infomation
        click <a href="https://caniuse.com/geolocation">here.</a>
      </div>
    );
  }
};
