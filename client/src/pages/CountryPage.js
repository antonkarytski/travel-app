import React from 'react'
import Map from '../components/Map/Map'
import Countries from "../components/Map/countries.json"
import Capitals from "../components/Map/capitals.json"

export const CountryPage = (props) => {

    const countriesData = Countries; // заменить скаченным файлом JSSON с  сервера
    const capitalsData = Capitals; // заменить скаченным файлом JSSON с  сервера
    const countryCode = 'NL' // входящий параметр при смене языка, ожидаю код страны из двух букв

    // const toHomePage = () => {
    //     props.history.push({
    //         pathname: "/"
    //     })
    // }


    return(
        <div>
            <h1>Country Page</h1>
            <button
                //onClick={toHomePage}
            >Back
            </button>
            <Map countries={countriesData} countryCode={countryCode} capitals={capitalsData}/>
            
        </div>
    )
}