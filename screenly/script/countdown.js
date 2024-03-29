function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  // var secondsSpan = clock.querySelector('.seconds');
  var daySpan = clock.querySelector('.day');

  var months = ['januari', 'februari', 'mars',
                'april', 'maj', 'juni',
                'juli', 'augusti', 'september',
                'oktober', 'november', 'december']

  function updateClock() {
    var t = new Date();

    hoursSpan.innerHTML = ('0' + t.getHours()).slice(-2);
    minutesSpan.innerHTML = ('0' + t.getMinutes()).slice(-2);
    // secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    daySpan.innerHTML =  t.getDate() + ' ' + months[t.getMonth()];
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function initializeCountdown(id, endtime, config) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    if (config.hideDaysOnZero && t.days === 0) {
      daysSpan.remove();
    } else {
      daysSpan.innerHTML = config.emptyDaysOnZero && t.days==0 ? '': t.days;
    }
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// init & start clock
// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
// initializeClock('clockdiv', deadline);