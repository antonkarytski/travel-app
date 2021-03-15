import React, {useContext} from 'react';
import Player from 'react-youtube';
import {AppContext} from "../../context/AppContext";

export const Video = ({video, countryCode, className}) => {

  const {language} = useContext(AppContext);

  const videoId = { 
    EN: {
      CH:"oZRBUBbfIJ8",
      IS:"u_f90pXw5sQ",
      NZ:"_eMAXOp2PvA",
      TH:"6f_loPJsPFE",
      PH:"zYWj-ly7nR8",
      HR:"X8IvMhXOxe4",
      BR:"pF0IA2gBWig",
      LK:"MbIPOgY9CTo",
      JP:"prNYOW0_kms"
    },
    FR: {
      CH:"ttNB8bpY274",
      IS:"i1vPNSVwrbY",
      NZ:"sWWXV_oQVDs",
      TH:"6_97keiUm5E",
      PH:"q-kBTI1HDzk",
      HR:"otfE-TAl1b0",
      BR:"xhi7_ECf8pE",
      LK:"-722kTYBGS4",
      JP:"mufhEjK96gc"
    },
    RU: {
      CH:"wb84vvYSPEU",
      IS:"YK6oT3DceYU",
      NZ:"6ASD8gHrDeE&t=6s",
      TH:"ShdxUl_Puuc",
      PH:"dmt3LcikoW4",
      HR:"cNjP2nUyB6U",
      BR:"1x4DnVMWAGs",
      LK:"1kdGmdQ4ZOI",
      JP:"Gb0TQ7VeApY"
    }
  }

  
  const opts = {
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      hl: language
    },
  };

  return (
    <div className={className}>
      <Player 
        videoId={video? video : videoId[language][countryCode]}
        opts={opts} 
        className="Video"
      />
    </div>
  )
}