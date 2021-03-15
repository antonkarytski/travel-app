import {createContext} from 'react'

export const AppContext = createContext({
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    language: ''
})