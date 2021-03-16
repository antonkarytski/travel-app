import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { AppContext } from "./context/AppContext";
import { Route, Switch, NavLink } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { CountryPage } from "./pages/CountryPage";
import { AuthPage } from "./pages/AuthPage";
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

function App() {
  const { token, login, logout, userId } = useAuth();
  const [searchbarState, setSearchbarState] = useState({
    value: "",
    exists: false,
  });
  const { getCountryFromBase, countryResponse } = useCountries();
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "EN"
  );
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
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
        language,
        langSet,
      }}
    >
      <div className={classesCss.Body}>
        <NavBar classes={classesCss.SiteNavBar}>
          {/*activeClassName={classesCss.HiddenMenu}*/}
          <NavLink className={classesCss.LogoLink} to={"/"} exact>
            <div className={classesCss.Logo}>GO TRAVEL!</div>
          </NavLink>

          {searchbarState.exists && (
            <Search
              className={classesCss.SearchBar}
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
          />
          <UserBar
            classes={classesCss.UserBar}
            langExtraData={langExtraData[language]}
          />
        </NavBar>
        <div className={classesCss.SiteContent}>
          <Switch>
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
                  );
                })
              : null}
            <Route path="/admin" exact>
              <AdminPage />
            </Route>

            {
              !isAuthenticated ? (
                <Route path="/login" exact>
                  <AuthPage langExtraData={langExtraData[language]} />
                </Route>
              ) : null //TODO: create route to user page
            }
          </Switch>
        </div>
        <div className={classesCss.SiteFooter}></div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
