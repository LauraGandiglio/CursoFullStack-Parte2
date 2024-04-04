import { useState, useEffect } from "react";
import countriesServices from "./services/countries";
import "./index.css";

import CountryCard from "./components/CountryCard";
import Country from "./components/Country";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    countriesServices.getAllCountries().then((response) => {
        console.log("all countries promise fulfilled");
        setAllCountries(response);
      })
      .catch((e) => console.log("error geting all countries"))
  }, []);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const filteredCountries = allCountries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
  );

  return (
    <>
      <h1>Countries Wiki</h1>
      <div>
        Find countries <input value={newFilter} onChange={handleFilterChange} />
        {filteredCountries.length == 1 ? (
          <CountryCard countries={filteredCountries[0]} />
        ) : filteredCountries.length < 10 ? (
          <>
            {filteredCountries.map((country) => {
              return (
                <div key={country.name.common}>
                  <p>
                    {country.name.common}{" "}
                    <button
                      onClick={() => {
                        setCountries(country);
                        setShow(!show);
                      }}
                    >
                      {show && countries.name.common === country.name.common
                        ? "close"
                        : "show"}
                    </button>
                  </p>
                  {show &&
                  countries.length !== 0 &&
                  countries.name.common === country.name.common ? (
                    <Country country={countries} />
                  ) : null}
                </div>
              );
            })}
          </>
        ) : newFilter === "" ? (
          <p></p>
        ) : (
          <p>Too many matches, please specify another filter</p>
        )}
      </div>
    </>
  );
};

export default App;
