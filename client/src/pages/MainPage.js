import React from 'react'
import {NavLink} from 'react-router-dom'
import classesCss from './styles/Pages.module.scss'

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
                        </div>
                    )

                })
            }
        </div>
    )
}