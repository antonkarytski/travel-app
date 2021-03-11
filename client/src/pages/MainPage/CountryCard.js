import React from 'react'
import classesCss from './styles/MainPage.module.scss'
import {NavLink} from "react-router-dom";


const CountryCard = ({name, capital, preview, to}) => {
    const style = {
        backgroundColor: "blue",

        backgroundImage: `url(${preview})`,
        backgroundSize: 'cover'
    }
    return (

        <div style={style} className={classesCss.CountryCard}>
            <NavLink to={to}>
                {
                    `${name}, ${capital}`
                }
            </NavLink>
        </div>
    )
}

export default CountryCard