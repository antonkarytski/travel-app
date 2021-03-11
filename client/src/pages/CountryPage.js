
import React from 'react';
import Slider from './../components/Sliders/slider';

const imagesArr = [
    {
        url: 'imageUrl1'
    },
    {
        url: 'imageUrl2'
    },
    {
        url: 'imageUrl3'
    }
];
import React, { useEffect } from "react";


export const CountryPage = (props) => {
  const countriesData = Countries; // заменить скаченным файлом JSON с  сервера
  const capitalsData = Capitals; // заменить скаченным файлом JSON с  сервера
  const countryCode = "NL"; // входящий параметр при смене языка, ожидаю код страны из двух букв

  // const toHomePage = () => {
  //     props.history.push({
  //         pathname: "/"
  //     })
  // }

  useEffect(() => {
    props.updateSearchbar({ exists: false });
  }, []);



    return(
        <div>
            <h1>Country Page</h1>
            <Slider images={imagesArr}/>
            <button
                //onClick={toHomePage}
            >Back
            </button>
        </div>
    )
}

  return (
    <div>
      <h1>Country Page</h1>
      <button
      //onClick={toHomePage}
      >
        Back
      </button>
      <Map
        countries={countriesData}
        countryCode={countryCode}
        capitals={capitalsData}
      />
    </div>
  );


