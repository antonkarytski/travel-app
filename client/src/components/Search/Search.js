import React from "react";
import classesCss from './Search.module.scss'

export const Search = ({value, updateSearch, className}) => {

    const onSearchValueChange = (e) => {
        updateSearch({value: e.target.value});
    };

    const buttonStyle ={
        visibility: "hidden",
        opacity: 0,
        transition:'visibility linear .3s, opacity .3s'
    }
    if(value) {
        buttonStyle.visibility = "visible"
        buttonStyle.opacity = 1
        buttonStyle.transition = 'visibility linear 0s, opacity .5s'
    }
    console.log(buttonStyle)

    return (
        <div className={className}>
            <input
                onChange={onSearchValueChange}
                value={value}
                placeholder="Search country"
                autoFocus={true}
            />
            <button style={buttonStyle} onClick={() => updateSearch({value: ""})}>
                <svg className={classesCss.TimesSymbol} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
                    <path stroke="black" stroke-width="8.3" stroke-linecap="round" d="M14,14 L106,106 M106,14 L14,106" />
                </svg>
                {/*<FontAwesomeIcon icon={faTimes} />*/}
            </button>
        </div>
    );
};
