import React, {useState, useEffect} from "react";
import {useAuth} from "./hooks/useAuth";
import {AuthContext} from "./context/AuthContext";
import {Route, Switch, Redirect, NavLink} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import {CountryPage} from "./pages/CountryPage";
import {AuthPage} from "./pages/AuthPage";
import NavBar from "./components/Navigation/NavBar";
import UserBar from "./components/Navigation/UserBar";
import AdminPage from "./pages/AdminPage";
import {Search} from "./components/Search/Search";
import {structCountries} from "./helpers/struct";
import classesCss from "./styles/App.module.scss";
import {useCountries} from "./hooks/useHttp";

function App() {
    const {token, login, logout, userId} = useAuth();
    const [searchbarState, setSearchbarState] = useState({
        value: "",
        exists: false,
    });
    const {getCountryFromBase, countryResponse} = useCountries();
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
            value={{token, login, logout, userId, isAuthenticated}}
        >
            <div className={classesCss.Body}>
                <NavBar classes={classesCss.SiteNavBar}>
                    <NavLink to={"/"} activeClassName={classesCss.HiddenMenu} exact>Main</NavLink>
                    {searchbarState.exists && (
                        <Search
                            className={classesCss.SearchBar}
                            value={searchbarState.value}
                            updateSearchbar={updateSearchBar}
                        />
                    )}
                    <UserBar classes={classesCss.UserBar}/>
                </NavBar>
                <div className={classesCss.SiteContent}>
                    <Switch>
                        <Route path="/" exact>
                            <MainPage
                                searchValue={searchbarState.value}
                                setSearchbarExists={updateSearchBar}
                                countryResponse={countryResponse}
                            />
                        </Route>
                        {
                            countryResponse.countries.map((county, index) => {
                                return(
                                    <Route key={`countryPageIndex${index}`} path="/country/:countryName" exact>
                                        <CountryPage
                                            updateSearchbar={updateSearchBar}
                                        />
                                    </Route>
                                )
                            })
                        }

                        <Route path="/admin" exact>
                            <AdminPage/>
                        </Route>
                        {
                            !isAuthenticated ? (
                                <Route path="/login" exact>
                                    <AuthPage/>
                                </Route>
                            ) : null //TODO: create route to user page
                        }
                    </Switch>
                </div>
                <div className={classesCss.SiteFooter}/>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
