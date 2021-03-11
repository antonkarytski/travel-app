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
        <div key={`countryCard${index}`}>
          <NavLink
            className={classesCss.CountryCard}
            to={`/country/${country.countryName.toLowerCase()}`}
          >
            <CountryCard
                name={country.countryName}
                capital={country.capitalName}
                countryImage={false} //Сюда надо передать Превью!
            />
          </NavLink>
        </div>
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