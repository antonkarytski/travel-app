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
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let weekDate = today.toLocaleDateString(`${translation[language]}`, options)



    function addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }



    useEffect(() => {
        let interval = setInterval(() => {

            let today = new Date();
            let hour = today.getHours();
            let min = today.getMinutes();
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
