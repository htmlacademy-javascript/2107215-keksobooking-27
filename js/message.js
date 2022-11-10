const ALERT_SHOW_TIME = 10000;

const successSubmitMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);

const errorSubmitMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

const onCloseMessageClick = () => {
  successSubmitMessage.remove();
  successSubmitMessage.removeEventListener('click', onCloseMessageClick);
  document.removeEventListener('keydown', onMessageEscKeydown);
};
function onMessageEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseMessageClick();
  }
}
const showMessage = () => {
  document.body.append(successSubmitMessage);
  successSubmitMessage.addEventListener('click', onCloseMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);
};

const onErrorMessageClick = () => {
  errorSubmitMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  errorSubmitMessage.removeEventListener('click', onErrorMessageClick);
};
function onErrorMessageEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onErrorMessageClick();
  }
}
const showErrorMessage = () => {
  document.body.append(errorSubmitMessage);
  errorSubmitMessage.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '9999';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.position = 'fixed';
  alertContainer.style.paddingTop = '28px';
  alertContainer.style.paddingBottom = '28px';
  alertContainer.style.width = '100%';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.borderRadius = '2px';
  alertContainer.style.border = '3px solid #fd8871';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {showErrorMessage, showMessage, showAlert};
