import React, {useState} from 'react'
import Textarea from "../Textarea";
import Input from "../Input/Input";
import classesCss from "./SliderForm.module.scss"
import Row from "../../Structs/Row";


const SliderForm = ({onChange, data}) => {

    const onChangeHandler = event => {
        const changeData = [...data]
        changeData[event.target.dataset.index][event.target.name] = event.target.value
        onChange(changeData)
    }

    const onAddHandler = () => {
        const changeData = [...data]
        changeData.splice(0, 0, {file: "", description: ""})
        onChange(changeData)
    }

    const onRemoveHandler = (index) => {
        const changeData = [...data]
        changeData.splice(index, 1)
        onChange(changeData)
    }


    return (
        <div className={classesCss.Slider}>
            <div className={classesCss.AddButton} onClick={onAddHandler}>
                Добавить слайд
            </div>
            {data ?
                data.map((slide, index) => {
                    return (
                        <div
                            style={{
                                backgroundImage: `url(${slide.file})`
                            }}
                            key={`slide${index}`}
                            className={classesCss.Slide}
                        >
                            <div className={classesCss.SliderWrap}>
                                <Row>
                                    <Input
                                        className={classesCss.Input}
                                        name={"file"}
                                        label={"Photo: "}
                                        value={slide.file}
                                        dataAttr={{index}}
                                        onChange={onChangeHandler}
                                    />
                                    <button className={classesCss.RemoveButton}
                                            onClick={() => onRemoveHandler(index)}>X
                                    </button>
                                </Row>
                                <Textarea
                                    className={classesCss.Input}
                                    name={"description"}
                                    label={"Description: "}
                                    value={slide.description}
                                    dataAttr={{index}}
                                    onChange={onChangeHandler}
                                    rows={5}
                                />
                            </div>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}

export default SliderForm