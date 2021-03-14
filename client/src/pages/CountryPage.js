import React, {useEffect, useContext} from "react";
import {useCountries} from "../hooks/useHttp";
import {AppContext} from "../context/AppContext";
import Countries from "../components/Map/countriesShort.json"
import Capitals from "../components/Map/capitals.json"
import Map from "../components/Map/Map";
import {Currency} from "../components/Currency/Currency";
import {Video} from "../components/Video/Video";
import Slider from "../components/Sliders/slider.js"
import SightGallery from "../components/Sliders/sight.gallery.js"
import Weather from '../components/weather/weather.js'
import classesCss from './styles/CountryPage.module.scss'


export const CountryPage = ({updateSearch, country}) => {
    const {language} = useContext(AppContext)
    const {countryResponse, getCountryFromBase} = useCountries()
    const countriesData = Countries;
    const capitalsData = Capitals;

    useEffect(() => {
        updateSearch({exists: false});
        getCountryFromBase({countryCode: country.countryCode, key: 'showplacesOnly'})

    }, []);

    const currentLangData = country.langData.find(langItem => langItem.lang === language)
    console.log(currentLangData)

    return (
        <div className={classesCss.CountryPage}>
            <div className={classesCss.SlideContainer}>
                <Slider slides={country.countryPhotos}/>
                <div className={classesCss.CountryWelcome}>
                    <span className={classesCss.Country}>{currentLangData.countryName.toUpperCase()}</span><br/>
                    <span className={classesCss.Capital}>{currentLangData.capitalName.toUpperCase()}</span>
                </div>
            </div>
            <div className={classesCss.ShowplacesContainer}>
                {
                    countryResponse ? <SightGallery places={countryResponse.showplaces}/> : null
                }
            </div>
            <div className={classesCss.InfoContainer}>
                <Map
                    countries={countriesData}
                    countryCode={country.countryCode}
                    capitals={capitalsData}
                    className={classesCss.MapContainer}
                    mapClassName={classesCss.Map}
                />
                <div className={classesCss.Description}>
                    <div className={classesCss.DescText}>
                        {currentLangData.description}
                    </div>
                    <Video
                        countryCode={country.countryCode}
                        video={currentLangData.video}
                        className={classesCss.VideoBlock}
                    />
                </div>
            </div>


            {/*<Currency countryCode={country.countryCode}/>*/}
            {/*<Weather country={country}/>*/}

        </div>
    );
};