const findState = () => {
    // the element where location will be posted
    const zip = document.querySelector('.zip');
    const temp = document.querySelector('.temp');
    const description = document.querySelector('.description');
    const apparel = document.querySelector('.apparel');

    // uses gives permission
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const apiKey = '240d7dac5ea5a90a09b6d0430efaec59';
        // how do I hide the API key?
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

        async function findLocation(url) {
            try {
                const locationFetch = await fetch(url)
                // const data = await Promise.resolve(locationFetch.json())
                return locationFetch.json()
                    .then(data => {
                        console.log(data)
                        zip.textContent = data.postcode
                    })
                
            } catch (error) {
                throw 'There was an issuing retrieveing your location...';
            }
            
        }
        findLocation(geoApiUrl)

        async function findWeather(url) {
            try {
                const weatherFetch = await fetch(url)
                return weatherFetch.json()
                    .then(data => {
                        console.log(data)
                        console.log(data.weather[0].id)
                        // converts from Kelvin to Fahrenheit
                        const tempInFahrenheit = (data.main.temp - 273.15) * 9 / 5 + 32;
                        temp.textContent = `${tempInFahrenheit.toFixed(1)}°F`
                        description.textContent = data.weather.description;
                        const weatherCode = data.weather[0].id;

                        if (weatherCode >= 700 && weatherCode < 800) {
                            apparel.textContent = 'Maybe it would be better to stay inside today.'
                        } else if (weatherCode >= 600 && weatherCode < 700) {
                            apparel.textContent = 'Grab a winter jacket.'
                        } else if (weatherCode < 600 && tempInFahrenheit >= 70) {
                            apparel.textContent = 'A thin rain jacket will do.'
                        } else if (weatherCode < 600 && tempInFahrenheit >= 50) {
                            apparel.textContent = 'Try a light sweater with a rain jacket on top.'
                        } else if (weatherCode < 600 && tempInFahrenheit < 50) {
                            apparel.textContent = 'You got a thick rain jacket? Might need it.'
                        } else if (tempInFahrenheit > 85) {
                            apparel.textContent = 'It\'s tank top weather!'
                        } else if (tempInFahrenheit > 65) {
                            apparel.textContent = 'Try comfortable in your favorite shirt.'
                        } else if (tempInFahrenheit > 45) {
                            apparel.textContent = 'It\'s a bit chilly today. Might want to grab a sweater or jacket.'
                        }  else if (tempInFahrenheit > 32) {
                            apparel.textContent = 'Grab a warm jacket.'
                        } else {
                            apparel.textContent = 'Where\'s my down-jacket?!'
                        }
                    })
            } catch (error) {
                throw 'error found...';
            }
        }
        findWeather(weatherUrl)
        
        // fetch(geoApiUrl)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         zip.textContent = data.city;
        //     })
    }

    // uses denies permission
    const error = () => {
        zip.textContent = 'Unable to retrieve your location...';
    }

    // built-in API that comes with the browser
    navigator.geolocation.getCurrentPosition(success, error);
    // 'success' variable if user gives permission to find location, otherwise 'error' variable
}

// event listener that triggers location retrieval with findState function
document.querySelector('.find-state').addEventListener('click', findState)