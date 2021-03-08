import React, { useState } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import classesCss from "./styles/App.module.scss";
import { MainPage } from "./pages/MainPage";
import { CountryPage } from "./pages/CountryPage";
import { AuthPage } from "./pages/AuthPage";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import NavBar from "./components/Navigation/NavBar";
import UserBar from "./components/Navigation/UserBar";
import AdminPage from "./pages/AdminPage";
import { Search } from "./components/Search/Search";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const [searchbarState, setSearchbarState] = useState();
  const countries = [
    { name: "Belarus", capital: "Minsk" },
    { name: "Russia", capital: "Moscow" },
    { name: "France", capital: "Paris" },
    { name: "Spain", capital: "Madrid" },
    { name: "Germany", capital: "Berlin" },
    { name: "Ukraine", capital: "Kiev" },
    { name: "Italy", capital: "Rome" },
    { name: "Sweden", capital: "Stockholm" },
  ];

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <div className={classesCss.Body}>
        <NavBar classes={classesCss.SiteNavBar}>
          <NavLink to={"/"}>Main</NavLink>
          <Search
            countries={countries}
            searchbarState={searchbarState}
            setSearchbarState={setSearchbarState}
          />
          <UserBar classes={classesCss.UserBar} />
        </NavBar>
        <div className={classesCss.SiteContent}>
          <Switch>
            <Route path="/country/:countryName" exact>
              <CountryPage />
            </Route>
            <Route path="/admin" exact>
              <AdminPage />
            </Route>
            <Route
              path="/"
              exact
              render={() => (
                <MainPage
                  countries={countries}
                  searchbarState={searchbarState}
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
            <Redirect to="/" />
          </Switch>
        </div>
        <div className={classesCss.SiteFooter}></div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
