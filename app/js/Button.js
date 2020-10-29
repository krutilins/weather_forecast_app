class Button {
  constructor(value, options = {}) {
    this.value = value;
    this.options = options;
  }

  toNode() {
    let button = document.createElement('div');
    button.innerText = this.value;
    for (let option of this.options) {
      button.classList.add(option)
    }
    return button;
  }
}