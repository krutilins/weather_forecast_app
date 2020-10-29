class AddCity {
  constructor(selector, slider) {
    this.selector = selector;
    this.slider = slider;
    this.button = document.getElementsByClassName('add-city')[0];
    this.init()
  }

  init() {
    this.button.addEventListener('click', this.addBlock.bind(this));
  }

  addBlock() {
    event.preventDefault();
    let newCity = prompt('Укажите свой город', 'Киев')
    if (newCity) {
      new WeatherRequestAPI(urlAPI,
        new Parameter('key', 'f97db2cc7c1a4817b0e170433201109'),
        new Parameter('q', newCity), 
        new Parameter('format', 'json'),
        new Parameter('num_of_days', '5')
      ).getWeather().then(data => {
        new CityBox(this.selector, data, slider);
        this.slider.add();
      })
    }
  }
}
