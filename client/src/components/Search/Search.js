import React from "react";

export const Search = ({value, updateSearchbar}) => {

  const onSearchValueChange = (e) => {
      updateSearchbar({value: e.target.value});
  };

  return (
    <div>
      <input
        onChange={onSearchValueChange}
        value={value}
        placeholder="Search country"
        autoFocus={true}
      />
      <button onClick={() => updateSearchbar({value: ""})}>x</button>
    </div>
  );
};
