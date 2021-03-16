const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    countries: {type: [{}], default: []},
    name: {type: String, default: ""},
    image: {type: String, default: ""},
})

module.exports = model('User', schema)