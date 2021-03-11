import React, {useState} from 'react'
import Input from "./Input/Input";
import Button from "../Buttons/Button";
import classesCss from "../../pages/styles/AdminPage.module.scss";
import Textarea from "./Textarea";
import Column from "../Structs/Column";
import Row from "../Structs/Row";
import SliderForm from "./SliderForm/SliderForm";


const countryLang = {
    EN: "English",
    RU: "Russian",
    FR: "France"
}

const CountryUpdateForm = ({sendHandler, waitCondition, countries, message}) => {

    const [form, setForm] = useState({
        countryCode: countries.data ? Object.keys(countries.data)[0] : '',
        lang: Object.keys(countryLang)[0]
    })
    const [countriesDataState, setCountriesCountriesData] = useState(countries.data)

    const formChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const langDataChangeHandler = event => {
        if (countriesDataState) {
            const newCountriesData = {...countriesDataState}
            newCountriesData[form.countryCode].langData[form.lang][event.target.name] = event.target.value
            setCountriesCountriesData(newCountriesData)
        }
    }
    const commonDataChangeHandler = event => {

        if (countriesDataState) {
            const newCountriesData = {...countriesDataState}
            if (event.target.name === "countryCoordinates") {
                newCountriesData[form.countryCode][event.target.name][event.target.dataset.coordinate] = event.target.value
            } else {
                newCountriesData[form.countryCode][event.target.name] = event.target.value
            }

            setCountriesCountriesData(newCountriesData)
        }
    }

    const sliderChangeHandler = (photos) => {
        if (photos) {
            const newCountriesData = {...countriesDataState}
            newCountriesData[form.countryCode].countryPhotos = photos
            setCountriesCountriesData(newCountriesData)
        }
    }

    const currentCountry = countriesDataState ? countriesDataState[form.countryCode] : undefined
    console.log(currentCountry)
    const currentCountryLang = currentCountry ? currentCountry.langData[form.lang] : undefined

    return (
        <>

            <Row>
                <Column className={classesCss.FormColumn}>
                    <label>Country</label>
                    <select
                        name="countryCode"
                        id="counties"
                        value={form.countryCode}
                        onChange={formChangeHandler}
                    >
                        {countries.codes ?
                            countries.codes.map((countryCode) => {
                                if (countryCode in countries.data) {
                                    return(
                                    <option
                                        key={countryCode}
                                        value={countryCode}
                                    >{countryCode}
                                    </option>)
                                }

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
                        value={currentCountryLang ? currentCountryLang.countryName || "" : ""}
                        onChange={langDataChangeHandler}
                    />
                    <Input
                        label={"Capital Name: "}
                        name={"capitalName"}
                        value={currentCountryLang ? currentCountryLang.capitalName || "" : ""}
                        onChange={langDataChangeHandler}
                    />
                    <Button
                        onClick={() => sendHandler({
                            countryCode: form.countryCode,
                            data: countriesDataState[form.countryCode]
                        })}
                        disabled={waitCondition}
                        label={"Update"}
                        className={[classesCss.SignUpButton, classesCss.FormButton].join(" ")}
                    />
                    <br/>
                    {message}
                </Column>
                <Column className={classesCss.FormColumn}>
                    <Textarea
                        label={"Short text (in Mane Page): "}
                        name={"shortText"}
                        value={currentCountryLang ? currentCountryLang.shortText || "" : ""}
                        onChange={langDataChangeHandler}
                    />
                    <Textarea
                        className={classesCss.Description}
                        label={"Description: "}
                        name={"description"}
                        value={currentCountryLang ? currentCountryLang.description || "" : ""}
                        onChange={langDataChangeHandler}
                        rows={11}
                    />
                    <div className={classesCss.FormRow}>
                        <Input
                            label={"Capital coordinate X: "}
                            name={"countryCoordinates"}
                            dataAttr={{coordinate: 0}}
                            value={currentCountry ? currentCountry.countryCoordinates[0] || "" : ""}
                            onChange={commonDataChangeHandler}
                        />
                        <Input
                            label={"Capital coordinate Y: "}
                            name={"countryCoordinates"}
                            dataAttr={{coordinate: 1}}
                            value={currentCountry ? currentCountry.countryCoordinates[1] || "" : ""}
                            onChange={commonDataChangeHandler}
                        />
                    </div>
                </Column>
                <Column className={classesCss.FormColumn}>
                    <Input
                        label={"Preview: "}
                        name={"preview"}
                        value={currentCountry ? currentCountry.preview : ""}
                        onChange={commonDataChangeHandler}
                    />
                    {
                        currentCountry?.preview ?
                            <div className={classesCss.CountryPreview}>
                                <img src={currentCountry.preview} alt="countryPreview"/>
                            </div> : null

                    }
                </Column>
            </Row>
            <h3>Slider:</h3>
            <Row>
                <SliderForm
                    data={currentCountry ? currentCountry.countryPhotos : []}
                    onChange={sliderChangeHandler}
                />
            </Row>
            <h3>Showplaces:</h3>
            <Row>
            </Row>
        </>
    )
}

export default CountryUpdateForm