import React from "react";

export const Search = (props) => {
  const onSearchValueChange = (e) => {
    props.setSearchbarState(e.target.value);
  };

  const SearchClear = () => {
    props.setSearchbarState("");
  };

  return (
    <div>
      <input
        onChange={onSearchValueChange}
        value={props.searchbarState}
        placeholder="Search country"
      />
      <button onClick={SearchClear}>x</button>
    </div>
  );
};
