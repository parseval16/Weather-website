const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Manoj'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Manoj'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        helpText : 'This is the help Text',
        title: 'Help',
        name: 'Manoj'
    })
})

app.get('/weather', (req,res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'Please Fill the address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        
        
        forecast(latitude,longitude,(error,forecastdata)=>{
    
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) =>{
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Manoj',
        errorMessage: 'Help article Not Found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Manoj',
        errorMessage: '404 Not Found'
    })
})

app.listen(port,() => {
    console.log("Server is up on port "+port)
})