const mongoose = require('mongoose')

const BookSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Book', BookSchema)