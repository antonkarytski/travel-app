const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    abbr: {type: String, required: true, unique: true},
})

module.exports = model('Lang', schema)