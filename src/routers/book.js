const express = require('express')
const auth = require('../middleware/auth')
const Book = require('../models/book')
const Author = require('../models/author')
const router = new express.Router()


router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner_id: req.author._id,
        book_author: req.author.name
    })
    try{
        await book.save()
        res.status(201).send(book)
    } catch(e) {
        res.status(400).send()
    }
})


// Read books
router.get('/books', auth, async (req, res) => {

    try {
        await req.author.populate('books').execPopulate()
        res.send(req.author.books)
    } catch(e) {
        res.status(500).send()
    }

})


// Read book
router.get('/books/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findOne({_id, owner_id: req.author._id})

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch(e) {
        res.status(500).send(e)
    }
    
})


// book Update
router.patch('/books/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try {
        const book = await Book.findOne({_id, owner: req.author._id})

        if(!book) {
            return res.status(404).send()
        }
        updates.forEach((update) => book[update] = req.body[update])
        await book.save()
        res.send(book)
    } catch(e) {
        res.status(400).send()
    }
})
 



router.get('/books/:id')

module.exports = router