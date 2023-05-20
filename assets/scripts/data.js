export const fetchData = (url, callback) => {
	fetch(url)
	.then(data => data.json())
	.then(data => callback(data))
}

const APPID = 'b22848f6620eb7fd7d1eea81b723536e';

export const urls = {
	geo(query) {
		return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&lang=ru&appid=${APPID}`;
	},
	currentWeather(lat, lon) {
		return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}lon=${lon}&&units=metric&lang=ru&appid=${APPID}`;
	},
	forecast(lat, lon) {
		return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${APPID}`;
	}
}