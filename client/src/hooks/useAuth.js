import {useState, useCallback, useEffect} from 'react'

const authStorageName = 'authData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState(null)

    const login = useCallback((jwtToken, user) => {
        setToken(jwtToken)
        setUserId(user.id)
        setUserData({
            name:user.name,
            image:user.image,
            email: user.email,
        })
        localStorage.setItem( authStorageName, JSON.stringify({
            userId: user.id,
            token: jwtToken,
            name: user.name,
            image: user.image,
            email: user.email
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserData(null)
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
        const userData = JSON.parse(localStorage.getItem(authStorageName))
        if(userData?.token){
            login(userData.token, {...userData, id: userData.userId})
        }
    }, [login])

    return {login, logout, token, userId, userData, updateData}
}