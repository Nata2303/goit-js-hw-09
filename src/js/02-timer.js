import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    const startButton = document.querySelector('[data-start]');
    startButton.removeAttribute('disabled');
  },
});

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let countdownIntervalId;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const currentDate = new Date();
  const countdown = selectedDate - currentDate;

  if (countdown <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  countdownIntervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(countdown);

    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);

    countdown -= 1000;

    if (countdown <= 0) {
      clearInterval(countdownIntervalId);
      startButton.setAttribute('disabled', true);
    }
  }, 1000);
});