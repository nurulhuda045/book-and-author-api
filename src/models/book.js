const mongoose = require('mongoose')
const validator = require('validator')


const Book = mongoose.model('Book', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    book_author: {
        type: String
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})


module.exports = Book