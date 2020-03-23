const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
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
        title: 'Alpaczna Pogoda',
        name: 'Alpacas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'O nas',
        name: 'Alpacas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Pomoc',
        name: 'Alpacas'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Wpisz coś!'
        })
    } 
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forcastData, comment) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forcastData,
                location,
                comment: comment,
                address: address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Alpacas'
    })
})

app.get('*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Alpacas'
    })
})


//ap.com
//app.com/help
//app.com/about

app.listen(3000, () =>{
    console.log('server is up on port 3000.')
})