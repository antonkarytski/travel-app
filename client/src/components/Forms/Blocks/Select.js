import React from 'react'


const Select = ({name, value, onChange, options, label}) => {

    if (!Array.isArray(options)) {
        const optionsArr = []
        for (let value in options) {
            optionsArr.push({value, label: options[value]})
        }
        options = optionsArr
    }

    return (
        <>
            <label>{label}</label>
            <select
                name={name}
                onChange={onChange}
                value={value}
            >
                {
                    options.map((option) => {
                        return <option key={Math.random()} value={option.value}>{option.label}</option>
                    })
                }
            </select>
        </>
    )
}

export default Select