import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'


export default function Slider(props) {
    const [activeIndex, SetActiveIndex] = useState(0)

    useEffect (() => {
        const interval = setInterval(() => {
            SetActiveIndex(current => current === props.images.length-1 ? 0 : current +1)
        }, 5000)
        return () => clearInterval()
    }, [])
    const prevImageIndex = activeIndex ? activeIndex -1 : props.images.length -1
    const nextImageIndex = activeIndex === props.images.length -1 ? 0 : activeIndex +1

    return (
        <div>
            <div onClick = {() => {SetActiveIndex(prevImageIndex)}}>&lt;</div>
            <div>
                {/* {
                    props.images.map(imageObject => {
                        return (
                        <div>
                                {imageObject.url}
                            <img key={imageObject.url} src={imageObject.url} alt="" />
                        </div>
                        )
                    })
                } */}
                <div>
                        {props.images[activeIndex].url}
                    <img key={props.images[activeIndex].url} src={props.images[activeIndex].url} alt="" />
                </div>
            </div>
            <div>
                {
                    props.images.map((e, i) => {
                        return (
                        <div>
                            ---
                        </div>
                        )
                    })
                }
            </div>
            <div  onClick = {() => {SetActiveIndex(nextImageIndex)}}>&gt;</div>
        </div>
    )

}