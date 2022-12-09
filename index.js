const key = "&appid=77563d0b85ff6645fb4a1ff6cd388c22";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";

const getDayIcon = () => {
	let time = new Date().getHours();
	let mainCard = document.getElementById("mainCard");

	switch (true) {
		case time >= 5 && time < 12:
			mainCard.style.backgroundImage = "url('images/morning.jpg')";
			break;
		case time >= 12 && time < 17:
			mainCard.style.backgroundImage = "url('images/morning.jpg')";
			break;
		case time >= 17 && time < 22:
			mainCard.style.backgroundImage = "url('images/morning.jpg')";
			break;
		case time >= 22 && time < 5:
			mainCard.style.backgroundImage = "url('images/morning.jpg')";
			break;
	}
};

const spitOutCelcius = (kelvin) => {
	return Math.round(kelvin - 273.15);
};

const spitOutGPaskal = (mmHg) => {
	return Math.round(mmHg / 1.333);
};

const getWetherForecast = () => {
	const city = document.getElementById("input").value;
	const mainCard = document.getElementById("mainCard");
	const mainBody = document.getElementById("mainBody");

	mainCard.replaceChildren();
	mainBody.replaceChildren();

	if (document.getElementById("input").value == "") {
		mainCard.insertAdjacentHTML("afterbegin", `<div class="forecast__card--inner"><p class="forecast__temp">You didn't fill in the field</p></div>`);
	} else {
		fetch(baseURL + city + key)
			.then((response) => response.json())
			.then((weather) => {
				mainCard.insertAdjacentHTML(
					"afterbegin",
					`<div class="forecast__card--inner"><p class="forecast__name">${weather.name}</p><p class="forecast__temp">${spitOutCelcius(
						weather.main.temp
					)} °C</p></div>`
				);

				mainBody.insertAdjacentHTML(
					"beforeend",
					`<div class="forecast__row">
						<p>min: ${spitOutCelcius(weather.main.temp_max)} °C</p><p>max: ${spitOutCelcius(weather.main.temp_min)} °C</p></div>`
				);

				mainBody.insertAdjacentHTML(
					"beforeend",
					`<div class="forecast__row">
						<p>${weather.weather[0].description}</p><img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt=""></div>`
				);

				mainBody.insertAdjacentHTML(
					"beforeend",
					`<div class="forecast__row">
						<p>pressure</p><p>${spitOutGPaskal(weather.main.pressure)} mm Hg</p></div>`
				);

				mainBody.insertAdjacentHTML(
					"beforeend",
					`<div class="forecast__row">
						<p>humidity</p><p>${weather.main.humidity} %</p></div>`
				);
			})
			.catch((error) =>
				mainCard.insertAdjacentHTML("afterbegin", `<div class="forecast__card--inner"><p class="forecast__temp">Nothing found</p></div>`)
			);
	}
};

document.addEventListener("DOMContentLoaded", () => {
	getDayIcon();
});

getWeather.addEventListener("click", (event) => {
	event.preventDefault();
	s;
	getWetherForecast();
});
