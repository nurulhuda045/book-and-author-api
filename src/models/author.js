const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const authorSchema = mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error("Your password should not contain 'password'!")
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
})

authorSchema.methods.generateAuthToken = async function () {
    const author = this
    const token = jwt.sign({_id: author._id.toString()}, process.env.JWT_SECRET )
    author.tokens = author.tokens.concat({ token })
    await author.save()
    
    return token
}


authorSchema.statics.findByCredentials = async (email, password) => {
    const author = await Author.findOne({email})

    if(!author) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, author.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return author
}


// Set relation between author and books
authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id', 
    foreignField: 'owner_id'
})


// Hide private data
authorSchema.methods.toJSON = function () {
    const author = this
    const authorObject = author.toObject()

    delete authorObject.password
    delete authorObject.tokens

    return authorObject
}


// Hash the password before saving
authorSchema.pre('save', async function (next) {
    const author = this

    if (author.isModified('password')) {
        author.password = await bcrypt.hash(author.password, 8)
    }

    next()
})


const Author = mongoose.model('Author', authorSchema)

module.exports = Author