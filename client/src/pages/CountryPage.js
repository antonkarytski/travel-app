import Countries from "../components/Map/countriesShort.json"
import Capitals from "../components/Map/capitals.json"
import React, {useEffect} from "react";
import Map from "../components/Map/Map";
import Slider from "../components/Sliders/slider.js"
import SightGallery from "../components/Sliders/sight.gallery.js"



export const CountryPage = ({updateSearch, country}) => {
    const countriesData = Countries; // заменить скаченным файлом JSON с  сервера
    const capitalsData = Capitals; // заменить скаченным файлом JSON с  сервера

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