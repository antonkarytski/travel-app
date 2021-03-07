import React from 'react'
import {Route, Switch, Redirect, NavLink} from "react-router-dom"
import classesCss from './styles/App.module.scss'
import {MainPage} from "./pages/MainPage";
import {CountryPage} from "./pages/CountryPage";
import {AuthPage} from "./pages/AuthPage";
import {useAuth} from "./hooks/useAuth";
import {AuthContext} from "./context/AuthContext";
import NavBar from "./components/Navigation/NavBar";
import UserBar from "./components/Navigation/UserBar";
import AdminPage from "./pages/AdminPage";


function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <div className={classesCss.Body}>
                <NavBar classes = {classesCss.SiteNavBar}>
                    <NavLink to={"/"}>Main</NavLink>
                    <UserBar classes = {classesCss.UserBar}/>
                </NavBar>
                <div className={classesCss.SiteContent}>
                    <Switch>
                        <Route path="/country/:countryName" exact>
                            <CountryPage/>
                        </Route>
                        <Route path="/admin" exact>
                            <AdminPage/>
                        </Route>
                        <Route path="/" exact component={MainPage}/>
                        {!isAuthenticated ?
                            <Route path="/login" exact>
                                <AuthPage/>
                            </Route>
                            : null //TODO: create route to user page
                        }
                        <Redirect to="/" />
                    </Switch>
                </div>
                <div className={classesCss.SiteFooter}>
                </div>
            </div>
        </AuthContext.Provider>
    )
}

export default App
