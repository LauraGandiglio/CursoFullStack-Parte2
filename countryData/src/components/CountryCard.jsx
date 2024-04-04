import axios from "axios";
import { useState, useEffect } from "react";

const CountryCard = ({ countries }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?lat=${
          countries.capitalInfo.latlng[0]
        }&lon=${countries.capitalInfo.latlng[1]}&key=${
          import.meta.env.VITE_SOME_KEY
        }`
      )
      .then((response) => {
        setWeather(response.data.data);
      })
      .catch((e) => console.log("Error geting weather"));
  }, [countries]);
  return (
    <div>
      <h2>{countries.name.common}</h2>
      <p>Capital {countries.capital}</p>
      <p>Area {countries.area}</p>
      <h3>Languages</h3>
      <ul>
        {" "}
        {Object.values(countries.languages).map((lang, index) => {
          return <li key={index}>{lang}</li>;
        })}
      </ul>
      <img src={countries.flags.png} alt={countries.flags.alt} />
      {weather.length != 0 ? (
        <>
          <h2>Weather in {countries.capital}</h2>
          <p>Temperature: {weather[0]?.app_temp} °C</p>
          <p>Wind speed: {weather[0]?.wind_spd} km/h</p>
          <p>{weather[0]?.weather.description}</p>
          <img src={`https://cdn.weatherbit.io/static/img/icons/${weather[0]?.weather.icon}.png`} />
        </>
      ) : (
        <p>The weather is not available</p>
      )}
    </div>
  );
};

export default CountryCard;
