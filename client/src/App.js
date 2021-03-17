import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { AppContext } from "./context/AppContext";
import { Route, Switch, NavLink } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import {CountryPage} from "./pages/CountryPage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/Navigation/NavBar";
import UserBar from "./components/Navigation/UserBar";
import AdminPage from "./pages/AdminPage/AdminPage";
import { Search } from "./components/Search/Search";
import { useCountries } from "./hooks/useHttp";
import { SelectLanguage } from "./components/SelectLanguage/SelectLanguage";
import classesCss from "./styles/App.module.scss";

const langSet = {
  EN: "English",
  RU: "Russian",
  FR: "France",
};

const langExtraData = {
  EN: {
    placeholder: "Search country",
    signIn: "Sign in",
    logOut: "Log out",
    logIn: "Login",
    password: "Password",
    signInConfirm: "Sign In",
    signUpConfirm: "Sign Up",
  },
  RU: {
    placeholder: "Найти страну",
    signIn: "Вход",
    logOut: "Выход",
    login: "Логин",
    password: "Пароль",
    signInConfirm: "Войти",
    signUpConfirm: "Зарегистрироваться",
  },
  FR: {
    placeholder: "Rechercher un pays",
    signIn: "S'identifier",
    logOut: "Se déconnecter",
    logIn: "Login",
    password: "Le mot de passe",
    signInConfirm: "Se connecter",
    signUpConfirm: "S'inscrire",
  },
};


function App() {
  const { token, login, logout, userId, userData, updateData} = useAuth();
  const [searchbarState, setSearchbarState] = useState({
    value: "",
    exists: false,
  });
  const { getCountryFromBase, countryResponse } = useCountries();
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "EN"
  );

  const isAuthenticated = !!token;

    const updateSearch = (update) => {
        const newState = {
            ...searchbarState,
            ...update,
        };
        setSearchbarState(newState);
    };

    const getCountryPathName = (country) => {
        const engIndex = country.langData.findIndex((lang) => {
            return lang.lang === "EN";
        });
        return (
            "/country/" +
            country.langData[engIndex].countryName.toLowerCase().replace(/[-\s]/, "_")
        );
    };

    useEffect(() => {
        getCountryFromBase({});
    }, [getCountryFromBase]);

  return (
    <AppContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        userData,
        updateData,
        isAuthenticated,
        language,
        langSet,
      }}
    >
      <div className={classesCss.Body}>
        <NavBar classes={classesCss.SiteNavBar}>
          <NavLink className={classesCss.LogoLink} to={"/"} exact>
            <div className={classesCss.Logo}>GO TRAVEL!</div>
          </NavLink>

          {searchbarState.exists && (
            <Search
              className={classesCss.SearchBar}
              classes={{
                searchButton: classesCss.SearchButton,
                closeButton: classesCss.CloseButton
              }}
              value={searchbarState.value}
              updateSearch={updateSearch}
              placeholderValue={langExtraData[language].placeholder}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          )}

          <SelectLanguage
            countryResponse={countryResponse}
            language={language}
            setLanguage={setLanguage}
            className={classesCss.SelectLanguage}
            classes={{
              menuItem: classesCss.LangMenuItem,
              dropdown: classesCss.LangMenuDropdown,
              control: classesCss.LangMenuControl,
              //input: classesCss.LangMenuControl,
            }}
          />
          <UserBar
              classes={{
                wrap: classesCss.UserBar,
                logButton: classesCss.LogButton,
                avatar: classesCss.Avatar
              }}
            langExtraData={langExtraData[language]}
          />
        </NavBar>
        <div className={classesCss.SiteContent}>
          <Switch>
            <Route path="/admin" exact>
              <AdminPage />
            </Route>

            {countryResponse
              ? countryResponse.countries.map((country, index) => {
                  return (
                    <Route
                      key={`countryPageIndex${index}`}
                      path={getCountryPathName(country)}
                      exact
                    >
                      <CountryPage
                        country={country}
                        updateSearch={updateSearch}
                      />
                    </Route>
                  )
                }) : null
            }
            {
              isAuthenticated ?
                  <Route path="/user" exact>
                    <UserPage
                        updateSearch={updateSearch}
                    />
                  </Route> :
                  <Route path="/login" exact>
                    <AuthPage
                        updateSearch={updateSearch}
                        langExtraData={langExtraData[language]}
                    />
                  </Route>
            }
            <Route path="/" exact>
              <MainPage
                  searchValue={searchbarState.value}
                  setSearchExists={updateSearch}
                  countryResponse={countryResponse}
                  language={language}
                  isSearching={isSearching}
                  setIsSearching={setIsSearching}
              />
            </Route>
          </Switch>
        </div>
        <div className={classesCss.SiteFooter}>

        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
