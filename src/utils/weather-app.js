const request = require('request')

const address = 'Delhi'
const weatherApiKey = '8080451dc5584065b1a112148221203'
// var weatherUrl = 'https://api.weatherapi.com/v1/current.json?key=' + weatherApiKey
                    
const weather = (lat, long, callback) => {
    const weatherUrl = 'https://api.weatherapi.com/v1/current.json?key=' + weatherApiKey + 
                        '&q=' + lat + ',' + long + '&aqi=no'
    // console.log('Url: ' + weatherUrl)
    request({url: weatherUrl, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Some error occurred while fetching the weather information on ' 
                + address + '. Please check your connectivity and try again!!', undefined)
        } else if (body.error) {
            // console.log(body.error)
            callback('Some error occurred while fetching the weather information on ' 
                + address + '. Err Msg: ' + body.error.message, undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temp_c,
                unit: 'Degree Celsius'
            })
        }
    })
}

module.exports = weather