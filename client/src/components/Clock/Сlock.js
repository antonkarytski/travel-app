import React, {useContext, useEffect, useState } from "react";
import {AppContext} from "../../context/AppContext";

export default function ShowTime(props) {
    const {language} = useContext(AppContext)
    const [date, setDate] = useState('')
    const translation = {
        'RU': 'ru-RU',
        'EN': 'en-US',
        'FR': 'fr-FR'
    }
    let currentCity = props.country.langData[0].capitalName
    const utcZone = {
        'Brasilia': -3,
        'Reykjavik': 0,
        'Paris': 1,
        'Bern': 1,
        'Oslo': 1,
        'Zagreb': 1,
        'Sri Jayawardenepura Kotte': [5, 30],
        'Bangkok': 7,
        'Manila': 8,
        'Tokyo': 9,
        'Wellington': 13,
    }

    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let weekDate = today.toLocaleDateString(`${translation[language]}`, options)
    let currentUTC = utcZone[currentCity]



    function addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }



    useEffect(() => {
        let interval = setInterval(() => {

            let today = new Date();


            if (Array.isArray(currentUTC)) {
                today.setTime(today.getTime() + currentUTC[0] * 1000 * 60 * 60 + currentUTC[1] * 1000 * 60);
            } else {
                today.setTime(today.getTime() + currentUTC * 1000 * 60 * 60)

            }

            let hour = today.getUTCHours();
            let min = today.getUTCMinutes();
            let sec = today.getSeconds();


            setDate(`${addZero(hour)}:${addZero(min)}:${addZero(sec)}`)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={props.className}>
            <div className={props.timeClassName}>{date}</div>
            <div className={props.dateClassName}>{weekDate}</div>
        </div>
    )

  }
