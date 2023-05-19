
import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelayInput = form.elements['delay'];
  const stepInput = form.elements['step'];
  const amountInput = form.elements['amount'];

  const firstDelay = parseInt(firstDelayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (isNaN(firstDelay) || isNaN(step) || isNaN(amount)) {
    Notiflix.Notify.failure('Please enter valid numbers');
    return;
  }

  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});