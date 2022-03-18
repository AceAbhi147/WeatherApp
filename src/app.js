const geocoding = require('./utils/geocoding')
const weather = require('./utils/weather-app')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Use express
const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhishek'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhishek'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address!!'
        })
    }

    // console.log(req.query.address)

    geocoding(req.query.address, (errorMessage, { latitude, longitude, location } = {}) => {
        if (errorMessage) {
            res.send({
                error: errorMessage
            })
        } else {
            weather(latitude, longitude, (errorMessage, { temperature, unit } = {}) => {
                if (errorMessage) {
                    // console.log(errorMessage)
                    return res.send({
                        error: errorMessage
                    })
                }
                res.send({
                    temperature,
                    unit,
                    address: req.query.address,
                    location
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})