const {Schema, model} = require('mongoose')

const countySchema = new Schema({
    countryCode: {type: String, required: true, unique: true},
    preview: {type: String, required: false, default: ""},
    countryRate: {type: Number, required: false, default: 0},
    countryCoordinates: {
        type: [Number],
        validate: [arrayLimit, '{PATH} have to have only two coordinates'],
        default: [0, 0]
    },
    countryPhotos: {
        type: [{
            file: {type: String, default: ""},
            description: {type: String, default: ""},
            rate: {type: Number, default: 0},
        }], required: false, default: []
    },
    showplaces: {
        type: [{
            prevPhoto: {type: String, default: ""},
            fullPhoto: {type: String, default: ""},
            description: {type: String, default: ""},
            location:{
                type: [Number],
                validate: [arrayLimit, '{PATH} have to have only two coordinates'],
                default: [0, 0]
            },
            rate: {type: Number, default: 0},
        }], required: false, default: []
    },
    langData: [
        {
            lang: {type: String, required: true},
            countryName: {type: String, required: false, default: ""},
            capitalName: {type: String, required: false, default: ""},
            shortText: {type: String, required: false, default: ""},
            description: {type: String, required: false, default: ""},
            video: {type: String, required: false, default: ""},
        }
    ]

}, {collection: "countries"})

function arrayLimit(val) {
    return val.length <= 2;
}

module.exports = {
    Country: model('Country', countySchema)
}