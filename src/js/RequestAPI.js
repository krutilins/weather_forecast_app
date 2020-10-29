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
      requestParameters += `${element.key}=${element.value}`;
    })
    const response = await fetch(`${this.URL}?${requestParameters}`); 
    return await response.json();
  }
}