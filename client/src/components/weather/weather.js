import React, {useContext, useEffect, useState} from "react";
import "./owfont-master/css/owfont-regular.css";
import {AppContext} from "../../context/AppContext";

export default function Weather({city, classes}) {
    const API_KEY = '9c5da7e0baec7ef80674d09f43a9840d';
    const {language} = useContext(AppContext)
    const [weatherObject, setWeatherObject] = useState({})


    const translation = {
        'RU': {
            humidity: 'Влажность',
            wind: 'Ветер',
        },
        'EN': {
            humidity: 'Humidity',
            wind: 'Wind',
        },
        'FR': {
            humidity: 'Humidité',
            wind: 'Vent',
        }
    }

    async function getWeater() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
		setWeatherObject(
                {temperature: `${data.main.temp.toFixed(0)}°C`,
                weatherDescription:`${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.slice(1)}`,
                humidity:`${translation[language].humidity}: ${data.main.humidity}%`,
                speedWind:`${translation[language].wind}: ${data.wind.speed} m/s`,
                weatherIcon:`${data.weather[0].id}`
                }
            )
    }



    useEffect(() => {
        getWeater();
    }, [language]);




    return (
        <div className={classes?.wrap}>
            <div className={classes?.temperature}>{weatherObject.temperature}</div>
            <div className={[`owf owf-${weatherObject.weatherIcon}`, classes?.icon].join(' ')} />
            <div className={classes?.weatherDescription}>{weatherObject.weatherDescription}</div>
            <div className={classes?.humidity}>{weatherObject.humidity}</div>
            <div className={classes?.speedWind}>{weatherObject.speedWind}</div>
        </div>

    )
}