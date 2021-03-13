import React, {useState} from 'react';
import ModalWindow from './sight.modal'
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Scrollbar} from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


SwiperCore.use([Navigation, Scrollbar]);



export default function SightGallery (props) {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [objectIndex, setObjectIndex] = useState(null)
    const onClose = () => {
      setModalVisibility(false);
    }
    const showObject = (i) => {
      setModalVisibility(true)
      setObjectIndex(i)

    }

    return (
      <>
        <ModalWindow isOpened={isModalVisible} onClose={onClose} content={props.places[objectIndex]} />
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          navigation
          scrollbar ={{draggable: true, hide: false}}

        >

        {props.places.map((e, i) =>
                  {
                    return (<SwiperSlide>
                      <div onClick={() => { showObject(i)}}><img src={e.prevPhoto} alt=""/></div>
                      <div>{e.description}</div>
                    </SwiperSlide>)
                  }

                )}
          ...
        </Swiper>
      </>
    );
  };