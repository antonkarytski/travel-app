import React from 'react'

const Button = ({onClick, label, disabled, className}) => {
    return(
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {label}
        </button>
    )
}

export default Button