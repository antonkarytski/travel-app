import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Scrollbar} from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Scrollbar]);

export default function Slider () {
    return (
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        scrollbar ={{draggable: true, hide: false}}

      >

        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>

        ...
      </Swiper>
    );
  };