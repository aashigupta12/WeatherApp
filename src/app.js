const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const e = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')  //hbs in express view engine for handlebars
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aashi Gupta'
    })    //index=index.hbs
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aashi Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'HELP',
        Message: 'I need help with weather application.',
        name: 'AashiGupta'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address.'
        })
    }
    geocode(req.query.address, (error, { latitude,longitude,location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                latitude, longitude,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req,res) => {
    if (!req.query.search) {
       res.send({
            error: 'You must provide a search term.'
        })
    } else {
        console.log(req.query.search)
    res.send({
        products: []
    })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Aashi Gupta',
        errorMessage:'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aashi Gupta',
        errorMessage: 'Page Not Found!!'
    })
})


//app.com  -> route url
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})