
import React from 'react';
import Slider from './../components/Sliders/slider';

const imagesArr = [
    {
        url: 'imageUrl1'
    },
    {
        url: 'imageUrl2'
    },
    {
        url: 'imageUrl3'
    }
];
=======
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



    return(
        <div>
            <h1>Country Page</h1>
            <Slider images={imagesArr}/>
            <button
                //onClick={toHomePage}
            >Back
            </button>
        </div>
    )
}
=======
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

