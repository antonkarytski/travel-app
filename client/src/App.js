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
<<<<<<< HEAD
import { useCountries } from "./hooks/useHttp";

=======
import { destructCountry, structCountries } from "./helpers/struct";
import classesCss from "./styles/App.module.scss";
import { useCountries } from "./hooks/useHttp";
>>>>>>> travel-app

function App() {
  const { token, login, logout, userId } = useAuth();
  const [searchbarState, setSearchbarState] = useState({
    value: "",
    exists: false,
  });
  const { getCountryFromBase, countryResponse } = useCountries();
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
