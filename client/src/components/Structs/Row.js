import React from 'react'
import classesCss from './styles/Structs.module.scss'


export default function Row({children, className, style}){
    return(
        <div style={style} className={[classesCss.Row, className].join(' ')}>
            {children}
        </div>
    )
}