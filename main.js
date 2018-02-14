window.addEventListener('DOMContentLoaded', init);

function init() {
    let city = document.querySelector('.city');
    let img = document.querySelector('.weather-icon');
    let deg = document.querySelector('.temp');
    let card = document.querySelector('.card');
    let preloader = document.querySelector('preloader');
    let btn = document.querySelector('btn');
    
    const WEATHER_PATH = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'fc21ad824e2f1b103d15f80845f27f73';

    const getData = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                fetch(`${WEATHER_PATH}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`) 
                    .then(r => r.json())
                    .then(data => {
                        city.textContent = data.name;
                        img.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
                        deg.textContent = (data.main.temp - 272.15).toFixed(1);
                        card.style.display = 'block';
                        preloader.style.display = 'none';
                    })
            })
        } else {
            preloader.textContent = 'Пользователь не разрешает нам видеть позицию...';
        } 
    }
    getData();
    btn.addEventListener('click', () => {
        card.style.display = 'none';
        preloader.style.display = 'none';
    })
}