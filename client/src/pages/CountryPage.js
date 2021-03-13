import React, {useEffect, useContext} from "react";
import {AppContext} from "../context/AppContext";
import Countries from "../components/Map/countriesShort.json"
import Capitals from "../components/Map/capitals.json"
import Map from "../components/Map/Map";
import {Currency} from "../components/Currency/Currency";
import Slider from "../components/Sliders/slider.js"
import SightGallery from "../components/Sliders/sight.gallery.js"


export const CountryPage = ({updateSearch, country}) => {
    const appContext = useContext(AppContext)
    const countriesData = Countries; // заменить скаченным файлом JSON с  сервера
    const capitalsData = Capitals; // заменить скаченным файлом JSON с  сервера
    const showPlaces = [
      {
        prevPhoto: 'https://www.abcfact.ru/upload/001/u107/226/62ff2bab.jpg',
        fullPhoto: 'https://otdyhateli.com/wp-content/uploads/2016/03/fiord1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
      prevPhoto: 'https://www.abcfact.ru/upload/001/u107/226/62ff2bab.jpg',
      fullPhoto: 'https://otdyhateli.com/wp-content/uploads/2016/03/fiord1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
      prevPhoto: 'https://www.abcfact.ru/upload/001/u107/226/62ff2bab.jpg',
      fullPhoto: 'https://otdyhateli.com/wp-content/uploads/2016/03/fiord1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    ]


    useEffect(() => {
        updateSearch({exists: false});
    }, []);

    return (
        <div>
            <Slider country={country}/>

            <SightGallery places={showPlaces}/>
            <Map
                countries={countriesData}
                countryCode={country.countryCode}
                capitals={capitalsData}
            />
            <Currency countryCode={country.countryCode}/>
        </div>
    );
};