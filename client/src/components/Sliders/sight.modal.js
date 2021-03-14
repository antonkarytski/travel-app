import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Scrollbar} from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


export default function ModalWindow (props) {
    const onClose = () => {
        props.onClose?.();
    }
    return (

        <Modal
            open={props.isOpened}

            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          scrollbar ={{draggable: true, hide: false}}

        >

        {props.content.map((e, i) =>
                  {
                    return (<SwiperSlide key={i+e.fullPhoto}>

                    <div>
                        <div onClick={onClose}>
                            X
                        </div>
                        <img src={e?.fullPhoto} alt=""/>
                        <div>{e?.description}</div>

                    </div>
                    </SwiperSlide>)
                  }

                )}
          ...
        </Swiper>
        </Modal>
    )
}