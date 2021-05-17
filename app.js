const searchbox = document.querySelector(' .inp');

const searchCity = document.querySelector(".city");
const searchDate = document.querySelector(".date");
const searchTemp = document.querySelector(".temp");
const searchWeather = document.querySelector(".weather");
const searchHiLow = document.querySelector(".hi-low");
const addCard = document.querySelector(".output");



// fetch('https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=e50b6e95c3b0bb998c4e6867e7c035fa')
//     .then(data => {
//         console.log(data);
//         return data.json();
//     })

searchbox.addEventListener('keypress', getQuery);

function getQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchbox.value + '&appid=e50b6e95c3b0bb998c4e6867e7c035fa')
        .then(weather => {
            return weather.json();
        }).then(dataDisplay);
}





function dataDisplay(response) {

    if (response.cod === "404") {
        searchCity.innerText = 'Invalid City';
        searchTemp.innerText = 'N/A';

        searchWeather.innerText = 'N/A';

        searchHiLow.innerText = 'N/A' + '/' + 'N/A';
    } else {
        addCard.classList.add('card');

        searchCity.innerText = response['name'] + ',' + response['sys']['country'];

        searchTemp.innerText = (response['main']['temp'] - 273.15).toFixed(1) + String.fromCharCode(176) + 'c';

        searchWeather.innerText = response.weather[0].main;

        searchHiLow.innerText = (response.main.temp_max - 273.15).toFixed(1) + String.fromCharCode(176) + 'c' + '/' + (response.main.temp_min - 273.15).toFixed(1) + String.fromCharCode(176) + 'c'
    }

}