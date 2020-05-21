const request = require('request')

const forecast = (lat,lon,callback)=>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=9ffde65db6ea5685ee649121eeda997f'

    request({url, json:true},(error,{body})=>   {
        if(error){
            callback('Unable to connect to the forecast',undefined)
        }else if(body.cod === "400"){
            callback('Invalid Input',undefined)
        }else{
            const msg = 'The Temperature is '+((body.main.temp - 273).toFixed(2))+'. The Weather is '+body.weather[0].description+'.'
            callback(undefined,msg)
        }
    })
}


module.exports = forecast

// const url ='http://api.openweathermap.org/data/2.5/weather?lat=37.8267&lon=-122.4233&APPID=9ffde65db6ea5685ee649121eeda997f'
