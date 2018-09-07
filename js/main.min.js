var cashPopup = document.querySelector('.modal-cash');
var buyList = document.querySelectorAll('a.buy');
var cashCheckout = cashPopup.querySelector('.checkout');
var cashClose = cashPopup.querySelector('.modal-close');

var onModalClose = function (evt) {
  evt.preventDefault();
  document.querySelector('.modal-show').classList.remove('modal-show');
  window.removeEventListener('keydown', onEscapePress)
};

var onEscapePress = function (evt) {
  if (evt.keyCode === 27) {
    onModalClose(evt);
  }
};

cashClose.addEventListener('click', onModalClose);
cashCheckout.addEventListener('click', onModalClose);

for (var i = 0; i < buyList.length; i++) {
  buyList[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    cashPopup.classList.add('modal-show');
    window.addEventListener('keydown', onEscapePress);
  });
}

var enrtyRoom = document.querySelector('.authorization');
var buttonEntry = enrtyRoom.querySelector('.button-entry');
var closeRoom = enrtyRoom.querySelector('.exit');

var onEntryPress = function (evt) {
  evt.preventDefault();
  enrtyRoom.classList.toggle('room');
}

buttonEntry.addEventListener('click', onEntryPress);
closeRoom.addEventListener('click', onEntryPress);

if (document.querySelector('#modal-feedback')) {
  var link = document.querySelector('.button-modal');

  var modalFeedback = document.querySelector('#modal-feedback');
  var close = modalFeedback.querySelector('.modal-close');

  var feedbackForm = modalFeedback.querySelector('.feedback-form');
  var fullname = modalFeedback.querySelector('[name=fullname]');
  var email = modalFeedback.querySelector('[name=email]');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('fullname');
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalFeedback.classList.add('modal-show');
    window.addEventListener('keydown', onEscapePress);

    if (storage) {
      fullname.value = storage;
      email.focus();
    } else {
      fullname.focus();
    }
  });

  close.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalFeedback.classList.remove('modal-show');
    modalFeedback.classList.remove('modal-error');
  });

  feedbackForm.addEventListener('submit', function (evt) {
    if (!fullname.value || !email.value) {
      evt.preventDefault();
      modalFeedback.classList.remove('modal-error');
      modalFeedback.offsetWidth = modalFeedback.offsetWidth;
      modalFeedback.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('fullname', fullname.value);
      }
    }
  });
}

if (document.querySelector('.modal-map-button')) {
  var mapLink = document.querySelector('.modal-map-button');

  var mapPopup = document.querySelector('.modal-map');
  var mapClose = mapPopup.querySelector('.modal-close');

  mapLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    mapPopup.classList.add('modal-show');
    window.addEventListener('keydown', onEscapePress);
  });

  mapClose.addEventListener('click', onModalClose);

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
