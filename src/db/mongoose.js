const mongoose = require('mongoose')
const express = require('express')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database')
}).catch((e) => {
    console.log('Not Connected to Database ERROR! ', e)
})