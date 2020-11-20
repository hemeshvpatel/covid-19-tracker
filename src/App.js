import React, { useState, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

function App() {
  //hook for countries with a default value of empty array
  const [countries, setCountries] = useState([]);

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

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through all the countries and show a dropdown list of all the options */}

            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }

            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">Option 4</MenuItem> */}
          </Select>
        </FormControl>

        {/* Header */}
        {/* Title + Select input dropdown field */}

        {/* Info Boxes */}
        {/* Info Boxes */}
        {/* Info Boxes */}

        {/* Table */}
        {/* Graph */}

        {/* Map */}
      </div>
    </div>
  );
}

export default App;
