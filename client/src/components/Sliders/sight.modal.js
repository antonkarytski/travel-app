import React from 'react';
import Modal from '@material-ui/core/Modal';

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
                    <div>
                        <div onClick={onClose}>
                            X
                        </div>
                        <img src={props.content?.fullPhoto} alt=""/>
                        <div>{props.content?.description}</div>

                    </div>
        </Modal>
    )
}