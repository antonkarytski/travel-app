import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classesCss from "./styles/MainPage.module.scss";
import CountryCard from "./CountryCard";

const MainPage = ({searchBarValue, setSearchbarExists, countryResponse}) => {

  const language = "RU";

  let countries;
  if (countryResponse) {
    let indexOfLang = countryResponse.langs.indexOf(language);
    countries = countryResponse.countries.map(
      (country) => country.langData[indexOfLang]
    );
  }

  //REMOVE WHEN MADE COUNTRY PREVIEW TRANSFER TO COUNTRY CARD
  let countryPreviews = []
  if(countryResponse){
    console.log(countryResponse)
    countryPreviews = countryResponse.countries.map((country) => {
      return country.preview
    })
  }



  //REMOVE




  const filterCountries = (countries) => {
    let filteredCountries = countries;
    if (searchBarValue) {
      filteredCountries = countries.filter(
        (country) =>
          country.countryName.toLowerCase().includes(searchBarValue) ||
          country.capitalName.toLowerCase().includes(searchBarValue)
      );
    }

    return filteredCountries.map((country, index) => {
      return (
            <CountryCard
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
    setSearchbarExists({exist:true});
  }, []);

  return (
    <div className={classesCss.MainPage}>
      {countries && filterCountries([...countries])}
    </div>
  )
}

export default MainPage