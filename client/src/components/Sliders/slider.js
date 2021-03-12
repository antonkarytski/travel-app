import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Scrollbar, Centered} from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Scrollbar]);

// url: props.country.countryPhotos.file

export default function Slider (props) {
    return (
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        centered
        scrollbar ={{draggable: true, hide: false}}
      >

        {props.country.countryPhotos.map((e) =>
          {
            return (<SwiperSlide>
              <img src={e.file} alt=""/>
            </SwiperSlide>)
          }

        )}


      </Swiper>
    );
  };