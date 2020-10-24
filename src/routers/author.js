const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const Author = require('../models/author')
const Book = require('../models/book')
const router = new express.Router()



router.post('/authors', async (req, res) => {
    const author = new Author(req.body)

    try {
        await author.save()
        const token = await author.generateAuthToken()
        res.status(201).send({author, token})
    } catch(e) {
        res.status(500).send()
    }
})


// author login
router.post('/authors/login', async (req, res) => {
    try {
        const author = await Author.findByCredentials(req.body.email, req.body.password)
        const token = await author.generateAuthToken()
        res.send({author, token})
    } catch(e) {
        res.status(400).send()
    }
})


// author logout
router.post('/authors/logout', auth, async (req, res) => {
    try {
        req.author.tokens = req.author.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.author.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})


// Read authors
router.get('/authors/me', auth, async (req, res) => {
    res.send(req.author)
})


// author Update
router.patch('/authors/me', auth, async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try {

        updates.forEach((update) => req.author[update] = req.body[update])

        await req.author.save()

        res.send(req.author)
    } catch(e) {
        res.status(400).send()
    }
})




module.exports = router