const request = require('request')

// 1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC
const geocodingApiKey = '6ea12aff9e4b99d2958de97174036fb5'

const geocoding = (address, callback) => {
    var geocodingUrl = 'http://api.positionstack.com/v1/forward?access_key=' + geocodingApiKey + '&query=' + address
    request({url: geocodingUrl, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Some error occurred!! Please check your connection and try again!', undefined)
        } else if (body.error) {
            callback('Some error occurred!! Err Msg: ' + body.error.message, undefined)
        } else if (body.data.length == 0) {
            // console.log('error')
            // console.log(geocodingUrl)
            // console.log(body.data[0])
            callback('Please provide a valid address!!')
        }  else {
            // console.log(body.data[0])
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocoding