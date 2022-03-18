// console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://api.positionstack.com/v1/forward?access_key=6ea12aff9e4b99d2958de97174036fb5&query=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.data.length == 0) {
//             return console.log('Unable to fetch Geocoding')
//         }
//         console.log(data.data)
//         fetch('https://api.weatherapi.com/v1/current.json?key=8080451dc5584065b1a112148221203&q=' + data.data[0].latitude + ',' + data.data[0].longitude + '&aqi=no').then((weatherResponse) => {
//             weatherResponse.json().then((weatherData) => {
//                 console.log(weatherData)
//                 if (weatherData.error) {
//                     return console.log('Unable to fetch Weather details')
//                 }
//                 console.log('Current temp is ' + weatherData.current.temp_c + ' Degree Celsius')
//             })
//         })
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            message1.textContent = ''
            message2.textContent = ''
            message3.textContent = ''
            message4.textContent = ''
            message5.textContent = ''
            message6.textContent = ''
            message7.textContent = ''
            message8.textContent = ''

            if (data.error) {
                message1.textContent = data.error
            } else {
                console.log(data)
                message2.textContent = 'Location: ' + data.location
                message3.textContent = 'Temperature in °C: ' + data.temperature
                message4.textContent = 'Feels like temperature in °C: ' + data.feels_like
                message5.textContent = 'Pressure in millibars: ' + data.pressure
                message6.textContent = 'Precipitation in millimeters: ' + data.precipitation
                message7.textContent = 'Humidity: ' + data.humidity
                message8.textContent = 'Wind speed in killometers per hour: ' + data.wind_speed
            }
        })
    })
})