import React, { useEffect } from "react";

export const CountryPage = (props) => {
  // const toHomePage = () => {
  //     props.history.push({
  //         pathname: "/"
  //     })
  // }

  useEffect(() => {
    props.setSearchbarExists(false);
  }, []);

  return (
    <div>
      <h1>Country Page</h1>
      <button
      //onClick={toHomePage}
      >
        Back
      </button>
    </div>
  );
};
