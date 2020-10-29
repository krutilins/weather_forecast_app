class UpperButtons {
  constructor(...buttons) {
    this.buttons = buttons;
  }

  toNode() {
    let upperButtons = document.createElement('div');
    upperButtons.classList.add('upper-buttons');
    for (let button of this.buttons) {
      upperButtons.appendChild(button.toNode());
    }
    return upperButtons;
  }
}