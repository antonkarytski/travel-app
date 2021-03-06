import React from 'react'
import {Route, Switch, NavLink} from "react-router-dom"
import classesCss from './styles/App.module.scss'
import {MainPage} from "./pages/MainPage";
import {CountryPage} from "./pages/CountryPage";
import {AuthPage} from "./pages/AuthPage";
import UserPage from "./pages/UserPage"


function App() {

    const isAuthenticated = false


    return (
        <div className={classesCss.Body}>
            <div className={classesCss.SiteHeader}>
                <NavLink to={"/login"}>Sign in</NavLink>
            </div>
            <div className={classesCss.SiteContent}>
                <Switch>
                    <Route path="/country/:countryName" exact>
                        <CountryPage/>
                    </Route>
                    <Route path="/" exact component={MainPage}/>
                    {isAuthenticated ?
                        <Route path="/user" exact>
                            <UserPage/>
                        </Route>
                        :
                        <Route path="/login" exact>
                            <AuthPage/>
                        </Route>}
                        {/*<Redirect to="/" />*/}
                </Switch>
            </div>
            <div className={classesCss.SiteFooter}>
            </div>
        </div>
    )
}

export default App
