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
    preview: {
        type: String
    },
    artist: {
        type: String
    },
    author: {
        type: String
    },
    genres: {
        type: Array
    },
    overview: {
        type: String
    },
    release_date: {
        type: String
    },
    vote_average: {
        type: String
    },
    views: {
        type: String
    },
    like: {
        type: String
    },
    dislike: {
        type: String
    }
})

module.exports = mongoose.model('mmtv', mmtv)