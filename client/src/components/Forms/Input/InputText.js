import React from 'react'
import Input from "./Input";

const InputText = ({name, id, onChange, label, placeholder, className}) => {
    return (
        <Input
            label={label}
            name={name}
            id={id}
            type={"text"}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
        />
    )
}

export default InputText