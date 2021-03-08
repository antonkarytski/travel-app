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
                }, err => {return err})
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
        const countryData = req.body
        try{
            const countryCheck = await Country.findOne({countryCode: countryData.countryCode})
            if(countryCheck){
                const langCountry = {countryCode: countryData.countryCode, lang: countryData.lang}
                const countryLangCheck = await LangCountry.findOne(langCountry)
                if(countryLangCheck){
                    await LangCountry.updateOne(langCountry, countryData)
                } else {
                    await LangCountry.create(countryData, err => {return err})
                }
            } else {
                await Country.create({countryCode: countryData.countryCode})
                await LangCountry.create(countryData, err => {return err})
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
            let countrySet = {}
            if(countryCode && lang) {
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