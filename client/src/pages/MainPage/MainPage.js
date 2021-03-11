import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import classesCss from "./styles/MainPage.module.scss";
import CountryCard from "./CountryCard";

const MainPage = ({searchValue, setSearchbarExists, countryResponse}) => {
    const language = "EN";

    let countries;
    if (countryResponse) {
        let indexOfLang = countryResponse.langs.indexOf(language);
        countries = countryResponse.countries.map(
            (country) => country.langData[indexOfLang]
        );
    }

    const hoverHandler = (event) => {
        console.log(event)
    }

    //REMOVE WHEN MADE COUNTRY PREVIEW TRANSFER TO COUNTRY CARD
    let countryPreviews = [];
    if (countryResponse) {
        console.log(countryResponse);
        countryPreviews = countryResponse.countries.map((country) => {
            return country.preview;
        });
    }

    //REMOVE

    const filterCountries = (countries) => {
        let filteredCountries = countries;
        if (searchValue) {
            filteredCountries = countries.filter(
                (country) =>
                    country.countryName.toLowerCase().includes(searchValue) ||
                    country.capitalName.toLowerCase().includes(searchValue)
            );
        }

        return filteredCountries.map((country, index) => {
            return (
                <CountryCard
                    hoverHandler={hoverHandler}
                    key={`countryCard${index}`}
                    name={country.countryName}
                    capital={country.capitalName}
                    preview={countryPreviews[index]} //Сюда надо передать Превью!
                    to={`/country/${country.countryName.toLowerCase()}`}
                />
            );
        });
    };

    useEffect(() => {
        setSearchbarExists({exists: true});
    }, []);

    return (
        <div
            className={classesCss.MainPage}
        >
            {countries && filterCountries([...countries])}

        </div>
    );
};

export default MainPage;
