
import Map from "../components/Map/Map";
import Countries from "../components/Map/countries.json";
import Capitals from "../components/Map/capitals.json";
import React, { useEffect } from "react";
import Slider from "../components/Sliders/slider.js"
import SightGallery from "../components/Sliders/sight.gallery.js"
import 'swiper/swiper.scss';

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

  return (
    <div>
      <h1>Country Page</h1>
      <button
      //onClick={toHomePage}
      >
        Back
      </button>
      <Slider/>
      <Map
        countries={countriesData}
        countryCode={countryCode}
        capitals={capitalsData}
      />
      <SightGallery/>
    </div>
  );
};