import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value.trim(), 10);
  const state = form.elements.state.value;

  if (isNaN(delay) || !state) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill out all fields correctly',
      position: 'topRight',
    });
    return;
  }

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  form.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
