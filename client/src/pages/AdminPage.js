import React, {useEffect, useState} from 'react'
import {useHttp, useCountries} from "../hooks/useHttp";
import TabPanel from "../components/Tabs/TabPanel";
import VerticalTabs from "../components/Tabs/VerticalTabs";
import CountryAddForm from "../components/Forms/CountryAddForm";
import CountryUpdateForm from "../components/Forms/CountryUpdateForm";
import classesCss from './styles/AdminPage.module.scss'
import Map from "../components/Map/Map";


const langShortDummy = {
    lang: "",
    countryName: "",
    shortText: "",
    capitalName: "",
}
const langFullDummy = {
    lang: "",
    countryCode: "",
    countryName: "",
    description: "",
    capitalName: "",
}

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

    const destructCountry= (countryDataFromClient) => {
        const countryStructure = {
            ...countryDataFromClient.data,
            langData: []
        }
        const langCountryStructure = []
        for(let lang in countryDataFromClient.data.langData){
            if(countryDataFromClient.data.langData.hasOwnProperty(lang)){
                const shortLangData = {lang}
                const fullLangData = {lang, countryCode: countryDataFromClient.countryCode}
                for(let shortDummyKey in langShortDummy){
                    if(countryDataFromClient.data.langData[lang][shortDummyKey] !== undefined){
                        shortLangData[shortDummyKey] = countryDataFromClient.data.langData[lang][shortDummyKey]
                    }

                }
                for(let fullDummyKey in langFullDummy){
                    if(countryDataFromClient.data.langData[lang][fullDummyKey] !== undefined){
                        fullLangData[fullDummyKey] = countryDataFromClient.data.langData[lang][fullDummyKey]
                    }
                }
                countryStructure.langData.push(shortLangData);
                langCountryStructure.push(fullLangData)
            }
        }

        return {
            countryData: countryStructure,
            langCountryData: langCountryStructure
        }
    }

    const structCountries = (countriesDataFromServer) => {
        const structure = {}
        for(let i = 0; i < countriesDataFromServer.countries.length; i++){

            const countryCode = countriesDataFromServer.countries[i].countryCode

            structure[countryCode] = countriesDataFromServer.countries[i]
            // delete structure[countryCode].__id
            // delete structure[countryCode].__v

            const countryLangData = {};
            for (let i = 0; i < structure[countryCode].langData.length; i++) {
                countryLangData[structure[countryCode].langData[i].lang] = structure[countryCode].langData[i]
            }
            if(countriesDataFromServer.langCountries){
                const currentCountryLangs = countriesDataFromServer.langCountries.filter(county => {
                    return county.countryCode === countryCode
                })
                for (let i = 0; i < currentCountryLangs.length; i++) {
                    countryLangData[currentCountryLangs[i].lang] = {
                        ...countryLangData[currentCountryLangs[i].lang],
                        ...currentCountryLangs[i]
                    }
                    delete countryLangData[currentCountryLangs[i].lang].lang
                    delete countryLangData[currentCountryLangs[i].lang].countryCode
                }

            }
            structure[countryCode].langData = countryLangData


        }
        return structure
    }


    useEffect(() => {
        getCountryFromBase({})
    }, [])

    useEffect(() => {
        if(countryResponse){
            setCountriesData(structCountries(countryResponse))
        }
    }, [countryResponse])

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