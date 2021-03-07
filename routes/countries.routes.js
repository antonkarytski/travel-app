const {Router} = require('express')
const router = Router()
const {Country, LangCountry} = require('../models/Country')

router.post(
    '/add',
    async (req,res) => {

        const {
            countryCode,
            countryLangData
        } = req.body

        try{
            const countryCheck = await Country.findOne({countryCode})
            if(countryCheck){
                res.status(400).json({message: "We already have this country"})
            }
            await Country.create({
                countryCode: countryCode.toUpperCase(),
            }, err => {return err})
            if(countryLangData && countryLangData.lang){
                await LangCountry.create({
                    countryCode: countryCode.toUpperCase(),
                    ...countryLangData
                })
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
            countryCode,
            countryLangData
        } = req.body
        try{

            const countryCheck = await Country.findOne({countryCode})
            if(countryCheck){
                const langCountry = {countryCode, lang: countryLangData}
                const countryLangCheck = await LangCountry.findOne(langCountry)
                if(countryLangCheck){
                    await LangCountry.updateOne(langCountry, {
                        countryCode,
                        ...countryLangData
                    })
                } else {
                    await LangCountry.create({
                        countryCode,
                        ...countryLangData
                    })
                }
            } else {
                await Country.create({
                    countryCode
                })
                await LangCountry.create({
                    countryCode,
                    ...countryLangData
                })
            }
            res.status(201).json({message: "Country was successfully update"})
        } catch(e){
            res.status(500).json({message: "We got error", e})
        }
    }
)

router.post(
    '/get',
    async (req, res) => {
        const {
            countryCode,
            lang
        } = req.body
        try{
            let countrySet
            if(countryCode && lang) {
                countrySet = await Country.findOne({countryCode})
                countrySet.langData = await LangCountry.findOne({countryCode, lang})
            } else if(countryCode){
                countrySet = await Country.findOne({countryCode})
                countrySet.langData = await LangCountry.findOne({countryCode})
            } else if(lang){
                countrySet = await Country.find({})
                countrySet.langData = await LangCountry.find({lang})
            } else {
                countrySet = await Country.find({})
                countrySet.langData = await LangCountry.find({})
            }
            res.json(countrySet)
        } catch(e){
            res.status(500).json({message: "Something wrong", e})
        }
    }
)

module.exports = router