class MainInformation {
  constructor(city, temp, icon) {
    this.city = city;
    this.temp = temp;
    this.icon = icon;
  }

  _createCityNameBlock() {
    let cityName = document.createElement('div');
    cityName.classList.add('city-name');
    cityName.innerText = this.city;
    
    return cityName;
  }

  _createTemperatureBlock() {
    let temperature = document.createElement('div');
    temperature.classList.add('temp');
    temperature.innerText = this.temp;
    
    return temperature;
  }

  _createWeatherIconBlock() {
    let weatherIcon = document.createElement('div');
    weatherIcon.classList.add('weather-icon');

    let icon = document.createElement('img');
    icon.src = `${this.icon}`
    icon.alt = 'weather_icon';
    icon.style.height = '70px';
    icon.style.width = '70px';
    
    weatherIcon.appendChild(icon);
    
    return weatherIcon;
  }

  toNode() {
    let wrapperCityIcon = document.createElement('div');
    wrapperCityIcon.classList.add('wrapper-city-icon');
    
    wrapperCityIcon.appendChild(this._createCityNameBlock());

    wrapperCityIcon.appendChild(this._createTemperatureBlock());

    wrapperCityIcon.appendChild(this._createWeatherIconBlock());
    
    return wrapperCityIcon;
  }
}