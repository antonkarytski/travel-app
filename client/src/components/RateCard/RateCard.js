import React from 'react'
import Avatar from "@material-ui/core/Avatar"
import classesCss from './RateCard.module.scss'

const userImageLink = "https://travel-app-24.s3.eu-north-1.amazonaws.com/"

const RateCard = ({data, style}) => {
    return (
        <div className={classesCss.RateCard} style={style}>
            {
                data.map(record => {
                    return (
                        <div className={classesCss.RateRecord}>
                            <Avatar
                                className={classesCss.Avatar}
                                alt={record.name?.toUpperCase() || record.email?.toUpperCase()}
                                src={record.userImage? userImageLink+record.userImage: ""}
                            />
                            <span className={classesCss.UserName}>{record.name || record.email}</span>-
                            <span className={classesCss.Rate}>{record.value}</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default RateCard