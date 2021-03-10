import React from 'react'
import Map from '../components/Map/Map'

export const CountryPage = (props) => {

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
            <Map />
        </div>
    )
}