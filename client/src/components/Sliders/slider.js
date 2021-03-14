import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, EffectFade, Autoplay} from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import './slider-overwrite.scss'
import classesCss from './Slider.module.scss'

SwiperCore.use([Navigation, EffectFade, Autoplay]);

export default function Slider({slides}) {
    return (
        <Swiper
            slidesPerView={1}
            loop
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            effect={"fade"}
        >

            {slides.map((slide, index) => {
                return (
                    <SwiperSlide
                        className={classesCss.Slide}
                        key={index}
                        style={{backgroundImage: `url(${slide.file})`}}/>
                )
            }
            )}
        </Swiper>

    );
};