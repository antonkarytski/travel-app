import React, {useEffect, useState} from 'react'
import {useHttp, useCountries} from "../hooks/useHttp";
import TabPanel from "../components/Tabs/TabPanel";
import VerticalTabs from "../components/Tabs/VerticalTabs";
import CountryAddForm from "../components/Forms/CountryAddForm";
import CountryPageForm from "../components/Forms/CountryPageForm";
import {destructCountry, structCountries} from "../helpers/struct"
import classesCss from './styles/AdminPage.module.scss'
import ShowplaceAddForm from "../components/Forms/ShowplaceAddForm";


const AdminPage = () => {
    const {request, loading} = useHttp()
    const {getCountryFromBase, countryResponse, cLoading} = useCountries()
    const [message, setMessage] = useState('')
    const [countries, setCountries] = useState({
        data: null,
        codes: [],
        showplaces: []
    })

    const addCountryHandler = async (form) => {
        try {
            const data = await request('/api/country/add', 'POST', {...form})
            setMessage(data.message || '')
            const countriesUpd = {...countries}
            countriesUpd.codes.push(form.countryCode)
            setCountries(countriesUpd)
        } catch (e) {

        }
    }

    const updateCountryHandler = async form => {
        try {
            const data = await request('/api/country/update', 'POST', destructCountry(form))
            setMessage(data.message || '')
        } catch (e) {

        }
    }

    const sendShowplacesHandler = async (showplaces, placesStack) => {
        const requestQueue = []
        console.log(placesStack)
        placesStack.forEach((stackItem) => {
            if(stackItem.key === "remove"){
                requestQueue.push(stackItem)
            } else {
                const updatedShowplace = showplaces.find((place) => {
                    return stackItem._id ? place._id === stackItem._id :
                        stackItem.index? place.index === stackItem.index : false
                })
                if(updatedShowplace){
                    requestQueue.push(updatedShowplace)
                }
            }
        })

        try {
            const sendRes = await request('/api/country/showplace', 'POST', {showplaces: requestQueue})
            console.log('queue',requestQueue)
            const getRes = await request('/api/country/get', 'POST', {key:"showplaces"})
            setMessage(sendRes.message || '')
            console.log(getRes)
            setCountries({...countries, showplaces:getRes.showplaces})
        } catch (e) {

        }
    }

    const removeCountryHandler = async countryCode => {
        try {
            const localCountriesUpdate = {...countries.data}
            if (countryCode in localCountriesUpdate) {
                const data = await request('/api/country/remove', 'POST', {countryCode})
                setMessage(data.message || '')
                delete localCountriesUpdate[countryCode]
                setCountries(localCountriesUpdate)
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        if (countryResponse) {
            const struct = structCountries(countryResponse.countries)
            const codes = []
            for (let countryCode in struct) {
                if (struct.hasOwnProperty(countryCode)) {
                    codes.push(countryCode)
                }
            }
            setCountries({
                data: struct,
                codes,
                showplaces: countryResponse.showplaces ? countryResponse.showplaces : []
            })
        }
    }, [countryResponse])

    useEffect(() => {
        getCountryFromBase({key: 'all'})
    }, [])


    return (
        <div className={classesCss.AdminPage}>
            <VerticalTabs>
                <TabPanel className={classesCss.FormStyle1} label={"Add Country"}>
                    <CountryAddForm
                        waitCondition={loading}
                        sendHandler={addCountryHandler}
                        removeHandler={removeCountryHandler}
                        countriesCodes={countries.codes}
                        message={message}
                    />
                </TabPanel>
                <TabPanel className={classesCss.FormStyle1} label={"Countries manager"}>
                    {
                        !countryResponse ? cLoading ?
                            <div>Loading...</div> :
                            <div>Showplaces data loading error</div> :
                            <CountryPageForm
                                waitCondition={loading}
                                sendHandler={updateCountryHandler}
                                countries={countries}
                                message={message}
                            />
                    }
                </TabPanel>
                <TabPanel className={classesCss.FormStyle1} label={"Showplaces manager"}>
                    {
                        !countryResponse ? cLoading ?
                            <div>Loading...</div> :
                            <div>Showplaces data loading error</div> :
                            <ShowplaceAddForm
                                codes={countries.codes}
                                showplaces={countries.showplaces}
                                sendHandler={sendShowplacesHandler}
                                message={message}
                            />
                    }
                </TabPanel>
            </VerticalTabs>
        </div>)
}


export default AdminPage
