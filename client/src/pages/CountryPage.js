import React, {useEffect, useContext} from "react";
import {AppContext} from "../context/AppContext";
import Countries from "../components/Map/countriesShort.json"
import Capitals from "../components/Map/capitals.json"
import Map from "../components/Map/Map";
import {Currency} from "../components/Currency/Currency";
// import Slider from "../components/Sliders/slider.js"
// import SightGallery from "../components/Sliders/sight.gallery.js"


export const CountryPage = ({updateSearch, country}) => {
    const countriesData = Countries; // заменить скаченным файлом JSON с  сервера
    const capitalsData = Capitals; // заменить скаченным файлом JSON с  сервера
    const appContext = useContext(AppContext)

    console.log(capitalsData)


    useEffect(() => {
        updateSearch({exists: false});
    }, []);

    return (
        <div>
            {/* <Slider/>

            <SightGallery/> */}
            <Map
                countries={countriesData}
                countryCode={country.countryCode}
                capitals={capitalsData}
            />
            <Currency countryCode={country.countryCode}/>
        </div>
    );
};