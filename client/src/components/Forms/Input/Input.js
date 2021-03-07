import React from 'react'
import classesCss from './style/Input.module.scss'

const Input = ({name, id, type, onChange, label, placeholder, className}) => {

    const classes = [classesCss.InputBlock, className]

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={id}>{label}</label>
            <input
                name={name}
                id={id}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input