const mongoose = require('mongoose')

const mmtv = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        default: '/no-photo.png'
    },
    name: {
        type: String,
        required: true
    },
    original_name: {
        type: String
    },
    genres: {
        type: Array
    },
    overview: {
        type: String
    },
    release_date: {
        type: String,
        required: true
    },
    vote_average: {
        type: String
    }
})

module.exports = mongoose.model('mmtv', mmtv)