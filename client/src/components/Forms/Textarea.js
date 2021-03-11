import React from 'react'

const Textarea = ({name, onChange, label, placeholder, className, value, rows, style, dataAttr}) => {

    const dataProps = {}
    for(let attrName in dataAttr){
        if(dataAttr.hasOwnProperty(attrName))
            dataProps[`data-${attrName}`] = dataAttr[attrName]
    }

    return(
        <div className={className}>
            <label htmlFor={`textareaId${name}`}>{label}</label>
            <br />
            <textarea
                name={name}
                style={style}
                id={`textareaId${name}`}
                value={value}
                rows={rows}
                onChange={onChange}
                placeholder={placeholder}
                {...dataProps}
            />
        </div>
    )
}

export default Textarea