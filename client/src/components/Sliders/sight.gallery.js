import React, {useContext, useState} from 'react';
import ModalWindow from './sight.modal'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper/core';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './slider-overwrite.scss'
import classesCss from './Slider.module.scss'
import {AppContext} from "../../context/AppContext";


SwiperCore.use([Navigation, Pagination]);


export default function SightGallery({places}) {

    const [modalState, setModalState] = useState({visibility: false, index: null})
    const {language} = useContext(AppContext);
    //you don't need to do 2 re-renders, you can create object of states instead and do only one (for values with
    //the same logic)



    const onClose = () => {
        setModalState({
            ...modalState,
            visibility: false
        })
    }
    const showObject = (index) => {
        setModalState({
            visibility: true,
            index
        })
    }

    const getLangIndex = (langSet) => {
        return langSet.findIndex((langItem) => {
            return langItem.lang === language
        })
    }

    return (
        <>
            <ModalWindow
                isOpened={modalState.visibility}
                onClose={onClose}
                content={places[modalState.index]}/>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation
                centeredSlides
                loop
            >

                {places.map((place, index) => {
                        return (
                            <SwiperSlide
                                key={`showplaceSlide${index}`}
                                onClick={() => showObject(index)}
                                className={classesCss.ShowplaceSlide}
                                style={{backgroundImage: `url(${place.prevPhoto})`}}
                            >
                                <h3>{place.langData[getLangIndex(place.langData)].name}</h3>
                                <div className={classesCss.ShortDescription}>
                                    {place.langData[getLangIndex(place.langData)].shortDescription}
                                </div>
                            </SwiperSlide>)
                    }
                )}
                ...
            </Swiper>
        </>
    );
};