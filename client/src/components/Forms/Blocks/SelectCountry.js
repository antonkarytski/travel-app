import React from "react";
import Select from "./Select";


const SelectCountry = ({value, onChange, codes}) => {
    if (codes) {
        codes = codes.map((countryCode) => {
            return ({value: countryCode, label: countryCode})
        })
    }
    return (
        <div>
            <label>Country</label>
            <Select
                name="countryCode"
                value={value}
                onChange={onChange}
                options={codes}
            />
        </div>
    )
}


export default SelectCountry