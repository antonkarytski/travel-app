import React, {useContext, useState} from 'react'
import Select from "./Blocks/Select";
import SelectCountry from "./Blocks/SelectCountry";
import useForm from "../../hooks/useForm";
import Row from "../Structs/Row";
import classesCss from "./Blocks/SliderForm/SliderForm.module.scss";
import Input from "./Input/Input";
import Textarea from "./Textarea";
import ShowplaceRepeater from "./Blocks/ShowplaceRepeater";
import {AppContext} from "../../context/AppContext";


const countryLang = {
    EN: "English",
    RU: "Russian",
    FR: "France"
}

const ShowplaceAddForm = ({showplaces, codes}) => {

    const [form, setForm] = useForm({
        countryCode: codes ? codes[0] : '',
        lang: Object.keys(countryLang)[0],
    })
    const [localShowplaces, setLocalShowplaces] = useState({
        full: showplaces,
        updateStack: [],
        updatesCounter: 0
    })
    const {langSet} = useContext(AppContext)


    const addHandler = (index) => {
        const showplacesFull = [...localShowplaces.full]
        const showplacesUpdateStack = [...localShowplaces.updateStack]
        const localCounter = localShowplaces.updatesCounter + 1;
        const showplaceDummy = {
            index: localCounter,
            countryCode: form.countryCode,
            langData: []
        }
        langSet.forEach(lang => {
            showplaceDummy.langData.push({lang})
        })
        showplacesFull.push(showplaceDummy)
        showplacesUpdateStack.push({index})
        setLocalShowplaces({
            full: showplacesFull,
            updateStack: showplacesUpdateStack,
            updatesCounter: localCounter
        })
    }

    const removeHandler = showplace => {
        const showplacesFull = [...localShowplaces.full]
        const showplacesUpdateStack = [...localShowplaces.updateStack]
        const indexToRemove = showplacesFull.indexOf(showplace)
        if (showplace.index) {
            showplacesUpdateStack.find((showplace) => {
                return showplace.index
            })
            showplacesUpdateStack.splice(indexToRemoveFromStack, 1)
        }
        if (showplacesFull[indexToRemove]._id) {
            showplacesUpdateStack.push({_id:showplacesFull[indexToRemove]._id, remove: true})
        }
        showplacesFull.splice(indexToRemove, 1)
        setLocalShowplaces({
            full: showplacesFull,
            updateStack: showplacesUpdateStack
        })
    }

    const updateStackHandler = (showplace) => {
        const showplacesUpdateStack = [...localShowplaces.updateStack]
        const indexInLocal = showplacesUpdateStack.indexOf(showplace)
        if(indexInLocal === -1){
            showplacesUpdateStack.push(showplace)
        } else {
            showplacesUpdateStack[indexInLocal] = showplace;
        }
        setLocalShowplaces({
            full: localShowplaces.full,
            updateStack: showplacesUpdateStack
        })
    }


    const getCurrentShowplaces = {}


    return (
        <div>
            <Select
                label={"Language"}
                name="lang"
                onChange={setForm}
                value={form.lang}
                options={countryLang}
            />
            <SelectCountry
                value={form.countryCode}
                onChange={setForm}
                codes={codes}
            />
            <ShowplaceRepeater
                showplaces={showplaces}
                addHandler={addHandler}
            />
            <div>
                <button>

                </button>
                <Row>
                    <div>
                        <img/>
                        <Input
                            className={classesCss.Input}
                            name={"prevPhoto"}
                            label={"Photo: "}
                        />
                        <Textarea
                            className={classesCss.Input}
                            name={"description"}
                            label={"Description: "}
                            rows={5}
                        />
                    </div>
                    <div>
                        <Input
                            className={classesCss.Input}
                            name={"fullPhoto"}
                            label={"Photo: "}
                        />
                        <Textarea
                            className={classesCss.Input}
                            name={"description"}
                            label={"Description: "}
                            rows={5}
                        />
                    </div>
                </Row>

            </div>
        </div>

    )
}


export default ShowplaceAddForm