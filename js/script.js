const apiKey = 'd167c68a5b7f42baa4b85238231901';

const searchField = document.querySelector('.search');
const searchButton = document.querySelector('.search-button');
const searchForm = document.querySelector('.search-block__bar');

const humidity = document.querySelector('.details-block__value-humidity');
const uv = document.querySelector('.details-block__value-uv');
const sunset = document.querySelector('.details-block__value-sunset');
const sunrise = document.querySelector('.details-block__value-sunrise');


const currentWeather = document.querySelector('.current-weather-block__temperature');
const currentLocation = document.querySelector('.current-weather-block__city');
const currentTime = document.querySelector('.current-weather-block__time');
const currentDay = document.querySelector('.current-weather-block__day');

const forecastBlock = document.querySelector('.swiper-wrapper');
const slider = new Swiper('.forecast-block', {

    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,

        },
        // when window width is >= 480px
        576: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 640px
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
})



searchForm.addEventListener('submit', (e) => {

    if (searchField.value.length == 0) {
        alert('Please write city name!')
    } else {
        cityName = searchField.value;

        getWeatherdata();

        searchField.value = ''
        e.preventDefault();
    }

})

function getWeatherdata() {

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`)

    .then(response => response.json())
        .then(data => {
            console.log(data);
            humidity.innerHTML = data.current.humidity;
            uv.innerHTML = data.current.uv;
            sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
            sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;
            currentWeather.innerHTML = `${ data.current.temp_c +'°C'}`;
            currentLocation.innerHTML = data.location.name + ', ' + data.location.country + ', ' + data.location.tz_id;
            currentTime.innerHTML = getCurrentTime()
            currentDay.innerHTML = `${getdayOfWeek(countData(data.current.last_updated))  +', '+ countData(data.current.last_updated)[2] +' '+ getCurrentMonth(countData(data.current.last_updated))}`
            removeAllChildNodes(forecastBlock)
            for (i = 0; i < data.forecast.forecastday.length; i++) {
                forecastBlock.insertAdjacentHTML('beforeend',
                    ` <div class=" forecast-block__element swiper-slide ">
                    <div class="forecast-block__day">${ getdayOfWeek(countData(data.forecast.forecastday[i].date))}</div>
                    <div class="forecast-block__date"> ${countData(data.forecast.forecastday[i].date)[2] +' '+ getCurrentMonth(countData(data.forecast.forecastday[i].date))}</div>
                    <div class="forecast-block__icon "><img class='icon_img' src = '/weatherWebSite/images/day/${(data.forecast.forecastday[i].day.condition.icon).slice(-7)}'></div>
                    <div class="forecast-block__degree">${Math.floor(data.forecast.forecastday[i].day.avgtemp_c)+'°'}</div>
                </div>`)
            }
        });
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function countData(date) {
    let dateArr;

    const y = parseInt(date.substring(0, 4));
    const m = parseInt(date.substring(5, 7));
    const d = parseInt(date.substring(8, 11));
    const time = (date.substring(11));
    dateArr = [y, m, d, time]
    return dateArr
}

function getdayOfWeek(date) {
    const days = [
        'Sunday',
        'Monday',
        'Tuersday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return days[(new Date(`${date[0]}-${date[1]}-${date[2]}`).getDay())]
}

function getCurrentMonth(date) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'June',
        'July',
        'August',
        'September',
        'Oktober',
        'November',
        'December'
    ];
    return months[(new Date(`${date[0]}-${date[1]}-${date[2]}`).getMonth())]
}

function getCurrentTime() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    return time
}
