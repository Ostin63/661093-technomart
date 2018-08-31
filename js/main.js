if (document.querySelector('#form-filter')) {
  var range = {
    min: 0,
    max: 37000,
    step: 100
  }
  var form = document.querySelector('.form');
  var rangeOutput = document.querySelectorAll('.range-output');
  var rangeBar = document.querySelector('.range-bar');
  var leverMin = document.querySelector('.range-lever-min');
  var leverMax = document.querySelector('.range-lever-max');
  var scaleLength = document.querySelector('.range-scale').offsetWidth;
  form.price[0].step = range.step;
  form.price[0].step = range.step;
  form.price[1].max = range.max;

  var onValuesGetting = function () {
    var valueMin = form.price[0].value;
    var valueMax = form.price[1].value;
    var leverMinPos = 100 * valueMin / range.max + '%';
    var leverMaxPos = 100 * valueMax / range.max + '%';
    rangeOutput[0].innerHTML = valueMin;
    rangeOutput[1].innerHTML = valueMax;
    form.price[0].max = valueMax;
    form.price[1].min = valueMin;
    rangeBar.style.left = leverMinPos;
    rangeBar.style.right = 'calc(100% - ' + leverMaxPos + ')';
    leverMin.style.left = 'calc(' + leverMinPos + ' - ' + leverMin.offsetWidth / 2 + 'px)';
    leverMax.style.left = 'calc(' + leverMaxPos + ' - ' + leverMax.offsetWidth / 2 + 'px)';
  }

  var onLeverGrabbing = function (event) {
    event.preventDefault();
    var isEventTouch = event.type === 'touchstart';
    var eventMove = isEventTouch ? 'touchmove' : 'mousemove';
    var eventEnd = isEventTouch ? 'touchend' : 'mouseup';
    var control = event.target === leverMin ? form.price[0] : form.price[1];
    var moveStart = isEventTouch ? event.changedTouches[0].pageX : event.pageX;
    var moveEnd = moveStart;
    var initialValue = parseInt(control.value, 10);

    var getNewValue = function () {
      return Math.round((moveEnd - moveStart) * range.max / (range.step * scaleLength)) * range.step + initialValue;
    }

    var onLeverMoving = function (event) {
      moveEnd = isEventTouch ? event.changedTouches[0].pageX : event.page;
      control.value = getNewValue();
      onValuesGetting();
    }

    var onLeverReleasing = function (event) {
      event.preventDefault();
      document.removeEventListener(eventMove, onLeverMoving);
      document.removeEventListener(eventEnd, onLeverReleasing);
    }

    document.addEventListener(eventMove, onLeverMoving);
    document.addEventListener(eventEnd, onLeverReleasing);
  }

  form.addEventListener('change', onValuesGetting);
  leverMin.addEventListener('mousedown', onLeverGrabbing);
  leverMax.addEventListener('mousedown', onLeverGrabbing);
  leverMin.addEventListener('touchstart', onLeverGrabbing);
  leverMax.addEventListener('touchstart', onLeverGrabbing);

  onValuesGetting();
}
var cashPopup = document.querySelector('.modal-cash');
var elements = document.querySelectorAll('a.buy');
var cashCheckout = document.querySelector('.checkout');
var cashClose = cashPopup.querySelector('.modal-close');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    cashPopup.classList.add('modal-show');
  });

  cashClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    cashPopup.classList.remove('modal-show');
  });

  cashCheckout.addEventListener('click', function (evt) {
    evt.preventDefault();
    cashPopup.classList.remove('modal-show');
  });


  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      if (popup.classList.contains('modal-show')) {
        popup.classList.remove('modal-show');
      }

      if (mapPopup.classList.contains('modal-show')) {
        mapPopup.classList.remove('modal-show');
      }

      if (cashPopup.classList.contains('modal-show')) {
        cashPopup.classList.remove('modal-show');
      }
    }
  });
}

var enrtyRoom = document.querySelector('.authorization');
var elements = document.querySelectorAll('a.bottom-entry');
var closeRoom = enrtyRoom.querySelector('a.exit');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    enrtyRoom.classList.add('room');
  });

  closeRoom.addEventListener('click', function (evt) {
    evt.preventDefault();
    enrtyRoom.classList.remove('room');
  });
}
if (document.querySelector('#modal-login')) {
  var link = document.querySelector('.button-modal');

  var popup = document.querySelector('.modal-login');
  var close = popup.querySelector('.modal-close');

  var form = popup.querySelector('.login-form');
  var fullname = popup.querySelector('[name=fullname]');
  var email = popup.querySelector('[name=email]');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('fullname');
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('modal-show');

    if (storage) {
      fullname.value = storage;
      email.focus();
    } else {
      fullname.focus();
    }
  });

  close.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.remove('modal-show');
    popup.classList.remove('modal-error');
  });

  form.addEventListener('submit', function (evt) {
    if (!fullname.value || !email.value) {
      evt.preventDefault();
      popup.classList.remove('modal-error');
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('fullname', fullname.value);
      }
    }
  });


  var mapLink = document.querySelector('.modal-map-button');

  var mapPopup = document.querySelector('.modal-map');
  var mapClose = mapPopup.querySelector('.modal-close');


  mapLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    mapPopup.classList.add('modal-show');
  });

  mapClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove('modal-show');
  });


  function initMap() {
    var myLatLng = {
      lat: 59.938794,
      lng: 30.323083
    };
    var map = new google.maps.Map(document.querySelector('#map-container'), {
      center: myLatLng,
      disableDefaultUI: true,
      zoom: 16
    });
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
    });
  }
}