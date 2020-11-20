import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card } from '@material-ui/core';
import './App.css';
import './InfoBox.js';
import InfoBox from './InfoBox.js';
import Map from './Map';
import Table from './Table'
import { sortData } from './util'

function App() {
  //hook for countries with a default value of empty array
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  //use disease.sh request to get list of countries
  //Request URL: https://disease.sh/v3/covid-19/countries

  //This will run once when the component loads
  useEffect(() => {
    //async -> send request to server, wait for it, do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //console.log("getCountriesData ---> ", data)
          const countries = data.map((country) => (
            {
              key: country.countryInfo.iso3, //give unique id
              name: country.country, // United States, United Kingdom
              value: country.countryInfo.iso2 // UK, USA, FR etc.
            }
          ))

          const sortedData = sortData(data)
          setTableData(sortedData)
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

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      });
  };

  console.log("COUNTRY INFO --> ", countryInfo)

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          {/* Title + Select input dropdown field */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries and show a dropdown list of all the options */}
              {
                countries.map(country => {
                  //console.log("country --> ", country);
                  return <MenuItem key={country.key} value={country.value}>{country.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        {/* Info Boxes */}
        <div className="app__stats">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map>

        </Map>
      </div>

      <Card className="app__right">
        {/* Table */}
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}></Table>

        {/* Graph */}
        <h3>Worldwide New Cases</h3>

      </Card>
    </div>
  );
}

export default App;
