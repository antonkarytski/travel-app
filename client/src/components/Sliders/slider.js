import React, { useEffect, useState } from 'react'


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
            <div>&lt;</div>
            <div>
                {
                    props.images.map(imageObject => {
                        return <img key={imageObject.url} src={imageObject.url} alt="" />
                    })
                }
            </div>
            <div>
                div
            </div>
            <div>&gt;</div>
        </div>
    )

}