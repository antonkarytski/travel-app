import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Scrollbar} from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


SwiperCore.use([Navigation, Scrollbar]);

export default function SightGallery () {
    return (
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        navigation
        scrollbar ={{draggable: true, hide: false}}

      >

        <SwiperSlide>
            <img src="" alt=""/>
            <div>краткое описание достопримечательности</div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="" alt=""/>
            <div>краткое описание достопримечательности</div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="" alt=""/>
            <div>краткое описание достопримечательности</div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="" alt=""/>
            <div>краткое описание достопримечательности</div>
        </SwiperSlide>

        ...
      </Swiper>
    );
  };