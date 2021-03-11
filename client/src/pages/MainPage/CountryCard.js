import React from 'react'
import classesCss from './styles/MainPage.module.scss'
import {NavLink} from "react-router-dom";


const CountryCard = ({name, capital, preview, to, hoverHandler}) => {


    const style = {
        backgroundImage: `url(${preview})`,
        backgroundSize: 'cover'
    }

    const capitalStringStyle = {}
    if(capital.length > 12)capitalStringStyle.fontSize = '30px'
    return (

        <div
            style={style}
            className={classesCss.CountryCard}
        >
            <NavLink to={to}>
                <span>{`${name},`}</span>
                <span style={capitalStringStyle}>{capital}</span>
            </NavLink>
        </div>
    )
}

export default CountryCard