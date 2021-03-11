import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { CountryPage } from "./pages/CountryPage";
import { AuthPage } from "./pages/AuthPage";
import NavBar from "./components/Navigation/NavBar";
import UserBar from "./components/Navigation/UserBar";
import AdminPage from "./pages/AdminPage";
import { Search } from "./components/Search/Search";
import { destructCountry, structCountries } from "./helpers/struct";
import classesCss from "./styles/App.module.scss";
import { useCountries } from "./hooks/useHttp";
import { SelectLanguage } from "./components/SelectLanguage/SelectLanguage";

function App() {
  const { token, login, logout, userId } = useAuth();
  const [searchbarState, setSearchbarState] = useState({
    value: "",
    exists: false,
  });
  const { getCountryFromBase, countryResponse, cLoading } = useCountries();
  const [languageState, setLanguageState] = useState("EN");
  const isAuthenticated = !!token;

  const updateSearchBar = (update) => {
    const newState = {
      ...searchbarState,
      ...update,
    };
    setSearchbarState(newState);
  };

  useEffect(() => {
    getCountryFromBase({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <div className={classesCss.Body}>
        <NavBar classes={classesCss.SiteNavBar}>
          <NavLink to={"/"}>Main</NavLink>
          {searchbarState.exists && (
            <Search
              value={searchbarState.value}
              updateSearchbar={updateSearchBar}
            />
          )}
          <SelectLanguage
            countryResponse={countryResponse}
            language={languageState}
            setLanguage={setLanguageState}
          />
          <UserBar classes={classesCss.UserBar} />
        </NavBar>
        <div className={classesCss.SiteContent}>
          <Switch>
            <Route path="/country/:countryName" exact>
              <CountryPage updateSearchbar={updateSearchBar} />
            </Route>
            <Route path="/admin" exact>
              <AdminPage />
            </Route>
            <Route
              path="/"
              exact
              render={() => (
                <MainPage
                  searchValue={searchbarState.value}
                  setSearchbarExists={updateSearchBar}
                  countryResponse={countryResponse}
                  language={languageState}
                />
              )}
            />
            {
              !isAuthenticated ? (
                <Route path="/login" exact>
                  <AuthPage />
                </Route>
              ) : null //TODO: create route to user page
            }
          </Switch>
        </div>
        <div className={classesCss.SiteFooter}></div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
