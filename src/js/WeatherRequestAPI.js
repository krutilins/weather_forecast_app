class WeatherRequestAPI extends RequestAPI {
  constructor(URL, ...parameters) {
    super(URL, ...parameters);
  }

  async getWeather() {
    return super.makeRequest();
  }
}