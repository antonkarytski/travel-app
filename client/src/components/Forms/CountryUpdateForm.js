import React, {useState} from 'react'
import Input from "./Input/Input";
import Button from "../Buttons/Button";
import classesCss from "../../pages/styles/AdminPage.module.scss";


const countryData = {
    countryCode: "EN",
    countryName: "",
    lang: "EN",
}

const CountryUpdateForm = ({initData, sendHandler, waitCondition, countriesData}) => {
    const [form, setForm] = useState(countryData)
    //initData? {...countryData, ...initData} : countryData

    const changeHandler = event => {

        setForm({...form, [event.target.name]: event.target.value})
    }



    return (
        <>
            <label>Country</label>
            <select
                name="countryCode"
                id="counties"
                value={form.countryCode}
                onChange={changeHandler}
            >
                {countriesData?.countries ?
                    countriesData.countries.map((country) => {
                        return <option key={country.countryCode}
                                       value={country.countryCode}>{country.countryCode}</option>
                    }) : null
                }
            </select>
            <label>Language</label>
            <select
                name="lang"
                onChange={changeHandler}
                value={form.lang}
            >
                <option value={'EN'}>English</option>
                <option value={'RU'}>Russian</option>
                <option value={'FR'}>French</option>
            </select>
            <Input
                label={"Country Name: "}
                name={"countryName"}
                value={"countryName"}
                onChange={changeHandler}
            />
            <Button
                onClick={() => sendHandler(form)}
                disabled={waitCondition}
                label={"Update"}
                className={[classesCss.SignUpButton, classesCss.FormButton].join(" ")}
            />
        </>
    )
}

export default CountryUpdateForm