import {useState, useCallback, useEffect} from 'react'

const authStorageName = 'authData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState({
        image: "",
        name: ""
    })

    const login = useCallback((jwtToken, id, userData={}) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem( authStorageName, JSON.stringify({
            userId: id, token: jwtToken, ...userData
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserData({})
        localStorage.removeItem(authStorageName)
    }, [])

    const updateData = useCallback((newData) => {
        const newState = {...userData, ...newData}
        const currentUserData = JSON.parse(localStorage.getItem(authStorageName))
        localStorage.setItem( authStorageName, JSON.stringify({
            ...currentUserData,
            userImage: newState.image,
            name: newState.name
        }))
        setUserData(newState)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(authStorageName))
        if(data?.token){
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, token, userId, userData, updateData}
}