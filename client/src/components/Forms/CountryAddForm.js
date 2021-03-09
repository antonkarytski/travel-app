import React, {useState} from 'react'
import Input from "./Input/Input";
import Button from "../Buttons/Button";


const countryData = {
    countryCode: ""
}

const CountryAddForm = ({initData, sendHandler, waitCondition, message}) => {
    const [form, setForm] = useState(countryData)
    //initData? {...countryData, ...initData} : countryData

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Input
                label={"Country code:"}
                onChange={changeHandler}
                name={"countryCode"}
            />

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