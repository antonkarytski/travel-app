import {useCallback, useState} from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const clearError = () => setError(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "Smth wrong")
            }

            setLoading(false)
            return(data)
        } catch(e) {
            setLoading(false)
            setError(e.message)
            console.log(e)
        }
    },[])

    return {loading, error, request, clearError}
}