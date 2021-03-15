import React, {useState} from 'react'
import ImageUploading from 'react-images-uploading';
import classesCss from './styles/AuthPage.module.scss'
import Input from "../components/Forms/Input/Input";

export default function UserPage(){
    const [images, setImages] = useState([]);
    const [name, setName] = useState([]);

    const onChange = (imageList) => {
        setImages(imageList);
    };


    const nameOnChange = (event) => {
        setName(event.target.value);
    };

    return(
        <div className={classesCss.UserPage}>
            <Input
                value={name}
                name={'name'}

            />
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
        >
            {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    {
                        !imageList.length>0?
                            <button
                                className={classesCss.ImageLoadButton}
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </button> : null
                    }

                    &nbsp;
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
        </div>
    )
}