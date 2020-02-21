const express = require('express')
const router = express.Router()
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieFlashMessages = require('cookie-flash-messages')


//Listen on PORT
const server = app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT)
})

//Require routes

var indexRouter = require('./routes/index')
var campeurRouter = require('./routes/campeur')

app.use('/', indexRouter)
app.use('/campeur', campeurRouter)

// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found')
    err.status = 404
    next(err)
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message)
})

module.exports = router