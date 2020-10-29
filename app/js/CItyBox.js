class CityBox {
  constructor(className, weatherData, slider) {
    this.className = className;
    this.weatherData = weatherData.data;
    this.slider = slider;
    this.init();
  }

  init() {
    let globalWrapper = document.getElementsByClassName(this.className)[0];
    globalWrapper.lastElementChild.before(this.toNode());
    slider.add();
  }

  _createUpperButtons() {
    // addBlock() {
    //   event.preventDefault();
    //   let newCity = prompt('Укажите свой город', 'Киев')
    //   if (newCity) {
    //     new WeatherRequestAPI(urlAPI,
    //       new Parameter('key', 'f97db2cc7c1a4817b0e170433201109'),
    //       new Parameter('q', newCity), 
    //       new Parameter('format', 'json'),
    //       new Parameter('num_of_days', '5')
    //     ).getWeather().then(data => {
    //       new CityBox(this.selector, data, slider);
    //       this.slider.add();
    //     })
    //   }
    // }

    return new UpperButtons(
      new Button('today', [
        'btn',
        'draw-border'
      ]),
      new Button('tomorrow', [
        'btn',
        'draw-border'
      ]),
      new Button('3 days', [
        'btn',
        'draw-border'
      ]),
      new Button('week', [
        'btn',
        'draw-border'
      ]),
    );
  }

  _createMainInformation() {
    console.log(this.weatherData)
    return new MainInformation(`${this.weatherData.request[0].query}`,
    `${this.weatherData.current_condition[0].temp_C} °C`,
    `${this.weatherData.current_condition[0].weatherIconUrl[0].value}`);
  }

  _createWrapperParams() {
    let current_condition = this.weatherData.current_condition[0];
    let weather = this.weatherData.weather[0];
    return new WrapperParams([
      new Parameter('Feels like', current_condition.FeelsLikeC),
      new Parameter('Humidity', current_condition.humidity),
      new Parameter('Presure', current_condition.pressure),
      new Parameter('Wind speed', current_condition.windspeedKmph),
      new Parameter('Average temperature', weather.avgtempC),
      new Parameter('Min temperature', weather.mintempC),
      new Parameter('Moonset', weather.astronomy[0].moonset),
      new Parameter('Sunrise', weather.astronomy[0].sunrise),
      new Parameter('Max temperature', weather.maxtempC),
      new Parameter('Sunset', weather.astronomy[0].sunset),
    ]);
  }

  _createWrapperParamsArray(count) {
    let paramsWrappers = this.weatherData.weather.map((item, index, array) => {
      return new WrapperParams([
        new Parameter('Average temperature', item.avgtempC),
        new Parameter('Min temperature', item.mintempC),
        new Parameter('Moonset', item.astronomy[0].moonset),
        new Parameter('Sunrise', item.astronomy[0].sunrise),
        new Parameter('Max temperature', item.maxtempC),
        new Parameter('Sunset', item.astronomy[0].sunset),
      ]);
    });
    return paramsWrappers;
    // for (let i = 0; i < count; i++) {
    //   wrapperParams[i] 
    // }
  }

  _createCityManager() {
    let changeCity = new Button('Change City', [
      "btn",
      "draw-border"
    ]).toNode()
    changeCity.addEventListener('click', this.changeCity.bind(this));
    let deleteCity = new Button('Delete City', [
      "btn",
      "draw-border"
    ]).toNode()
    deleteCity.addEventListener('click', this.deleteCity.bind(this));
    let cityManager = document.createElement('div');
    cityManager.classList.add('upper-buttons')
    cityManager.append(changeCity, deleteCity);
    return cityManager;
  }

  changeCity() {
    event.preventDefault()
    let request = prompt('Укажите новый город', '')
    this.updateData(event.target.parentNode.parentNode, request);
  }

  deleteCity() {
    event.target.parentNode.parentNode.remove();
    this.slider.delete();
  }

  updateData(cityBox, request) {
    const urlAPI = 'http://api.worldweatheronline.com/premium/v1/weather.ashx';

    new WeatherRequestAPI(urlAPI,
      new Parameter('key', 'f97db2cc7c1a4817b0e170433201109'),
      new Parameter('q', `${request}`), 
      new Parameter('format', 'json'),
      new Parameter('num_of_days', '5')
    ).getWeather().then(data => {
      if (data) {
        this.weatherData = data.data;

        console.log(data.data)

        cityBox.lastElementChild.remove();
        cityBox.lastElementChild.remove();
    
        let mainInformation = this._createMainInformation().toNode();
        cityBox.appendChild(mainInformation);
    
        let wrapperParams = this._createWrapperParams().toNode();
        cityBox.appendChild(wrapperParams);
      }
    })
  }

  toNode() {
    let cityBox = document.createElement('div');
    cityBox.classList.add('slider__item');
    cityBox.classList.add('city-box');
    
    let upperButtons = this._createUpperButtons().toNode();
    cityBox.appendChild(upperButtons);
    
    let cityManager = this._createCityManager();
    cityBox.appendChild(cityManager);
    
    let mainInformation = this._createMainInformation().toNode();
    cityBox.appendChild(mainInformation);
    
    let wrapperBox = document.createElement('div');
    wrapperBox.classList.add('wrapper-box');
    let wrapperParamsArray = this._createWrapperParamsArray();
    for (let i = 0; i < wrapperParamsArray.length; i++) {
      wrapperBox.appendChild(wrapperParamsArray[i].toNode());
    }
    cityBox.appendChild(wrapperBox);
    
    return cityBox;
  }
}