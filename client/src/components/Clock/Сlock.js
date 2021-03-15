import React, { useEffect, useState } from "react";

export default function ShowTime(props) {
    const [date, setDate] = useState('')
    let currentCity = props.country.langData[0].capitalName
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let weekDate = today.toLocaleDateString('en-US', options)



    function addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }



    useEffect(() => {
        let interval = setInterval(() => {

            let today = new Date();
            let hour = today.getHours();
            let min = today.getMinutes();
            let sec = today.getSeconds();

            setDate(`${hour}:${addZero(min)}:${addZero(sec)}`)
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
