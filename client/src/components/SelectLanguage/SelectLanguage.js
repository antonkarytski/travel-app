import React from "react";

export const SelectLanguage = ({ countryResponse, language, setLanguage }) => {
  let languages;
  if (countryResponse) {
    languages = countryResponse.langs;
  }

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <form>
      <label>
        Select language:
        <select value={language} onChange={handleChange}>
          {languages &&
            languages.map((lang) => {
              return <option value={lang}>{lang}</option>;
            })}
        </select>
      </label>
    </form>
  );
};
