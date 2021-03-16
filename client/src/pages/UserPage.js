import React, {useContext, useEffect, useState} from 'react'
import ImageUploading from 'react-images-uploading';
import classesCss from './styles/AuthPage.module.scss'
import Input from "../components/Forms/Input/Input";
import {AppContext} from "../context/AppContext";
import {useHttp} from "../hooks/useHttp";

export default function UserPage({updateSearch}) {
    const [image, setImage] = useState([]);
    const [name, setName] = useState("");
    const {loading, error, request} = useHttp()
    const auth = useContext(AppContext)

    const onChangeImage = (image) => {
        setImage(image);
    };

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onSendHandler = async () => {
        console.log(image[0])
        const header = {
            'content-type': image[0].file.type
        }
        const body = {
            image:image[0],
            imgType: image[0].file.type.substr(-3,3),
            name,
            id: auth.userId
        }
        try {
            const res = await request('/api/user/upd', 'POST', body)
            console.log(res)
        } catch (e) {
        }
    }


    useEffect(() => {
        updateSearch({exists: false});
    }, []);

    console.log(auth)

    return (
        <div className={classesCss.UserPage}>
            <Input
                value={name}
                name={"name"}
                className={classesCss.NameInput}
                label={"Your Name:"}
                autoComplete={"off"}
                onChange={onChangeName}
            />
            <ImageUploading
                value={image}
                onChange={onChangeImage}
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
                            !imageList.length > 0 ?
                                <button
                                    className={classesCss.ImageLoadButton}
                                    style={isDragging ? {color: 'red'} : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </button> : null
                        }

                        &nbsp;
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100"/>
                                <div className="image-item__btn-wrapper">
                                    <button
                                        onClick={() => onImageUpdate(index)}
                                        className={classesCss.ImageHandler}>
                                        Update
                                    </button>
                                    <button
                                        onClick={() => onImageRemove(index)}
                                        className={classesCss.ImageHandler}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            <button
                onClick={onSendHandler}
                className={classesCss.SaveButton}>
                Save
            </button>
        </div>
    )
}