class WrapperParams {
  constructor(paramValue = [[{key: '', value: ''}]]) {
    this.paramValue = paramValue;
  }

  toNode() {
    let wrapperParams = document.createElement('div');
    wrapperParams.classList.add('wrapper-params')

    let paramBlock = document.createElement('div');
    paramBlock.classList.add('wrapper-params-names');
    
    let valueBlock = document.createElement('div');
    valueBlock.classList.add('wrapper-param-values');

    let valueWrapper = document.createElement('div');
    valueWrapper.classList.add('value-wrapper');
    for (let element of this.paramValue) {
      let param = document.createElement('div');
      param.classList.add('param-name');
      param.classList.add('right');
      param.innerText = element.key;
      paramBlock.appendChild(param);

      let value = document.createElement('div');
      value.classList.add('param-value');
      value.classList.add('left');
      value.innerText = element.value;
      valueWrapper.appendChild(value);
    }
    valueBlock.appendChild(valueWrapper);
    wrapperParams.appendChild(paramBlock);
    wrapperParams.appendChild(valueBlock);
    

    return wrapperParams;
  }
}