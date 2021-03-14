import React, { useEffect, useState } from "react";
import "./owfont-master/css/owfont-regular.css";

export default function Weather (props) {
    const API_KEY = '9c5da7e0baec7ef80674d09f43a9840d';
    let currentCity = props.country.langData[0].capitalName
    let currentLanguage ="ru"

    const [temperature, setTemperature] = useState(null)
    const [weatherDescription, setWeatherDescription] = useState(null)
    const [humidity, setHumidity] = useState(null)
    const [speedWind, setSpeedWind] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState(null)

    async function getWeater() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&lang=${currentLanguage}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        setTemperature (`${data.main.temp.toFixed(0)}°C`);
        setWeatherDescription(data.weather[0].description);
        setHumidity(`Humidity: ${data.main.humidity}%`) ;
        setSpeedWind(`Wind: ${data.wind.speed} m/s`);
        setWeatherIcon(`${data.weather[0].id}`)
    }
      /// раскомментировать перед сдачей проекта, иначе закончится количетсво бесплатных попыток отправки api
        // useEffect(() => {
        //     getWeater();
        // }, []);

    return (
        <div>
            <div className={`owf owf-3x owf-pull-left owf-border owf-${weatherIcon}`}></div>
            <div>{temperature}</div>
            <div>{weatherDescription}</div>
            <div>{humidity}</div>
            <div>{speedWind}</div>
        </div>

    )
}