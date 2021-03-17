import React from "react";
import Select from 'react-styled-select'
import './select.scss'


export const SelectLanguage = ({
                                   language,
                                   setLanguage,
                                   className,
                                   classes
                               }) => {
    const languages = [
        {value: 'EN', label: 'EN'},
        {value: 'RU', label: 'RU'},
        {value: 'FR', label: 'FR'},
    ];

    const handleChange = (val) => {
        setLanguage(val);
        localStorage.setItem("lang", val);
    };


    return (
        <Select
            value={language}
            onChange={handleChange}
            className={className}
            searchable={false}
            options={languages}
            classes={{
                selectControl: classes.control,
                selectMenuOuter: classes.dropdown,
                selectInput: classes.input,
                selectPlaceholder: classes.placeholder
            }}
        />
    );
};
