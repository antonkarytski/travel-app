import React, { useEffect } from "react";

export const Search = (props) => {
  let search = React.createRef();

  const onSearchValueChange = () => {
    props.setSearchbarState(search.current.value);
  };

  useEffect(() => {
    props.countries.filter((country) => {
      if (props.searchbarState) {
        country.name.includes(props.searchbarState);
      }
      return country;
    });
  }, [props.searchbarState]);

  const SearchClear = () => {
    search.current.value = "";
  };

  return (
    <div>
      <input
        ref={search}
        onChange={onSearchValueChange}
        value={props.searchbarState}
        placeholder="Search country"
      />
      <button onClick={SearchClear}>x</button>
    </div>
  );
};
