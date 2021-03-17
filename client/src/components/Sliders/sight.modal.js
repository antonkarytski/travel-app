import React, {useContext, useEffect, useState} from "react";
import Modal from '@material-ui/core/Modal';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Scrollbar} from 'swiper/core';
import {AppContext} from "../../context/AppContext";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './slider-overwrite.scss'

export default function ModalWindow (props) {
    const {language} = useContext(AppContext)
    const onClose = () => {
        props.onClose?.();
    }
    const translation ={
      'EN': 0,
      'RU': 1,
      'FR': 2
    }

    return (

        <Modal
            className = "modal-slider"
            open={props.isOpened}
            disableBackdropClick = {false}
            disableEscapeKeyDown = {false}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            onClose={() => props.onClose?.()}
            >
        <Swiper

          spaceBetween={100}
          slidesPerView={1}
          centeredSlides
          loop
          navigation
          initialSlide = {props.index}
        >

        {props.content.map((e, i) =>
                  {
                    return (<SwiperSlide key={i+e.fullPhoto}>

                    <div>
                        <img src={e?.fullPhoto} alt=""  height="600"/>
                        <div className="sight-description">{e?.langData[translation[language]].description}</div>

                    </div>
                    </SwiperSlide>)
                  }

                )}
        </Swiper>
        </Modal>
    )
}