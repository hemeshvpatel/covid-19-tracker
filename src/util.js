import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        multiplier: 800,
        option: { color: "#cc1034", fillColor: "#cc1034" },
    },
    recovered: {
        multiplier: 1200,
        option: { color: "#7dd71d", fillColor: "#7dd71d" },
    },
    deaths: {
        multiplier: 2000,
        option: { color: "#ff6c47", fillColor: "#ff6c47" }
    },
};

export const sortData = (data) => {
    const sortedData = [...data];

    // sortedData.sort((a, b) => {
    //     if (a.cases > b.cases) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // })
    // return sortedData;

    //the above sort function refactored below:

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
        <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={casesTypeColors[casesType].option}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));
