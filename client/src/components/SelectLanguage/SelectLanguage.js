import React from "react";

export const SelectLanguage = ({countryResponse, language, setLanguage, className}) => {
    let languages;
    if (countryResponse) {
        languages = countryResponse.langs;
    }

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <select value={language} onChange={handleChange} className={className}>
            {languages &&
            languages.map((lang) => {
                return <option key={`lang-${lang}`} value={lang}>{lang}</option>;
            })}
        </select>

    );
};
