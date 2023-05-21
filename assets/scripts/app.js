// ░░░░░██████╗░░█████╗░████████╗░█████╗░░░░░░
// ░░░░░██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗░░░░░
// ░░░░░██║░░██║███████║░░░██║░░░███████║░░░░░
// ░░░░░██║░░██║██╔══██║░░░██║░░░██╔══██║░░░░░
// ░░░░░██████╔╝██║░░██║░░░██║░░░██║░░██║░░░░░
// ░░░░░╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░░░░░

const fetchData = (url, callback) => {
	fetch(url)
	.then(data => data.json())
	.then(data => callback(data))
}

const APPID = 'b22848f6620eb7fd7d1eea81b723536e';

const urls = {
	geo(query) {
		return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&lang=ru&appid=${APPID}`;
	},
	currentWeather(lat, lon) {
		return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${APPID}`;
	},
	forecast(lat, lon) {
		return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${APPID}`;
	}
}

// ░░░░░██████╗░░█████╗░██╗░░░██╗████████╗███████╗░██████╗░░░░░
// ░░░░░██╔══██╗██╔══██╗██║░░░██║╚══██╔══╝██╔════╝██╔════╝░░░░░
// ░░░░░██████╔╝██║░░██║██║░░░██║░░░██║░░░█████╗░░╚█████╗░░░░░░
// ░░░░░██╔══██╗██║░░██║██║░░░██║░░░██║░░░██╔══╝░░░╚═══██╗░░░░░
// ░░░░░██║░░██║╚█████╔╝╚██████╔╝░░░██║░░░███████╗██████╔╝░░░░░
// ░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░░░░╚═╝░░░╚══════╝╚═════╝░░░░░░
// Получение текущего местоположение
var currentPosCords = [];
navigator.geolocation.getCurrentPosition(position => {
		//current lat lon
		// В случае принятие получаем местоположение
		currentPos(position.coords.latitude, position.coords.longitude);
	}, error => {
		//lat lon moscow
		// В случае отказа отправляем lat lon москвы
		currentPos(55.75222, 37.61556);
	}
);
const currentPos = (lat, lon) => {
	window.location.hash = `/current-location`;
	return currentPosCords.push(lat.toFixed(5), lon.toFixed(5));
}

// Кнопка текущего местоположения
const btnCurrentLocation = document.querySelector('.btn-currLocate');
btnCurrentLocation.addEventListener('click', e => {
	window.location.hash = '/current-location';
})

window.addEventListener('hashchange', async e => {

	const currentUrl =  e.newURL.split('#')[1];

	if (currentUrl === '/current-location') {
		return window.location.hash = `geo?lat=${currentPosCords[0]}&lon=${currentPosCords[1]}`;
	};
	// Получаем префикс
	const mode = currentUrl.split('?')[0];
	// params lat=55.55555 and lon=55.55555
	// получаем lat и lon из hash
	const params = currentUrl.split('?')[1].split('&');
	// params lat > 55.55555 and lon > 55.55555
	updateWeather(params[0].split('=')[1], params[1].split('=')[1]);
	
})

// ░░░░░░█████╗░██████╗░██████╗░░░░░░
// ░░░░░██╔══██╗██╔══██╗██╔══██╗░░░░░
// ░░░░░███████║██████╔╝██████╔╝░░░░░
// ░░░░░██╔══██║██╔═══╝░██╔═══╝░░░░░░
// ░░░░░██║░░██║██║░░░░░██║░░░░░░░░░░
// ░░░░░╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░░░░░░░░

// import { urls, fetchData } from './data.js';
const btn = document.querySelector('.btn-openSearch');
const back = document.querySelector('.search_arrow');
btn.addEventListener('click', e => {search.classList.add('active')});
back.addEventListener('click', e => {search.classList.remove('active')});

//░█▀▀▄ █▀▀█ ▀▀█▀▀ █▀▀ 
//░█─░█ █▄▄█ ──█── █▀▀ 
//░█▄▄▀ ▀──▀ ──▀── ▀▀▀

const arrayMonthName = [
	'Янв',
	'Фев',
	'Март',
	'Апр',
	'Май',
	'Июн',
	'Июл',
	'Авг',
	'Сен',
	'Окт',
	'Ноя',
	'Дек',
]
const arrayDaysName = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
]

const getDateCustom = (unixDate, timezone) => {
	const date = new Date((unixDate + timezone) * 1000);
	let nameDays = arrayDaysName[date.getUTCDay()];
	let nameMonth = arrayMonthName[date.getUTCMonth()];
	return {
		fullDateName: `${nameDays} ${date.getUTCDate()} ${nameMonth} ${date.getFullYear()}`,
		DaysNumber: String(date.getDate()),
		fullTime: `${String(date.getHours()).length < 2 ? '0' : ''}${date.getHours()}:${String(date.getUTCMinutes()).length < 2 ? '0' : ''}${date.getUTCMinutes()}`,
		DaysName: date.getUTCDay()
	}
}

//	█▀▀ █▀▀ █▀▀█ █▀▀█ █▀▀ █──█ 
//	▀▀█ █▀▀ █▄▄█ █▄▄▀ █── █▀▀█ 
//	▀▀▀ ▀▀▀ ▀──▀ ▀─▀▀ ▀▀▀ ▀──▀

const search = document.querySelector('.search-container');
const input = document.querySelector('[js-search-input-container] input');
const load = document.querySelector('.search-input-cont');
const searchResult = document.querySelector('[js-search-container]');

input.addEventListener('focus', e => {
	search.classList.add('active');
	input.addEventListener('keyup', e => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			if (input.value) {
				fetchData(urls.geo(input.value), (data) => {
					// updateWeather(data[0].lat, data[0].lon);
					window.location.hash = `geo?lat=${data[0].lat}&lon=${data[0].lon}`;
					search.classList.remove('active');
				})
			}
		}
	})
})
input.addEventListener('blur', e => {
	if (window.screen.width >= 850) search.classList.remove('active');
})

const searchCity = (city) => {
	fetchData(urls.geo(city), (data) => {
		data.map(({country, name, local_names, state, lat, lon}) => {
			const listItem = document.createElement('li');
		
			listItem.classList.add('result-list-item');
			listItem.setAttribute('lat', lat);
			listItem.setAttribute('lon', lon);
			
			const namesRu = null;
			try {
				namesRu = local_names.ru;
			} catch (e) { }
			
			listItem.innerHTML = `
			<span class="m-icon">location_on</span>
			<div class="list-item-info">
				<p class="item-title">${namesRu ? namesRu : name}</p>
				<p class="item-subtitle">${state || name}, ${country}</p>
			</div>
			`;
			listItem.addEventListener('click', e => {
				window.location.hash = `geo?lat=${lat.toFixed(5)}&lon=${lon.toFixed(5)}`;
				search.classList.remove('active');
				
			})
			listItem.addEventListener('mousedown', e => {
				e.preventDefault();
			})
			searchResult.appendChild(listItem);
			load.classList.remove('loading');
		})
	});	
}

let searchTimeOutSet = false;
const searchTimeOutDuration = 500;
input.addEventListener('input', e => {
	 
	if (!input.value) {
		searchResult.innerHTML = '';
		load.classList.remove('loading');
		if (window.screen.width >= 850) search.classList.remove('active');
		return;
	} else {
		search.classList.add('active');
	}
	if (searchTimeOutSet) return;
	load.classList.add('loading');
	searchTimeOutSet = true;
	load.classList.add('loading');
	setTimeout(() => {
		searchTimeOutSet = false;
		searchResult.innerHTML = ``;
		input.value ? searchCity(input.value) : null;
	}, searchTimeOutDuration);
})


const updateWeather = (lat, lon) => {

	/* Current Weather */

	const currentWeather = document.querySelector('[js-currentWeather-box]');
	const horlyForecast = document.querySelector('[js-horlyForecast-box]');
	const weatherInfo = document.querySelector('[js-weatherInfo-box]');
	const daysForecast = document.querySelector('[js-daysForecast-box]');
	currentWeather.innerHTML = ``;
	horlyForecast.innerHTML = ``;
	weatherInfo.innerHTML = ``;
	daysForecast.innerHTML = ``;

	fetchData(urls.currentWeather(lat, lon), (data) => {
		const date = getDateCustom(data.dt, data.timezone);
		let SunTime = data.weather[0].icon.split('');

		const currentWeatherBox = document.createElement('div');
		currentWeatherBox.classList = 'current-weather weather-box card-item';
		currentWeatherBox.innerHTML = `
			<span class="weather-box-title">Сейчас</span>
			<div class="details-one">
				<h1 class="degrees">${Math.floor(data.main.temp)}&deg;c</h1>
				<img src="https://openweathermap.org/img/wn/01${SunTime[2] ? 'n' : 'd'}@4x.png" alt="">
			</div>
			<div class="details-two">
				<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
				<span class="weather-description">${data.weather[0].description}</span>
			</div>
			<div class="details-three">
				<div>
					<span class="m-icon">location_on</span>
					<p class="current-city">${data.name}, ${data.sys.country}</p>
				</div>
				<div>
					<span class="m-icon">calendar_month</span>
					<p class="current-date">${date.fullDateName}</p>
				</div>
			</div>
		`
		currentWeather.appendChild(currentWeatherBox);

		/* Today Weather */

		const sunRiseDate = getDateCustom(data.sys.sunrise, data.timezone); // 2
		const sunSetDate = getDateCustom(data.sys.sunset, data.timezone);

		const todayInfoBox = document.createElement('div');
		todayInfoBox.classList = 'today-weather weather-box card-item';
		todayInfoBox.innerHTML = `
			<span class="weather-box-title">Полезная информация</span>
			<div class="today-weather__one-container">
				<div class="today-weather__wind today-weather__box weather__bg-block">
					<span class="today-weather__box-title">Ветер</span>
					<div class="wind_container">
						<span class="m-icon wind-icon">air</span>
						<div class="wind_details">
							<div class="wind-status">
								<h3>Скорость</h3>
								<p class="wind-status__speed-value">${Math.floor(data.wind.speed)}км/ч</p>
							</div>
							<div class="wind-status">
								<h3>Направление</h3>
								<div>
									<span class="m-icon" style="transform: rotate(${data.wind.deg}deg);">navigation</span>
									<p class="wind-status__direction-value">${data.wind.deg}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="today-weather__sunrise today-weather__box weather__bg-block">
					<span class="today-weather__box-title">Восход и закат солнца</span>
					<div class="today-weather__sunrise-container">
						<div class="sunrise sunriset">
							<span class="m-icon" style="color: orange;">light_mode</span>
							<div class="details">
								<h3>Восход</h3>
								<p>${sunRiseDate.fullTime}</p>
							</div>
						</div>
						<div class="sunset sunriset">
							<span class="m-icon" style="color: grey;">dark_mode</span>
							<div class="details">
								<h3>Закат</h3>
								<p>${sunSetDate.fullTime}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="today-weather__two-container">
				<div class="today-weather__miniblock weather__bg-block">
					<span class="today-weather__box-title">Влажность</span>
					<div class="miniblock-container">
						<span class="m-icon humidity-title">humidity_percentage</span>
						<p class="miniblock-value">${data.main.humidity}%</p>
					</div>
				</div>
				<div class="today-weather__miniblock weather__bg-block">
					<span class="today-weather__box-title">Ощущение</span>
					<div class="miniblock-container">
						<span class="m-icon temperature-title">thermostat</span>
						<p class="miniblock-value">${Math.floor(data.main.feels_like)}&deg;c</p>
					</div>
				</div>
				<div class="today-weather__miniblock weather__bg-block">
					<span class="today-weather__box-title">Давление</span>
					<div class="miniblock-container">
						<span class="m-icon pressure-title">waves</span>
						<p class="miniblock-value">${Math.floor(data.main.pressure)}hPa</p>
					</div>
				</div>
				<div class="today-weather__miniblock weather__bg-block">
					<span class="today-weather__box-title">Видимость</span>
					<div class="miniblock-container">
						<span class="m-icon visibility-title">visibility</span>
						<p class="miniblock-value">${Math.floor(data.visibility) / 1000}км</p>
					</div>
				</div>
			</div>
		`
		weatherInfo.appendChild(todayInfoBox);
	});
	fetchData(urls.forecast(lat, lon), (data) => {

		const date = new Date();
		let forecastHours = [];
		for (let i = 0; i < 7; i++) {
			forecastHours.push(data.list[i]);
		}
		forecastHours.map((item) => {
			let forecastDate = item.dt_txt.split(' ')[1].split('');
			forecastDate.length = 5;
			forecastDate = forecastDate.join('');
			const hourlyForecastItem = document.createElement('div');
			hourlyForecastItem.classList.add('forecast-today__item');
			hourlyForecastItem.innerHTML = `
				<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="">
				<span class="forecast-today__time">${forecastDate}</span>
				<span class="forecast-today__degress">${Math.floor(item.main.temp)}&deg;c</span>
			`
			horlyForecast.appendChild(hourlyForecastItem);
		})
		let forecastDays = [];
		for (let i = 0; i < data.list.length; i++) {
			const forecastDate = data.list[i].dt_txt.split(' ');
			
			if (forecastDate[1] === '00:00:00') {
				forecastDays.push(data.list[i]);
			}
		}
		forecastDays.map((item) => {
			const forecastDaysDateOne = item.dt_txt.split(' ')[0].split('-');
			forecastDaysDateOne.shift();
			const forecastDaysName = getDateCustom(item.dt, data.city.timezone);// 3
			const forecastDaysItem = document.createElement('div');
			forecastDaysItem.classList.add('days-forecast-item');
			forecastDaysItem.innerHTML = `
				<h1 class="time">${forecastDaysDateOne.reverse().join('.')}</h1>
				<p class="weekday">${arrayDaysName[forecastDaysName.DaysName]}</p>
				<div class="days-forecast-item-details">
					<h1>${Math.floor(item.main.temp)}&deg;c</h1>
					<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="">
				</div>
				<p>${item.weather[0].description}</p>
			`
			daysForecast.appendChild(forecastDaysItem);
		})
	});
}