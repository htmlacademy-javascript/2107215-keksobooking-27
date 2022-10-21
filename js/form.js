export function deactivePage () {
  document.querySelector('#title').disabled = true;
  document.querySelector('#address').disabled = true;
  document.querySelector('#type').disabled = true;
}

deactivePage ();

export function activePage () {
  document.querySelector('#title').disabled = false;
  document.querySelector('#address').disabled = false;
  document.querySelector('#type').disabled = false;
}

activePage ();
