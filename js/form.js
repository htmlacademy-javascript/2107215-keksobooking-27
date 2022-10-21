const adForm = document.querySelector('.ad-form');

function disableElement(classElement) {
  for (const item of classElement.children) {
    item.disabled = true;
  }
}

export function deactivePage() {
  disableElement(adForm);
}

deactivePage();

function enableElement(classElement) {
  for (const item of classElement.children) {
    item.disabled = false;
  }
}

export function activePage() {
  enableElement(adForm);
}

activePage();
