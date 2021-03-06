import React from 'react'
import UserPage from "../pages/UserPage";
import {AuthPage} from "../pages/AuthPage";


export const useIsAuthenticated = isAuthenticated => {
    if(isAuthenticated){
        return(
            <UserPage />
        )
    }
    return(
        <AuthPage />
    )
}