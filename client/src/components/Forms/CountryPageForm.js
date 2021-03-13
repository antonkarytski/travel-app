import React, {useContext, useState} from 'react'
import useForm from "../../hooks/useForm";
import Input from "./Input/Input";
import Button from "../Buttons/Button";
import classesCss from "../../pages/styles/AdminPage.module.scss";
import Textarea from "./Textarea";
import Column from "../Structs/Column";
import Row from "../Structs/Row";
import SliderGallery from "./Blocks/SliderForm/SliderGallery";
import Select from "./Blocks/Select";
import SelectCountry from "./Blocks/SelectCountry";
import {AppContext} from "../../context/AppContext";

const CountryPageForm = ({sendHandler, waitCondition, countries, message}) => {

    const {langSet} = useContext(AppContext)
    const [form, setForm] = useState({
        countryCode: countries ? countries.codes[0] : '',
        lang: Object.keys(langSet)[0],
        currencyCode: countries.data ? countries.data[Object.keys(countries.data)[0]].currencyCode : '',
    })
    const [countriesDataState, setCountriesData] = useState(countries.data)


    const updateForm = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const langDataChangeHandler = event => {
        if (countriesDataState) {
            const newCountriesData = {...countriesDataState}
            newCountriesData[form.countryCode].langData[form.lang][event.target.name] = event.target.value
            setCountriesData(newCountriesData)
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

            setCountriesData(newCountriesData)
        }
    }

    const sliderChangeHandler = (photos) => {
        if (photos) {
            const newCountriesData = {...countriesDataState}
            newCountriesData[form.countryCode].countryPhotos = photos
            setCountriesData(newCountriesData)
        }
    }
    const showplacesChangeHandler = (photos) => {
        if (photos) {
            const newCountriesData = {...countriesDataState}
            newCountriesData[form.countryCode].langData[form.lang].countryPhotos = photos
            setCountriesData(newCountriesData)
        }
    }



    const currentCountry = countriesDataState ? countriesDataState[form.countryCode] : undefined
    const currentCountryLang = currentCountry ? currentCountry.langData[form.lang] : undefined


    console.log(countries)

    return (
        <>

            <Row>
                <Column className={classesCss.FormColumn}>
                    <Row style={{marginBottom: 0}}>
                        <SelectCountry
                            value={form.countryCode}
                            onChange={updateForm}
                            codes={countries.codes}
                        />
                        <Input
                            blockStyle={{flexDirection: "column"}}
                            label={"Currency code: "}
                            name={"currencyCode"}
                            value={form.currencyCode}
                            onChange={updateForm}
                        />
                    </Row>
                    <Select
                        label={"Language"}
                        name="lang"
                        onChange={updateForm}
                        value={form.lang}
                        options={langSet}
                    />
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
                    <Input
                        label={"Currency: "}
                        name={"currency"}
                        value={currentCountryLang ? currentCountryLang.currency || "" : ""}
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
                <SliderGallery
                    data={currentCountry ? currentCountry.countryPhotos : []}
                    onChange={sliderChangeHandler}
                />
            </Row>
        </>
    )
}

export default CountryPageForm