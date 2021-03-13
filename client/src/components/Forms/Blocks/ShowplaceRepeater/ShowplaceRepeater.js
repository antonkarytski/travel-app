import React, {useContext, useState} from 'react'
import Textarea from "../../Textarea";
import Input from "../../Input/Input";
import {AppContext} from "../../../../context/AppContext";
import classesCss from './ShowplaceRepeater.module.scss'
import Row from "../../../Structs/Row";

const ShowplaceRepeater = ({addHandler, onChange, showplaces, currentLang, currentCountry}) => {

    const getLangIndex = (langSet, currentLang) => {
        return langSet.findIndex((langData) => {
            return langData.lang === currentLang
        })
    }

    const checkValue = (value) =>{
        if(value === undefined) return ""
        return value
    }

    return (
        <div className={classesCss.ShowplaceRepeater}>
            <div onClick={addHandler} className={classesCss.AddButton}>
                Add showplace
            </div>
            {showplaces ?
                showplaces.map((showplace, index) => {
                    const langIndex = getLangIndex(showplace.langData, currentLang)
                    return (
                        <div key={index} className={classesCss.Item}>
                            <div className={classesCss.PreviewEditor}>
                                <img alt={""} src={showplace.prevPhoto || ""}/>
                                <Input
                                    name={"prevPhoto"}
                                    label={"Preview: "}
                                    value={showplace.prevPhoto || ""}
                                    dataAttr={{index: showplace._id || showplace.index }}
                                    onChange={onChange}
                                />
                                <Input
                                    name={"name"}
                                    label={"Name: "}
                                    value={checkValue(showplace.langData[langIndex].name)}
                                    dataAttr={{
                                        index: showplace._id || showplace.index,
                                        key: "lang"}}
                                    onChange={onChange}
                                />
                                <Textarea
                                    className={classesCss.Input}
                                    name={"shortDescription"}
                                    label={"Short description: "}
                                    rows={5}
                                    value={checkValue(showplace.langData[langIndex].shortDescription)}
                                    dataAttr={{
                                        index: showplace._id || showplace.index,
                                        key: "lang"
                                    }}
                                    onChange={onChange}
                                />
                            </div>
                            <div className={classesCss.FullEditor}
                                 style={{backgroundImage: `url(${showplace.fullPhoto || ""})`}}>
                                <Input
                                    className={classesCss.Input}
                                    name={"fullPhoto"}
                                    label={"Photo: "}
                                    value={showplace.fullPhoto || ""}
                                    onChange={onChange}
                                    dataAttr={{index: showplace._id || showplace.index}}
                                />
                                <Textarea
                                    className={classesCss.Input}
                                    name={"description"}
                                    label={"Description: "}
                                    value={checkValue(showplace.langData[langIndex].description)}
                                    dataAttr={{
                                        index: showplace._id || showplace.index,
                                        key: "lang"
                                    }}
                                    rows={8}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}


export default ShowplaceRepeater