import React from 'react'
import classesCss from './styles/Structs.module.scss'


export default function Column({children, className}){
    return(
        <div className={[classesCss.Column, className].join(' ')}>
            {children}
        </div>
    )
}