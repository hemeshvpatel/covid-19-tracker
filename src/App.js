import React, { useState, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import './InfoBox.js'
import InfoBox from './InfoBox.js';

function App() {
  //hook for countries with a default value of empty array
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  //use disease.sh request to get list of countries
  //Request URL: https://disease.sh/v3/covid-19/countries

  //This will run once when the component loads
  useEffect(() => {
    //async -> send request to server, wait for it, do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom
              value: country.countryInfo.iso2 // UK, USA, FR etc.
            }
          ))
          setCountries(countries);
        })
    }
    getCountriesData();
  }, [])
  //^ you can put something in the [] if you want it to run again when something else updates

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //console.log("current countryCode = ", countryCode)

    setCountry(countryCode);
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>

        {/* Title + Select input dropdown field */}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* Loop through all the countries and show a dropdown list of all the options */}
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      {/* Info Boxes */}
      <div className="app__stats">
        <InfoBox title="Coronavirus cases" cases={123} total={2000} />
        <InfoBox title="Recovered" cases={143} total={2000} />
        <InfoBox title="Deaths" cases={14378} total={2000} />
      </div>


      {/* Table */}
      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
