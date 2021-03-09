import React from 'react'
import {NavLink} from 'react-router-dom'
import classesCss from './styles/Pages.module.scss'
import Map from '../components/Map/Map'

export const MainPage = () => {

    const countries = [
        {name: 'Belarus',},
        {name: 'Russia',},
        {name: 'France'},
        {name: 'Spain'}
    ]


    return (
        <div>
            {
                countries.map((country, index) => {
                    return (
                        <div
                            key={`countryCard${index}`}
                            className={classesCss.CountryCard}>
                            <NavLink
                                to={`/country/${country.name.toLowerCase()}`}>
                                {country.name}
                            </NavLink>
                            <Map />
                        </div>
                    )

                })
            }
        </div>
    )
}