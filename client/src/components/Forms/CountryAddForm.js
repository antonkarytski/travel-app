import React, {useState} from 'react'
import Input from "./Input/Input";
import Button from "../Buttons/Button";


const countryData = {
    countryCode: ""
}

const CountryAddForm = ({sendHandler, removeHandler, waitCondition, message, countriesCodes}) => {
    const [form, setForm] = useState(countryData)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const removeButtonHandler = code => {
        if(window.confirm("Are you sure?"))
            removeHandler(code)
    }

    return (
        <div>
            <Input
                label={"Country code:"}
                onChange={changeHandler}
                name={"countryCode"}
            />

            {countriesCodes?
                countriesCodes.map((code, index) => {
                    return (
                        <div key = {index}>
                            {code}
                            <span onClick={() => removeButtonHandler(code)}> X</span>
                        </div>)
                }) : null
            }


            <Button
                onClick={() => sendHandler(form)}
                disabled={waitCondition}
                label={"Add"}
            />
            <br/>
            {message}
        </div>
    )
}

export default CountryAddForm