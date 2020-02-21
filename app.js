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

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cookieFlashMessages)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')



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