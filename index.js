import { Note } from './note.js';
import { NoteManager } from './note-manager.js';
import { NoteElement } from './note-element.js';

// le modèle
let notes = [];
const minChars = 6;

const inputElem = document.getElementById('my-input');
const listElem = document.getElementById('list');
const errorMsg = document.getElementById('error-msg');
const form = document.getElementsByTagName('form')[0];

function updateCounter() {
  document.getElementById('count').innerText = notes.length;
}

function addNoteToModel() {
  // ajouter la nouvelle note dans
  notes.push(inputElem.value);
}

function addNoteToView() {
  // création de l'element d'affichage
  let newItem = document.createElement('li');
  newItem.innerText = inputElem.value;

  // ajouter dans l'arbre / DOM
  // on l'ajoute comme enfant de la liste
  listElem.appendChild(newItem);
}

function addNote() {
  addNoteToModel();
  addNoteToView();
}

function resetInput() {
  // reset du champs de saisie
  inputElem.value = '';
}

function isValid() {
  // vérifier validité de la saisie
  // au moins quatre caractères
  let valid = (inputElem.value.length >= minChars);
  return valid;
}

function showError() {
  errorMsg.style.display = 'block';
}

function hideError() {
  errorMsg.style.display = 'none';
}

inputElem.addEventListener('change', function (event) {
  if (isValid()) {
    hideError();
  } else {
    showError();
  }
});

// gérer la soumission du formulaire.
form.addEventListener('submit', async function (event) {
  // empêcher le rechargement de la page(comportement par défaut d'un form)
  event.preventDefault();
  if (isValid()) {
    //instantiation d'une nouvelle note
    const newNote = new Note(null, inputElem.value);
    await NoteManager.create(newNote);
    await refreshNotes();
    //updateCounter();
    resetInput();
  }
});

listElem.addEventListener('click', event => {
  console.log('event target: ', event.target.getAttribute("data-id"));
  const id = +event.target.getAttribute("data-id")
  if (!isNaN(id)) {
    NoteManager.remove(id);
  }
})

document.querySelector('#error-msg span').innerText = minChars;

async function refreshNotes() {
    notes = await NoteManager.list();
    let noteElements = notes.map(note => NoteElement.create(note));
    //while (listElem.children) listElem.removeChild(0);
    listElem.innerHTML = '';
    noteElements.forEach(noteElem => listElem.appendChild(noteElem));
}

refreshNotes();
