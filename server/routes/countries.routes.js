const {Router} = require('express')
const router = Router()
const {Country} = require('../models/Country')

const langSet = ["EN", "RU", "FR"]

const langDummy = {
    countryName: "",
    shortText: "",
    capitalName: "",
    video: "",
    description: "",
}

router.post(
    '/add',
    async (req, res) => {
        let {
            countryCode
        } = req.body
        countryCode = countryCode.toUpperCase()
        try {
            const countryCheck = await Country.findOne({countryCode})
            if (countryCheck) {
                res.status(400).json({message: "We already have this country"})
            }
            const countryEmptyBase = {
                countryCode,
                langData: []
            }
            for (let i = 0; i < langSet.length; i++) {
                countryEmptyBase.langData.push({
                    ...langDummy,
                    lang: langSet[i]
                })
            }

            await Country.create(countryEmptyBase, e => e)
            res.status(201).json({message: "Country was successfully added"})
        } catch (e) {
            res.status(500).json({message: "We got error", e})
        }
    }
)

router.post(
    '/update',
    async (req, res) => {
        const {
            countryData
        } = req.body
        try {
            await Country.findOneAndUpdate({countryCode: countryData.countryCode}, countryData)
            res.status(201).json({message: "Country was successfully update"})
        } catch (e) {
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
        try {
            let countrySet = {
                langs: langSet
            }
            if (countryCode) {
                countrySet.countries = await Country.findOne({countryCode})
            } else {
                countrySet.countries = await Country.find({})
            }
            res.json(countrySet)
        } catch (e) {
            res.status(500).json({message: "Something wrong", e})
        }
    }
)

router.post(
    '/remove',
    async (req, res) => {
        try {
            const {
                countryCode
            } = req.body

            if (countryCode) {
                await Country.findOneAndDelete({countryCode})
                res.status(201).json({message: "Country removed"})
            }
        } catch (e) {
        }
    }
)


module.exports = router