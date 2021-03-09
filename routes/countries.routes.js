const {Router} = require('express')
const router = Router()
const {Country, LangCountry} = require('../models/Country')

const langSet = ["EN", "RU", "FR"]

const countryDummy = {
    countryCode: "",
    langData:[]
}
const langShortDummy = {
    lang: "",
    countryName: "",
    shortText: "",
    capitalName: "",
}
const langFullDummy = {
    lang: "",
    countryCode: "",
    countryName: "",
    description: "",
    capitalName: "",
}

router.post(
    '/add',
    async (req,res) => {

        let {
            countryCode
        } = req.body
        countryCode = countryCode.toUpperCase()

        try{
            const countryCheck = await Country.findOne({countryCode})
            if(countryCheck){
                res.status(400).json({message: "We already have this country"})
            }
            const countryEmptyBase = {
                ...countryDummy,
                countryCode: countryCode,
            }
            for(let i = 0; i < langSet.length; i++){
                countryEmptyBase.langData.push({
                    ...langShortDummy,
                    lang: langSet[i]
                })
            }
            await Country.create(countryEmptyBase, e => e)
            for(let i = 0; i < langSet.length; i++){
                await LangCountry.create({
                    ...langFullDummy,
                    lang: langSet[i],
                    countryCode : countryCode,
                }, e => e)
            }
            res.status(201).json({message: "Country was successfully added"})
        } catch(e){
            res.status(500).json({message: "We got error", e})
        }
    }
)

router.post(
    '/update',
    async (req, res) => {
        const {
            countryData,
            langCountryData
        } = req.body
        try{
            const countryCheck = await Country.findOne({countryCode: countryData.countryCode})
            if(countryCheck){
                const bulkQueue = []
                for(let i = 0; i < langCountryData.length; i++){
                    const langCountry = {countryCode: countryData.countryCode, lang: langCountryData[i].lang}
                    bulkQueue.push({
                        updateOne:{
                            "filter":langCountry,
                            "update":{$set:{...langCountryData[i]}},
                            "upsert":true
                        }
                    })
                }
                if(bulkQueue.length>0) {
                    await LangCountry.bulkWrite(bulkQueue)
                }
                await Country.updateOne({countryCode: countryData.countryCode}, countryData)
            } else {
                // await Country.create({countryCode: countryData.countryCode}) creating!
                // await LangCountry.create(countryData, err => {return err})
            }
            res.status(201).json({message: "Country was successfully update"})
        } catch(e){
            console.log(e)
            res.status(500).json({message: "We got error", e})
        }
    }
)

router.post(
    '/get',
    async (req, res) => {
        const {
            countryCode,
            lang,
            key //short
        } = req.body
        try{
            let countrySet = {
                langs: langSet
            }
            if(key === "short"){
                countrySet.countries = await Country.find({})
            }else if(countryCode && lang) {
                countrySet.countries = await Country.findOne({countryCode})
                countrySet.langCountries = await LangCountry.findOne({countryCode, lang})
            } else if(countryCode){
                countrySet.countries = await Country.findOne({countryCode})
                countrySet.langCountries = await LangCountry.find({countryCode})
            } else if(lang){
                countrySet.countries = await Country.find({})
                countrySet.langCountries = await LangCountry.find({lang})
            } else {
                countrySet.countries = await Country.find({})
                countrySet.langCountries = await LangCountry.find({})

            }
            res.json(countrySet)
        } catch(e){
            res.status(500).json({message: "Something wrong", e})
        }
    }
)

module.exports = router