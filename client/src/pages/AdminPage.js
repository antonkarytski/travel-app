import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/useHttp";
import Input from "../components/Forms/Input/Input";
import Button from "../components/Buttons/Button";
import VerticalTabs from "../components/Tabs/VerticalTabs";
import TabPanel from "../components/Tabs/TabPanel";
import classesCss from './styles/AdminPage.module.scss'
import CountryAddForm from "../components/Forms/CountryAddForm";
import CountryUpdateForm from "../components/Forms/CountryUpdateForm";


const AdminPage = () => {

    const {loading, error, request} = useHttp()
    const [message, setMessage] = useState('')
    const [countriesData, setCountriesData] = useState(null)
    const [currentCountryForm, setCurrentCountryForm] = useState()
    const [updateForm, setUpdateForm] = useState({
        countryCode: ''
    })

    const changeLangForm = event => {
        setUpdateForm({...updateForm, [event.target.name]: event.target.value})
    }

    const addCountryHandler = async (form) => {
        try {
            const data = await request('/api/country/add', 'POST', {...form, countryLangData: updateForm})
            setMessage(data.message || '')
            console.log(data.message)
        } catch (e) {

        }
    }

    const updateCountryHandler = async (form) => {
        try {
            const data = await request('/api/country/update', 'POST', {...form})
            setMessage(data.message || '')
            console.log(data.message)
        } catch (e) {

        }
    }

    const getCountries = async () => {
        try {
            const data = await request('/api/country/get', 'POST', {})
            setCountriesData(data)
        } catch (e) {
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <>
            <VerticalTabs>
                <TabPanel className={classesCss.FormStyle1} label={"Add Country"}>
                    <CountryAddForm
                       sendHandler={addCountryHandler}
                       message={message}
                    />
                </TabPanel>
                <TabPanel className={classesCss.FormStyle1} label={"Add Lang"}>
                    <CountryUpdateForm
                        sendHandler={updateCountryHandler}
                        countriesData={countriesData}
                    />
                </TabPanel>
            </VerticalTabs>
        </>)
}






export default AdminPage