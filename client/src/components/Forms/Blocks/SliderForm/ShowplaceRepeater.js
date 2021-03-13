import React, {useContext, useState} from 'react'
import Textarea from "../../Textarea";
import Input from "../../Input/Input";
import classesCss from "./SliderForm.module.scss"
import SliderForm from "./SliderForm";
import {AppContext} from "../../../../context/AppContext";

const ShowplaceRepeater = ({addHandler, onChange, showplaces}) => {

    // const onChangeHandler = event => {
    //     const changeData = [...data]
    //     changeData[event.target.dataset.index][event.target.name] = event.target.value
    //     onChange(changeData)
    // }
    //
    // const onAddHandler = () => {
    //
    // }
    //
    // const onRemoveHandler = (index) => {
    //     const changeData = [...data]
    //     changeData.splice(index, 1)
    //     onChange(changeData)
    // }


    return (
        <div>
            {/*<div className={classesCss.AddButton} onClick={addHandler}>*/}
            {/*    Добавить слайд*/}
            {/*</div>*/}
            {/*{data ?*/}
            {/*    data.map((slide, index) => {*/}
            {/*        return (*/}
            {/*            <div*/}
            {/*                style={{backgroundImage: `url(${slide.file})`}}*/}
            {/*                key={`slide${Math.random()}`}*/}
            {/*                className={classesCss.Slide}*/}
            {/*            >*/}
            {/*                <div className={classesCss.SliderWrap}>*/}
            {/*                    {*/}
            {/*                        children.map((child, index) => {*/}
            {/*                            return React.cloneElement(child,*/}
            {/*                                {*/}
            {/*                                    value: slide[child.props.name],*/}
            {/*                                    key: Math.random(),*/}
            {/*                                    dataAttr: {...child.props.dataAttr, index},*/}
            {/*                                    onChange: onChangeHandler*/}
            {/*                                })*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*                <button className={classesCss.RemoveButton}*/}
            {/*                        onClick={() => onRemoveHandler(index)}>X*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }) : null*/}
            {/*}*/}
        </div>
    )
}



export default ShowplaceRepeater