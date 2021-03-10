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
    const [countriesData, setCountriesData] = useState(null)

    const addCountryHandler = async (form) => {
        try {
            const data = await request('/api/country/add', 'POST', {...form})
            setMessage(data.message || '')
        } catch (e) {

        }
    }

    const updateCountryHandler = async (form) => {

        try {
            const data = await request('/api/country/update', 'POST', destructCountry(form))
            setMessage(data.message || '')
        } catch (e) {

        }
    }


    useEffect(() => {
        getCountryFromBase({})
    }, [])

    useEffect(() => {
        if(countryResponse){
            setCountriesData(structCountries(countryResponse))
        }
    }, [countryResponse])

    console.log(countryResponse)

    return (
        <>
            <VerticalTabs>
                <TabPanel className={classesCss.FormStyle1} label={"Add Country"}>
                    <CountryAddForm
                        waitCondition={loading}
                        sendHandler={addCountryHandler}
                        message={message}
                    />
                </TabPanel>
                <TabPanel className={classesCss.FormStyle1} label={"Add Lang"}>
                    {
                        !countryResponse? cLoading?
                            <div>Загрузка...</div> :
                            <div>Ошибка при загрузке базы стран</div>:
                            <CountryUpdateForm
                                waitCondition={loading}
                                sendHandler={updateCountryHandler}
                                countriesData={countriesData}
                                message={message}
                            />
                    }
                </TabPanel>
            </VerticalTabs>
        </>)
}


export default AdminPage
