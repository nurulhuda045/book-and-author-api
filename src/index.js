require('./db/mongoose')
const express = require('express')
const Author = require('./models/author')
const Book = require('./models/book')
const authorRouter = require('./routers/author')
const bookRouter = require('./routers/book')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(authorRouter)
app.use(bookRouter)


app.listen(port, () => {
    console.log('server is up on port '+ port)
})

