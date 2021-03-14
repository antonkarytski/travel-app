import React, {useContext, useEffect, useState} from "react";
import "./owfont-master/css/owfont-regular.css";
import {AppContext} from "../../context/AppContext";

export default function Weather({city, classes}) {
    const API_KEY = '9c5da7e0baec7ef80674d09f43a9840d';
    const {language} = useContext(AppContext)
    const [temperature, setTemperature] = useState(null)
    const [weatherDescription, setWeatherDescription] = useState(null)
    const [humidity, setHumidity] = useState(null)
    const [speedWind, setSpeedWind] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState(null)

    async function getWeater() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        setTemperature(`${data.main.temp.toFixed(0)}°C`);
        setWeatherDescription(data.weather[0].description);
        setHumidity(`Humidity: ${data.main.humidity}%`);
        setSpeedWind(`Wind: ${data.wind.speed} m/s`);
        setWeatherIcon(`${data.weather[0].id}`)
    }

    useEffect(() => {
        getWeater();
    }, [language]);

    return (
        <div className={classes?.wrap}>
            <div className={classes?.temperature}>{temperature}</div>
            <div className={[`owf owf-${weatherIcon}`, classes?.icon].join(' ')} />
            <div className={classes?.weatherDescription}>{weatherDescription}</div>
            <div className={classes?.humidity}>{humidity}</div>
            <div className={classes?.speedWind}>{speedWind}</div>
        </div>

    )
}