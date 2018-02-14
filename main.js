

window.addEventListener('DOMContentLoaded', init);

function init() {

    let city = document.querySelector('.city');
    let img = document.querySelector('.weather-icon');
    let deg = document.querySelector('.temp');
    let card = document.querySelector('.card');
    let preloader = document.querySelector('.preloader');
    let btn = document.querySelector('.upd');

    const WEATHER_PATH = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '22603d94d2580dd4da189c31ff13a4a6';

    const getData = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                fetch(`${WEATHER_PATH}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
                    .then(r => r.json())
                    .then(data => {
                        
                        city.textContent = data.name;
                        img.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
                        deg.textContent = (data.main.temp - 272.15).toFixed(1);
                        card.style.display = 'block';
                        preloader.style.display = 'none';
                    })
            
            }, () => {
                preloader.textContent = 'Нет доступа!';
            })
        } else {
            preloader.textContent = 'У пользователя старый браузер!!!';
        }
    }
    getData();

    btn.addEventListener('click', () => {
        card.style.display = 'none';
        preloader.style.display = 'block';
        getData();
    });

}