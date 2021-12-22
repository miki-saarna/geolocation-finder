const findState = () => {
    // the element where location will be posted
    const status = document.querySelector('.status');

    // uses gives permission
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        async function findLocation(url) {
            try {
                const locationFetch = await fetch(url)
                // const data = await Promise.resolve(locationFetch.json())
                return locationFetch.json()
                    .then(data => {
                        console.log(data)
                        status.textContent = data.postcode
                    })
                // console.log(data)
                // status.textContent = data.postcode;
                
            } catch (error) {
                throw 'There was an issuing retrieveing your location...';
            }
            
        }
        findLocation(geoApiUrl)
        
        // fetch(geoApiUrl)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         status.textContent = data.city;
        //     })
    }

    // uses denies permission
    const error = () => {
        status.textContent = 'Unable to retrieve your location...';
    }

    // built-in API that comes with the browser
    navigator.geolocation.getCurrentPosition(success, error);
    // 'success' variable if user gives permission to find location, otherwise 'error' variable
}

// event listener that triggers location retrieval with findState function
document.querySelector('.find-state').addEventListener('click', findState)