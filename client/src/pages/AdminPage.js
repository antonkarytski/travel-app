import React, {useEffect, useState} from 'react'
import {useHttp, useCountries} from "../hooks/useHttp";
import TabPanel from "../components/Tabs/TabPanel";
import VerticalTabs from "../components/Tabs/VerticalTabs";
import CountryAddForm from "../components/Forms/CountryAddForm";
import CountryUpdateForm from "../components/Forms/CountryUpdateForm";
import {destructCountry, structCountries} from "../helpers/struct"
import classesCss from './styles/AdminPage.module.scss'


const AdminPage = () => {
    const {request, loading} = useHttp()
    const {getCountryFromBase, countryResponse, cLoading} = useCountries()
    const [message, setMessage] = useState('')
    const [countries, setCountries] = useState({
        data: null,
        codes: []
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
            const struct = structCountries(countryResponse)
            const codes = []
            for (let countryCode in struct) {
                if (struct.hasOwnProperty(countryCode)) {
                    codes.push(countryCode)
                }
            }
            setCountries({
                data: struct,
                codes
            })
        }
    }, [countryResponse])

    useEffect(() => {
        getCountryFromBase({})
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
                <TabPanel className={classesCss.FormStyle1} label={"Add Lang"}>
                    {
                        !countryResponse ? cLoading ?
                            <div>Загрузка...</div> :
                            <div>Ошибка при загрузке базы стран</div> :
                            <CountryUpdateForm
                                waitCondition={loading}
                                sendHandler={updateCountryHandler}
                                countries={countries}
                                message={message}
                            />
                    }
                </TabPanel>
            </VerticalTabs>
        </div>)
}


export default AdminPage
