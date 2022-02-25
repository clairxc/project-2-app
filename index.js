// import express
const express = require('express')
// create an express instance
const app = express()
// import ejs layouts
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config() // allows us to access env vars

// MIDDLEWARE
app.set('view engine', 'ejs') // set view engine to ejs
app.use(ejsLayouts) // tell express we want to use layouts

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