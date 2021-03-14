import React, { useRef } from 'react';
import VideoStyles from "./VideoStyles.css";
import Player from 'react-youtube';

export const Video = (props) => {
  const language = "FR"; // заменить на данные из контекста

  const currentCountry = props.countryCode;
  const videoId = {
    EN: {
      FR:"2N7l6SSKeds",
      CH:"oZRBUBbfIJ8",
      IS:"u_f90pXw5sQ",
      NZ:"_eMAXOp2PvA",
      NO:"DWcPZxd4VVs",
      TH:"6f_loPJsPFE",
      PH:"zYWj-ly7nR8",
      HR:"X8IvMhXOxe4",
      BR:"pF0IA2gBWig",
      LK:"MbIPOgY9CTo",
      JP:"prNYOW0_kms"
    },
    FR: {
      FR:"bb4zvZdrMz4",
      CH:"ttNB8bpY274",
      IS:"i1vPNSVwrbY",
      NZ:"sWWXV_oQVDs",
      NO:"PLHmG2VUGg4",
      TH:"6_97keiUm5E",
      PH:"q-kBTI1HDzk",
      HR:"otfE-TAl1b0",
      BR:"xhi7_ECf8pE",
      LK:"-722kTYBGS4",
      JP:"mufhEjK96gc"
    },
    RU: {
      FR:"iNRZ-8vbUU8",
      CH:"wb84vvYSPEU",
      IS:"YK6oT3DceYU",
      NZ:"6ASD8gHrDeE&t=6s",
      NO:"02OWilYWkTk",
      TH:"ShdxUl_Puuc",
      PH:"dmt3LcikoW4",
      HR:"cNjP2nUyB6U",
      BR:"1x4DnVMWAGs",
      LK:"1kdGmdQ4ZOI",
      JP:"Gb0TQ7VeApY"
    }
  }
  const title = {
    RU: "Видео",
    EN: "Video",
    FR: "Vidéo"
  }


  const opts = {
    // height: '390',
    // width: '640',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      hl: language
    },
  };

  return (
    <div>
      <h2>{title[language]}</h2>
      <Player
        videoId={videoId[language][currentCountry]}
        opts={opts}
        className="Video"
      />
    </div>
  )
}