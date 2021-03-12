import React, {useEffect, useContext} from "react";
import {AppContext} from "../context/AppContext";
import Map from "../components/Map/Map";
import Countries from "../components/Map/countries.json";
import Capitals from "../components/Map/capitals.json";
import Slider from "../components/Sliders/slider.js"
import SightGallery from "../components/Sliders/sight.gallery.js"


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
            <Slider/>

            <SightGallery/>
            <Map
                countries={countriesData}
                countryCode={country.countryCode}
                capitals={capitalsData}
            />
        </div>
    );
};