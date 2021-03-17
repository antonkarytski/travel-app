const {Router} = require('express')
const router = Router()
const {Country, Showplace, Rating} = require('../models/Country')
const User = require('../models/User')
const {Types} = require('mongoose')

const langSet = ["EN", "RU", "FR"]

const langDummy = {
    countryName: "",
    shortText: "",
    capitalName: "",
    video: "",
    description: "",
    currency: "",
}

//http://s3.amazonaws.com/bucketname/filename

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
    '/showplace',
    async (req, res) => {
        const {
            showplaces
        } = req.body
        try {
            console.log(showplaces)

            const requestStack = []
            showplaces.forEach(place => {
                if (place.key === "remove") {
                    requestStack.push({
                        deleteOne: {
                            filter: {_id: new Types.ObjectId(place._id)},
                        }
                    })
                } else if (place.index >= 0) {
                    delete place.index
                    requestStack.push({
                        insertOne: {
                            document: place
                        }
                    })
                } else {
                    requestStack.push({
                        updateOne: {
                            filter: {_id: Types.ObjectId(place._id)},
                            update: {$set: place},
                        }
                    })
                }
            })

            await Showplace.bulkWrite(requestStack, (err, res) => {
                console.log('err:', err)
                console.log('res:', res)
            })
            res.status(201).json({message: "Showplace was successfully updated"})
        } catch (e) {
            res.status(500).json({message: "We got error", e})
        }
    })

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
            key //all, showplaces, showplacesOnly
        } = req.body
        try {
            let countrySet = {
                langs: langSet,
                showplaces: []
            }
            if (countryCode) {
                if (key === "showplaces") {
                    countrySet.countries = await Country.findOne({countryCode})
                    countrySet.showplaces = await Showplace.find({countryCode})
                } else if (key === "showplacesOnly") {
                    countrySet.showplaces = await Showplace.find({countryCode})
                } else {
                    countrySet.countries = await Country.findOne({countryCode})
                }
            } else if (key === "showplaces" || key === "showplacesOnly") {
                countrySet.showplaces = await Showplace.find({})
            } else {
                countrySet.countries = await Country.find({})
                if (key === "all") {
                    countrySet.showplaces = await Showplace.find({})
                }
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


router.post(
    '/setstar',
    async (req, res) => {
        try {
            const {
                showplace,
                user,
                value
            } = req.body

            console.log(showplace, user)

            const prevRating = await Rating.findOneAndUpdate(
                {user, showplace},
                {user, showplace, value},
                {
                    upsert: true,
                    useFindAndModify: false
                }
            )
            //If record was updated, so this is not a new mark
            const {rate, rateCount} = await Showplace.findOne({_id: showplace})
            let newRate;
            let newRateCount;
            if (!prevRating) {
                newRateCount = (rateCount ?? 0) + 1
                newRate = (rate * rateCount + value) / newRateCount
            } else {
                newRate = (rate * rateCount - prevRating.value + value) / rateCount
                newRateCount = rateCount
            }
            console.log(newRate, newRateCount)
            await Showplace.findOneAndUpdate(
                {_id: showplace},
                {
                    $set: {
                        rate: newRate,
                        rateCount: newRateCount
                    }
                },
                {
                    upsert:false,
                    useFindAndModify: false
                })

            res.status(201).json({newRate, newRateCount})
        } catch (e) {
            res.status(500).json({message: "Something gonna wrong"})
        }
    }
)


router.post(
    '/getrates',
    async(req, res) => {
        try{
            const {
                places
            } = req.body
            const rating = await Rating.find({'showplace': { $in: places}})
            const userIdMap = rating.map(rate => {
                return rate.user.toString()
            })
            const uniqueUsers = userIdMap.filter((item, i, arr) => {
                return arr.indexOf(item) === i
            });
            const uniqueUsersDecode = uniqueUsers.map(user => {
                return Types.ObjectId(user)
            })
            const users = await User.find({'_id': { $in:uniqueUsersDecode}})
            const rateMap = {}
            places.map(place => {
                const marksBuffer = []
                users.forEach(user => {
                    let reduceIndex = -1
                    const userMark = rating.find((mark, index) => {
                        if(mark.user.toString() === user._id.toString()
                            && mark.showplace.toString() === place.toString()){
                            reduceIndex = index
                            return true
                        }
                        return false
                    })
                    if(userMark?.value){
                        if(reduceIndex >= 0) rating.splice(reduceIndex,1)
                        const userCard = {
                            value: userMark.value,
                            userImage: user.image,
                            id: user._id
                        }
                        if(user.name) userCard.name = user.name
                        else userCard.email = user.email
                        marksBuffer.push(userCard)
                    }
                })
                rateMap[place] = marksBuffer
            })
            res.status(201).json(rateMap)
        } catch (e) {
            res.status(500).json({message: "Something gonna wrong"})
        }


    }
)

module.exports = router