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

const showAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = '9999';
  alertMessage.style.left = 0;
  alertMessage.style.top = 0;
  alertMessage.style.position = 'fixed';
  alertMessage.style.paddingTop = '28px';
  alertMessage.style.paddingBottom = '28px';
  alertMessage.style.width = '100%';
  alertMessage.style.backgroundColor = 'white';
  alertMessage.style.borderRadius = '2px';
  alertMessage.style.border = '3px solid #fd8871';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.textAlign = 'center';
  alertMessage.textContent = message;
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {showErrorMessage, showMessage, showAlert};
