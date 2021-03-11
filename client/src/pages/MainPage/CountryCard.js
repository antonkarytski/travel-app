import React from 'react'


const CountryCard = ({name, capital, image}) => {
    return(
        <div style={{backgroundColor: "blue", width: '300px', height: '400px', marginBottom: '10px'}}>
            {
                `${name}, ${capital}`
            }

        </div>
    )
}

export default CountryCard