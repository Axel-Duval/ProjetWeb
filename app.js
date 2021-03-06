const express = require('express')
const router = express.Router()
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSanitizer = require('express-sanitizer')
const csrf = require('csurf')
const hpp = require('hpp')


//Listen on PORT
const server = app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT)
})

//Require Routers
const indexRouter = require('./routes/index')
const camperRouter = require('./routes/camper')
const staffRouter = require('./routes/staff')
const managerRouter = require('./routes/manager')
const csrfMW = csrf({cookie:true})

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSanitizer());
app.use(csrfMW);
app.use(hpp());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter)
app.use('/campeur', camperRouter)
app.use('/personnel', staffRouter)
app.use('/manager', managerRouter)



// Errors => page not found 404
app.use((req, res, next) =>  {
    next(err)
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('includes/errors.ejs',{title : "CDS | Page not found", status : 404, text : 'Le site configuré à cette adresse ne contient pas la ressource demandée', sub_text : "Assurez-vous que le nom et la casse correspond bien à l'URI souhaité.", code : "Page non trouvée"})
})

module.exports = router