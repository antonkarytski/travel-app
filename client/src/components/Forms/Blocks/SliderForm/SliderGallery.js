import React, {useState} from 'react'
import Textarea from "../../Textarea";
import Input from "../../Input/Input";
import classesCss from "./SliderForm.module.scss"
import SliderForm from "./SliderForm";


const SliderGallery = ({onChange, data}) => {

    return (
        <SliderForm
            data={data}
            onChange={onChange}
        >
            <Input
                className={classesCss.Input}
                name={"file"}
                label={"Photo: "}
            />
            <Textarea
                className={classesCss.Input}
                name={"description"}
                label={"Description: "}
                rows={5}
            />
        </SliderForm>
    )
}

export default SliderGallery