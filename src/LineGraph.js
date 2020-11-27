import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"
import numeral from "numeral"

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 1,
        },
        line: {
            borderColor: `#cc1034`,
            borderWidth: 1
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [
            {
                gridLine: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}

const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
}

const buildChartDataCountry = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    //console.log("buildChartDataCountry ", data)
    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
}

function LineGraph({ casesType = "cases", inputCountry = "worldwide", ...props }) {
    const [data, setData] = useState({})
    //console.log("LineGraph - Props = ", props)

    let url =
        inputCountry === "worldwide"
            ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
            : `https://disease.sh/v3/covid-19/historical/${inputCountry}?lastdays=120`;

    //console.log("url -------> ", url)

    useEffect(() => {
        const fetchData = async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    //console.log("LineGraph Data -->", data)
                    let chartData;
                    inputCountry === "worldwide" ? chartData = buildChartData(data, casesType) : chartData = buildChartDataCountry(data.timeline, casesType);
                    setData(chartData)
                    //console.log("chartData ---> ", chartData);
                });
        }
        fetchData();
    }, [casesType, inputCountry, url])

    return (
        <div className={props.className}>

            {/* If data is defined then display line graph (due to fetch) */}
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [{
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            bordercolor: "#CC1034",
                            data: data
                        }]
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph
