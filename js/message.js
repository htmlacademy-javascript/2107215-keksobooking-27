const ALERT_SHOW_TIME = 10000;
let successSubmitMessage;
let errorSubmitMessage;

successSubmitMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);

errorSubmitMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

const showMessage = () => {
  document.body.append(successSubmitMessage);
  successSubmitMessage.addEventListener('click', closeMessageClick);
  document.addEventListener('keydown', messageEscKeydown);
};
const closeMessageClick = () => {
  successSubmitMessage.remove();
  successSubmitMessage.removeEventListener('click', closeMessageClick);
  document.removeEventListener('keydown', messageEscKeydown);
};
function messageEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessageClick();
  }
}

const showErrorMessage = () => {
  document.body.append(errorSubmitMessage);
  document.addEventListener('keydown', errorMessageEscKeydown);
  errorSubmitMessage.addEventListener('click', errorMessageClick);
};
const errorMessageClick = () => {
  errorSubmitMessage.remove();
  document.removeEventListener('keydown', errorMessageEscKeydown);
  errorSubmitMessage.removeEventListener('click', errorMessageClick);
};
function errorMessageEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    errorMessageClick();
  }
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.right = 0;
  alertContainer.style.bottom = 0;
  alertContainer.style.position = 'fixed';
  alertContainer.style.padding = '40px 75px';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.borderRadius = '2px';
  alertContainer.style.border = '3px solid #ffaa99';
  alertContainer.style.fontSize = '30px';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {showErrorMessage, showMessage, showAlert};
