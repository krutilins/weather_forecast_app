class RequestAPI {
    constructor(URL) {
      this.URL = 'https://5f5f9ecadf620f00163e6011.mockapi.io/weather/users';
    }
  
    async makeRequest() {
      const response = await fetch(`${this.URL}`);
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