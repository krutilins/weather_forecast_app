class WeatherSlider {
  constructor(selector) {
    this.selector = selector;
    this.multiItemSlider() 
  }

  // инициализация
  _setUpListeners() {
    // добавление к кнопкам "назад" и "вперед" обработчика _controlClick для события click
    this._sliderControls.forEach((item) => {
      item.addEventListener('click', this._controlClick.bind(this));
    });
  }

  // обработчик события click для кнопок "назад" и "вперед"
  _controlClick(e) {
    if (e.target.classList.contains('slider__control')) {
      e.preventDefault();
      let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
      this._transformItem(direction);
    }
  }

  _transformItem(direction) {
    if (direction === 'right') {
      if ((this._positionLeftItem + this._wrapperWidth / this._itemWidth - 1) >= this.position.getMax) {
        return;
      }
      if (!this._sliderControlLeft.classList.contains('slider__control_show')) {
        this._sliderControlLeft.classList.add('slider__control_show');
      }
      if (this._sliderControlRight.classList.contains('slider__control_show') && (this._positionLeftItem + this._wrapperWidth / this._itemWidth) >= this.position.getMax) {
        this._sliderControlRight.classList.remove('slider__control_show');
      }
      this._positionLeftItem++;
      this._transform -= this._step;
    }
    if (direction === 'left') {
      if (this._positionLeftItem <= this.position.getMin) {
        return;
      }
      if (!this._sliderControlRight.classList.contains('slider__control_show')) {
        this._sliderControlRight.classList.add('slider__control_show');
      }
      if (this._sliderControlLeft.classList.contains('slider__control_show') && this._positionLeftItem - 1 <= this.position.getMin) {
        this._sliderControlLeft.classList.remove('slider__control_show');
      }
      this._positionLeftItem--;
      this._transform += this._step;
    }
    this._sliderWrapper.style.transform = 'translateX(' + this._transform + '%)';
  }

  add() {
    this.update();
    this._sliderControlRight.classList.add('slider__control_show');
  }

  delete() {
    console.log('asdf')
    this.update();
    this._sliderControlRight.classList.remove('slider__control_show');
  }

  update() {
    this._sliderItems = this._mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
    this._sliderControls = this._mainElement.querySelectorAll('.slider__control'), // элементы управления
    this._wrapperWidth = parseFloat(getComputedStyle(this._sliderWrapper).width), // ширина обёртки
    this._itemWidth = parseFloat(getComputedStyle(this._sliderItems[0]).width), // ширина одного элемента    
    this._step = this._itemWidth / this._wrapperWidth * 100, // величина шага (для трансформации)

    this._items = []
    this._sliderItems.forEach((item, index) => {
      this._items.push({ item: item, position: index, transform: 0 });
    });

    this.position.getMax = this._items.length - 1;
  }

  multiItemSlider() {
    this._mainElement = document.querySelector(this.selector), // основный элемент блока
    this._sliderWrapper = this._mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
    this._sliderItems = this._mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
    this._sliderControls = this._mainElement.querySelectorAll('.slider__control'), // элементы управления
    this._sliderControlLeft = this._mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
    this._sliderControlRight = this._mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
    this._wrapperWidth = parseFloat(getComputedStyle(this._sliderWrapper).width), // ширина обёртки
    this._itemWidth = parseFloat(getComputedStyle(this._sliderItems[0]).width), // ширина одного элемента    
    this._positionLeftItem = 0, // позиция левого активного элемента
    this._transform = 0, // значение трансформации .slider_wrapper
    this._step = this._itemWidth / this._wrapperWidth * 100, // величина шага (для трансформации)
    this._items = []; // массив элементов

    this._states = [
      { active: false, minWidth: 0, count: 1 },
      { active: false, minWidth: 980, count: 2 }
    ],
    
    // наполнение массива _items
    this._sliderItems.forEach((item, index) => {
      this._items.push({ item: item, position: index, transform: 0 });
    });

    this.position = {
      getMin: 0,
      getMax: this._items.length - 1,
    }

    this._setUpListeners();

    return {
      right: function () { // метод right
        _transformItem('right');
      },
      left: function () { // метод left
        _transformItem('left');
      }
    }
  }
}