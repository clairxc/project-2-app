// import express
const express = require('express')
// create an express instance
const app = express()
// import ejs layouts
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config() // allows us to access env vars
const cookieParser = require('cookie-parser')
const cryptojs = require('crypto-js')
const db = require('./models')

// MIDDLEWARE
app.set('view engine', 'ejs') // set view engine to ejs
app.use(ejsLayouts) // tell express we want to use layouts
app.use(cookieParser()) // gives us access to req.cookies
app.use(express.urlencoded({extended:false})) // body parser (to make req.body work)

// CUSTOM LOGIN MIDDLEWARE
app.use(async (req, res, next) => {
    if(req.cookies.userId) {
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptojs.enc.Utf8)
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString)
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user //res.locals.taco
    } else res.locals.user = null
    next() // move on to next middleware
})


// CONTROLLERS
app.use('/users', require('./controllers/users.js'))


// ROUTES
app.get('/', (req, res) => {
    // res.send('Hello, backend!')
    res.render('home.ejs')
})




// check for an env PORT, otherwise use 8000
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Auth app running on ${PORT}`)
})