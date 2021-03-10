import React from 'react'
import classesCss from './style/Input.module.scss'

const Input = ({name, type, onChange, label, placeholder, className, value}) => {

    const classes = [classesCss.InputBlock, className]

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={`inputId${name}`}>{label}</label>
            <input
                name={name}
                id={`inputId${name}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input