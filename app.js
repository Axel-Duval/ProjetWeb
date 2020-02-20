const express = require('express')
const router = express.Router()
const app = express()
const PORT = process.env.PORT || 5000

//Require controller modules


/// INTERNAUTE ROUTES ///
/// CAMPEUR ROUTES ///
/// PERSONNEL ROUTES ///
/// MANAGER ROUTES ///


const server = app.listen(PORT, () => {
    console.log('Server is running on port 3000...');
});

router.get('/',(req,res)=>{
    res.send("J'ai réussi à héberger mon site avec Hiroku !")
})

// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404
    next(err)
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message)
})

module.exports = router