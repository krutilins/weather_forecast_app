new MobileMenu();

const urlAPI = 'http://api.worldweatheronline.com/premium/v1/weather.ashx';

let slider = new WeatherSlider('.slider');
new WeatherRequestAPI(urlAPI,
  new Parameter('key', '78c391c64d3142999df194752201009'),
  new Parameter('q', 'kiev'), 
  new Parameter('format', 'json'),
  new Parameter('num_of_days', '1')
  ).getWeather().then(data => {
    new CityBox('slider__wrapper', data, slider);
    new AddCity('slider__wrapper', slider);
})