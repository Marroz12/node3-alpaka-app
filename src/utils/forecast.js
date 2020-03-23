const request = require('request')
const com = (temp, rain) => {
    if (temp>5) {
        return 'W sam raz na spacerek!'
    } else if (rain>0.7){
        return 'Musimy sobie odpuścić spacerek.'
    } else {
        return 'Musimy sobie odpuścić spacerek.'
    }
}



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bde2ac5e9bd85b56135b80ae9c471b29/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=pl'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to make the connection', undefined)
        } else if (body.error) {
            callback('Unable to find connection', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 
                ' Aktualnie jest ' + body.currently.temperature + "°C" + 
                ' oraz ' + body.currently.precipProbability*100 + '% szans na deszcz.',
                com(body.currently.temperature, body.currently.precipProbability, (comment) => {
                    comment
                })
            )
        }
    })
}

module.exports = forecast