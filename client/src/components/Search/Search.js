import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const Search = ({value, updateSearchbar, className}) => {

    const onSearchValueChange = (e) => {
        updateSearchbar({value: e.target.value});
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
            <button style={buttonStyle} onClick={() => updateSearchbar({value: ""})}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};
