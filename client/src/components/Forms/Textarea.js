import React from 'react'

const Textarea = ({name, onChange, label, placeholder, className, value, rows}) => {

    return(
        <div className={className}>
            <label htmlFor={`textareaId${name}`}>{label}</label>
            <br />
            <textarea
                name={name}
                id={`textareaId${name}`}
                value={value}
                rows={rows}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Textarea