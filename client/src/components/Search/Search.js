import React from "react";
import classesCss from "./Search.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const Search = ({
  value,
  updateSearch,
  className,
  placeholderValue,
    classes
}) => {
  const onSearchValueChange = (e) => {
    updateSearch({ value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const buttonStyle = {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility linear .3s, opacity .3s",
  };
  if (value) {
    buttonStyle.visibility = "visible";
    buttonStyle.opacity = 1;
    buttonStyle.transition = "visibility linear 0s, opacity .5s";
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
      <button className={classes.searchButton} style={buttonStyle} type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        onChange={onSearchValueChange}
        value={value}
        placeholder={placeholderValue}
        autoFocus={true}
      />

      <button className={classes.closeButton} style={buttonStyle} onClick={() => updateSearch({ value: "" })}>
        <svg
          className={classesCss.TimesSymbol}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
        >
          <path
            stroke="black"
            strokeWidth="8.3"
            strokeLinecap="round"
            d="M14,14 L106,106 M106,14 L14,106"
          />
        </svg>
      </button>
    </form>
  );
};
