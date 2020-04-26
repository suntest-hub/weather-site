const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
//load another directory on express app OR define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views location  
app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(partialsDir)

// setup static directory to serve on web 
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Deepak Kumar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About page',
        content: 'This is an about page',
        name: 'Deepak Kumar'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'Help page ',
        message: 'Hello user !! I am here to help you.',
        name: 'Deepak Kumar'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if(error){
            return res.send({ error })
          }

        forecast(longitude,latitude, (error,data) => {
            if(error){
                return res.send({ error })
              }

              res.send({
                  location,
                  forecast: data,
                  address: req.query.address
              })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'Please enter the search query !'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404_page', {
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Deepak Kumar'
    })
})
//creating 404 page for our web application and note this has to be come at last of all other page URLs
app.get('*', (req,res) => {
    res.render('404_page', {
        title: 'Error 404',
        message: 'Page not found',
        name: 'Deepak Kumar'
    })
})

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log('Server started on port 3000 ')
})