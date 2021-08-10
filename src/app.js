const path = require('path')

const express = require('express')
const hbs = require('hbs');

const geocode = require('./utils/geocoode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sri Hari Acha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sri Hari Acha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        sometext: 'This is some text',
        name: 'Sri Hari Acha'
    })
})

app.get('/weather', (req, res) => {
    const {query: {address}} = req;
    if (!address) {
        return res.send({
            error: 'you must provide a address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({'error': error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({'error': error});
            }
    
            res.send({
                forecast: `It is currently ${forecastData.temperature} out`,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('nopage', {
        pageMessage: 'help not found',
        title: 'Help',
        name: 'Sri Hari Acha'
    })
})

app.get('*', (req, res) => {
    res.render('nopage', {
        pageMessage: 'Page not found',
        title: 'Help',
        name: 'Sri Hari Acha'
    })
})

app.listen(3000, () => {
    console.log('listening at 3000')
})