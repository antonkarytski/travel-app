import React from 'react'
import Input from "./Input";

const InputPassword = ({name, id, onChange, label, placeholder, className}) => {
    return (
        <Input
            label={label}
            name={name}
            id={id}
            type={"password"}
            onChange={onChange}
            placeholder={placeholder}
            className = {className}
        />
    )
}

export default InputPassword