import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "./styles/MainPage.module.scss";

export const MainPage = (props) => {
  return (
    <div className={classesCss.MainPage}>
      {props.countries.map((country, index) => {
        return (
          <div key={`countryCard${index}`}>
            <NavLink
              className={classesCss.CountryCard}
              to={`/country/${country.name.toLowerCase()}`}
            >
              <div>
                <img
                  className={classesCss.CountryCardPhoto}
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
                  alt="flag"
                />
              </div>
              <div>
                {country.name}, {country.capital}
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
