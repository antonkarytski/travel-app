import React, {useState} from 'react'
import Input from "./Input/Input";
import Button from "../Buttons/Button";
import classesCss from "../../pages/styles/AdminPage.module.scss";


const countryLang = {
    EN: "English",
    RU: "Russian",
    FR: "France"
}

const CountryUpdateForm = ({sendHandler, waitCondition, countriesData}) => {

    const [form, setForm] = useState({
        countryCode: Object.keys(countriesData)[0],
        lang: Object.keys(countryLang)[0]
    })
    const [countries, setCountries] = useState(countriesData)

    const formChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const langDataChangeHandler = event => {
        const newCountriesData = {...countriesData}
        newCountriesData[form.countryCode].langData[form.lang][event.target.name] = event.target.value
        setCountries(newCountriesData)
        console.log(countries[form.countryCode])
    }

    const countriesCodes = []
    if(countriesData){
        for(let countryCode in countriesData){
            if(countriesData.hasOwnProperty(countryCode)){
                countriesCodes.push(countryCode)
            }
        }
    }

    return (
        <>
            <div>
            <label>Country</label>
            <select
                name="countryCode"
                id="counties"
                value={form.countryCode}
                onChange={formChangeHandler}
            >
                {countriesCodes[0]?
                    countriesCodes.map((countryCode) => {
                        return <option key={countryCode}
                                       value={countryCode}>{countryCode}</option>
                    }) : null
                }
            </select>
            <label>Language</label>
            <select
                name="lang"
                onChange={formChangeHandler}
                value={form.lang}
            >
                <option value={'EN'}>English</option>
                <option value={'RU'}>Russian</option>
                <option value={'FR'}>French</option>
            </select>

            <Input
                label={"Country Name: "}
                name={"countryName"}
                value={countries[form.countryCode]?.langData[form.lang]?.countryName || ""}
                onChange={langDataChangeHandler}
            />
            <Input
                label={"Capital Name: "}
                name={"capitalName"}
                value={countries[form.countryCode]?.langData[form.lang]?.capitalName || ""}
                onChange={langDataChangeHandler}
            />
            </div>

            <Button
                onClick={() => sendHandler({
                    countryCode: form.countryCode,
                    data: countries[form.countryCode]
                })}
                disabled={waitCondition}
                label={"Update"}
                className={[classesCss.SignUpButton, classesCss.FormButton].join(" ")}
            />
        </>
    )
}

export default CountryUpdateForm