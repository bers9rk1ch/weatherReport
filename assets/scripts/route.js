
const btn = document.querySelector('.btn-openSearch');
const back = document.querySelector('.search_arrow');
const search = document.querySelector('.search-container');
const input = document.querySelector('.search-input-cont input');
const load = document.querySelector('.search-input-cont');

navigator.geolocation.getCurrentPosition(position => currentPos(position.coords));

const currentPos = (position) => {
	
	console.log(position)
}

console.log(geo('London'));

input.addEventListener('input', e => {

	load.classList.add('loading');

	setTimeout(() => {
		load.classList.remove('loading');
		console.log(geo(input.value))
	}, 1500);
	
})

input.addEventListener('focus', e => {

	search.classList.toggle('active');

})

btn.addEventListener('click', e => {search.classList.add('active')});
back.addEventListener('click', e => {search.classList.remove('active')});
// 