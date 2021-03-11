import React from 'react'
import classesCss from './style/Input.module.scss'

const Input = ({name, type, onChange, label, placeholder, className, value, dataAttr, style}) => {

    const classes = [classesCss.InputBlock, className]

    const dataProps = {}
    for(let attrName in dataAttr){
        if(dataAttr.hasOwnProperty(attrName))
            dataProps[`data-${attrName}`] = dataAttr[attrName]
    }

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={`inputId${name}`}>{label}</label>
            <input
                style = {style}
                name={name}
                id={`inputId${name}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...dataProps}
            />
        </div>
    )
}

export default Input