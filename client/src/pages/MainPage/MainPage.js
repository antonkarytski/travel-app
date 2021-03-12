import React, {useEffect} from "react";
import classesCss from "./styles/MainPage.module.scss";
import CountryCard from "./CountryCard";

const MainPage = ({
                      searchValue,
                      setSearchExists,
                      countryResponse,
                      language,
                  }) => {
    let countries;
    if (countryResponse) {
        let indexOfLang = countryResponse.langs.indexOf(language);
        countries = countryResponse.countries.map((country) =>
            Object.assign({}, country.langData[indexOfLang], {
                preview: country.preview,
                linkName: country.langData[0].countryName,
            })
        );
    }

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
                    key={`countryCard${index}`}
                    name={country.countryName}
                    capital={country.capitalName}
                    preview={country.preview}
                    to={`/country/${country.linkName
                        .toLowerCase()
                        .replace(/[-\s]/g, "_")}`}
                    engName={country.linkName}
                />
            );
        });
    };

    useEffect(() => {
        setSearchExists({exists: true});
    }, []);

    return (
        <div className={classesCss.MainPage}>
            {countries && filterCountries([...countries])}
        </div>
    );
};

export default MainPage;
