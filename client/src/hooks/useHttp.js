import {useCallback, useState} from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const clearError = () => setError(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const urlAddon = "https://travel-app-server24.herokuapp.com"
            //const urlAddon=""
            const response = await fetch(urlAddon+url, {method, body, headers})
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Smth wrong")
            }

            setLoading(false)
            return (data)
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }, [])

    return {loading, error, request, clearError}
}


export const useCountries = () => {
    const {loading, error, request} = useHttp()
    const [response, setResponse] = useState()

    const countryAsyncRequest = useCallback(async (body = {}) => {
        const requestResponse = await request('/api/country/get', 'POST', body)
        setResponse(requestResponse)
    }, [request])

    const countryRequest = useCallback((body = {}) => {
        const promiseResponse = countryAsyncRequest(body)
        return(promiseResponse)
    }, [countryAsyncRequest])

    return {
        cLoading : loading, cError: error, countryResponse: response, getCountryFromBase: countryRequest
    }
}