const form = document.querySelector('.header__input-form');
const inputField = document.querySelector('.header__input');
const searchBtn = document.querySelector('.header__icon-container');
const location = document.querySelector('.main__location');
const temperature = document.querySelector('.main__temp');
const detail = document.querySelector('.main__description');
const feelsDisplay = document.querySelector('.main--feels');
const humidityDisplay = document.querySelector('.main--humidity');
const pressureDisplay = document.querySelector('.main--pressure');
const placeCode = document.querySelector('.main__code');
const degree = document.querySelector('.main__temp-deg');
const windSpeed = document.querySelector('.wind--speed');
const windDegree = document.querySelector('.wind--deg');
const latCoord = document.querySelector('.coordinates--lat');
const lonCoord = document.querySelector('.coordinates--lon');

let finalUrl;
let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
let destinationID;
let appId = 'a16a8ef1f58973f765eaeb26936caac3';

export const reqFunction = () => {
	searchBtn.addEventListener('click', event => {
		event.preventDefault();
		destinationID = inputField.value;
		finalUrl = `${url}${destinationID}&appid=${appId}`;
		fetchReq();
	});

	const fetchReq = async () => {
		let temp;
		try {
			const response = await fetch(finalUrl);

			if (response.ok) {
				let feelsLike;
				const jsonResponse = await response.json();

				location.innerText = inputField.value;
				location.style.transition = 'all .3s';
				temp = Math.floor(jsonResponse.main.temp - 273.15);

				temperature.innerText = `${temp}`;

				degree.innerHTML = 'o';

				detail.classList.add('main__description');
				detail.innerText = jsonResponse.weather[0].description;

				feelsLike = Math.floor(jsonResponse.main.feels_like - 273.15);

				feelsDisplay.innerText = feelsLike;
				humidityDisplay.innerText = jsonResponse.main.humidity + '%';
				pressureDisplay.innerText = jsonResponse.main.pressure + 'Pa';
				placeCode.innerText = jsonResponse.sys.country;

				windSpeed.innerText = jsonResponse.wind.speed + ' KT';
				windDegree.innerText = jsonResponse.wind.deg + ' deg';

				latCoord.innerText = jsonResponse.coord.lat + ' deg';
				lonCoord.innerText = jsonResponse.coord.lon + ' deg';
			}
		} catch (error) {
			alert(error, 'Please try again!');
		}
	};
};
