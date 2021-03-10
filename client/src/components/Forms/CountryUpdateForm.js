import React, {useState} from 'react'
import Input from "./Input/Input";
import Button from "../Buttons/Button";
import classesCss from "../../pages/styles/AdminPage.module.scss";
import Textarea from "./Textarea";


const countryLang = {
    EN: "English",
    RU: "Russian",
    FR: "France"
}

const CountryUpdateForm = ({sendHandler, waitCondition, countriesData, message}) => {

    const [form, setForm] = useState({
        countryCode: countriesData? Object.keys(countriesData)[0] : '',
        lang: Object.keys(countryLang)[0]
    })
    const [countries, setCountries] = useState(countriesData)

    const formChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const langDataChangeHandler = event => {
        if(countries){
            const newCountriesData = {...countries}
            newCountriesData[form.countryCode].langData[form.lang][event.target.name] = event.target.value
            setCountries(newCountriesData)
        }

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
            <div className={classesCss.FormColumn}>
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
                value={countries? countries[form.countryCode]?.langData[form.lang]?.countryName || "": ""}
                onChange={langDataChangeHandler}
            />
            <Input
                label={"Capital Name: "}
                name={"capitalName"}
                value={countries? countries[form.countryCode]?.langData[form.lang]?.capitalName || "" : ""}
                onChange={langDataChangeHandler}
            />
                <Button
                    onClick={() => sendHandler({
                        countryCode: form.countryCode,
                        data: countries[form.countryCode]
                    })}
                    disabled={waitCondition}
                    label={"Update"}
                    className={[classesCss.SignUpButton, classesCss.FormButton].join(" ")}
                />
                <br/>
                {message}
            </div>
            <div className={classesCss.FormColumn}>
                <Textarea
                    label={"Short text(in Mane Page: "}
                    name={"shortText"}
                    value={countries? countries[form.countryCode]?.langData[form.lang]?.shortText || "" : ""}
                    onChange={langDataChangeHandler}
                />
                <Textarea
                    className={classesCss.Description}
                    label={"Description: "}
                    name={"description"}
                    value={countries? countries[form.countryCode]?.langData[form.lang]?.description || "" : ""}
                    onChange={langDataChangeHandler}
                    rows = {11}
                />
            </div>


        </>
    )
}

export default CountryUpdateForm