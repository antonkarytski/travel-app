import React from 'react'
import classesCss from "./SliderForm.module.scss"


const SliderForm = ({onChange, data, children}) => {

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
                data.map((slide, slideIndex) => {
                    return (
                        <div
                            style={{backgroundImage: `url(${slide.file})`}}
                            key={`slide${slideIndex}`}
                            className={classesCss.Slide}
                        >
                            <div className={classesCss.SliderWrap}>
                                {
                                    children.map((child, index) => {
                                        return React.cloneElement(child,
                                            {
                                                value: slide[child.props.name],
                                                key: `${child.props.name + slideIndex + index}`,
                                                dataAttr: {...child.props.dataAttr, index:slideIndex},
                                                onChange: onChangeHandler
                                            })
                                    })
                                }
                            </div>
                            <button className={classesCss.RemoveButton}
                                    onClick={() => onRemoveHandler(slideIndex)}>X
                            </button>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}

export default SliderForm