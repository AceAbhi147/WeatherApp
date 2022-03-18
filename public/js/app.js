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
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ''
            }
            else {
                message1.textContent = ''
                message2.textContent = 'The temperature in ' + data.location + ' is ' + 
                data.temperature + ' ' + data.unit + '!!'
            }
        })
    })
})