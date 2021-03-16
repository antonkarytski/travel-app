import React from "react";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

export const SelectLanguage = ({
                                   countryResponse,
                                   language,
                                   setLanguage,
                                   className,
                                   classes
                               }) => {
    let languages;
    if (countryResponse) {
        languages = countryResponse.langs;
    }

    const handleChange = (e) => {
        setLanguage(e.target.value);
        localStorage.setItem("lang", e.target.value);
    };

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={handleChange}
            className={className}
        >
            {languages &&
            languages.map((lang) => {
                return (
                    <MenuItem
                        key={`lang-${lang}`}
                        value={lang}
                        className={classes.menuItem}
                    >
                        {lang}
                    </MenuItem>
                );
            })}
        </Select>
    );
};
