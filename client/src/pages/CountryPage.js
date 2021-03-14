import Countries from "../components/Map/countriesShort.json"
import Capitals from "../components/Map/capitals.json"
import React, {useEffect} from "react";
import Map from "../components/Map/Map";
import {Currency} from "../components/Currency/Currency";
import {Video} from "../components/Video/Video";
import Slider from "../components/Sliders/slider.js"
import SightGallery from "../components/Sliders/sight.gallery.js"
import Weather from '../components/weather/Weather.js'
import ShowTime from '../components/Clock/Сlock.js'


export const CountryPage = ({updateSearch, country, language}) => {
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
            <ShowTime country={country}/>
            <SightGallery places={showPlaces}/>
            <Map
                countries={countriesData}
                countryCode={country.countryCode}
                capitals={capitalsData}
            />

            <Currency countryCode={country.countryCode}/>
            <Weather country={country}/>
            <Video countryCode={country.countryCode}/>
        </div>
    );
};