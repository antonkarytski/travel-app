import React, {useContext, useEffect, useState} from 'react';
import ModalWindow from './sight.modal'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper/core';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './slider-overwrite.scss'
import classesCss from './Slider.module.scss'
import {AppContext} from "../../context/AppContext";
import {RatingStars} from "../Rating/RatingStars";
import {useHttp} from "../../hooks/useHttp";
import RateCard from "../RateCard/RateCard";


SwiperCore.use([Navigation, Pagination]);


export default function SightGallery({places}) {

    const [modalState, setModalState] = useState({visibility: false, index: null})
    const [rateMap, setRateMap] = useState(null)
    const [currentRateCard, setCurrentRateCard] = useState(-1)
    const {language, token} = useContext(AppContext);

    const {request} = useHttp()


    const showRateCard = (index) => {
        console.log(index)
        setCurrentRateCard(index)
    }


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


    useEffect(async () => {
        if(places){
            const placesId = places.map(place => {
                return place._id
            })
            try{
                const rateMap = await request('/api/country/getrates', 'POST', {places : placesId})
                console.log(rateMap)

                setRateMap(rateMap)
            } catch(e){
                console.log(e)
            }

        }
    }, [places])


    const showStyle = {
        visibility: 'visible',
    }


    return (
        <>
            <ModalWindow
                isOpened={modalState.visibility}
                index = {modalState.index}
                onClose={onClose}
                content={places}/>
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
                                key={index+place.prevPhoto}
                                onClick={() => showObject(index)}
                                className={classesCss.ShowplaceSlide}
                                style={{backgroundImage: `url(${place.prevPhoto})`}}
                            >
                                <h3>{place.langData[getLangIndex(place.langData)].name}</h3>
                                <div className={classesCss.ShortDescription}>
                                    {place.langData[getLangIndex(place.langData)].shortDescription}
                                </div>
                                {
                                    token?
                                        <RatingStars
                                            className={classesCss.Rating}
                                            classes={{
                                                rate: classesCss.RateNumber
                                            }}
                                            index={index}
                                            place={place}
                                            showRateCard={showRateCard}
                                        /> : null
                                }
                                {
                                    token && rateMap && rateMap[place._id].length> 0?
                                        <RateCard
                                            style={index === currentRateCard? showStyle: {}}
                                            data={rateMap[place._id]}
                                        /> : null
                                }

                            </SwiperSlide>)
                    }
                )}
                ...
            </Swiper>
        </>
    );
};