class RequestAPI {
  constructor(URL, ...parameters) {
    this.URL = URL;
    this.parameters = parameters;
  }

  async makeRequest() {
    let requestParameters = '';
    this.parameters.forEach((element, index) => {
      if (index > 0) {
        requestParameters += '&';
      }
      requestParameters += `${element.key}=${element.option}`;
    })
    const response = await fetch(`${this.URL}?${requestParameters}`); 
    return await response.json();
  }
}

class WeatherRequestAPI extends RequestAPI {
  constructor(URL, ...parameters) {
    super(URL, ...parameters);
  }

  async getWeather() {
    return super.makeRequest();
  }
}

class RequestParameter {
  constructor(key, option) {
    this.key = key;
    this.option = option;
  }
}

