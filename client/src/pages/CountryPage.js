import Map from '../components/Map/Map'
import Countries from "../components/Map/countriesShort.json"
import Capitals from "../components/Map/capitals.json"
import React, { useEffect } from "react";

export const CountryPage = (props) => {
    const countriesData = Countries; // заменить скаченным файлом JSON с  сервера
    const capitalsData = Capitals; // заменить скаченным файлом JSON с  сервера
    const countryCode = 'FR' // входящий параметр при смене языка, ожидаю код страны из двух букв

    // console.log(countriesData)
    // const toHomePage = () => {
    //     props.history.push({
    //         pathname: "/"
    //     })
    // }

    useEffect(() => {
        props.setSearchbarExists(false);
    }, []);

  return (
    <div>
      <h1>Country Page</h1>
      <button
      //onClick={toHomePage}
      >
        Back
      </button>
      <Map countries={countriesData} countryCode={countryCode} capitals={capitalsData}/>
    </div>
  );
};
