const {Schema, model} = require('mongoose')

const countySchema = new Schema({
    countryCode: {type : String, required: true, unique: true},
}, {collection : "countries"})

const countryLangSchema = new Schema({
    lang: {type : String, required: true},
    countryCode: {type : String, required: true},
    name: {type: String, required: true},
    shortText: {type: String, required: false},
    description: {type: String, required: true},
    capitalName: {type: String, required: false}
}, {collection : "lang-countries"})

module.exports = {
    Country: model('Country', countySchema),
    LangCountry: model('LangCountry', countryLangSchema)
}