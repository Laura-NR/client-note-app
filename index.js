import { Note } from './note.js';
import { NoteManager } from './note-manager.js';
import { NoteElement } from './note-element.js';

// le modèle
let notes = [];
const minChars = 6;

const inputElem = document.getElementById('my-input');
const listElem = document.getElementById('list');
const errorMsg = document.getElementById('error-msg');
//const form = document.getElementsByTagName('form')[0];
const form = document.getElementById('myForm');
const category = document.getElementById('category');
const counter = document.getElementById('count');
const searchInput = document.getElementById('search');

async function updateCounter() {
  notes = await NoteManager.list();
  counter.innerText = notes.length;
}
updateCounter();

function addNoteToModel() {
  const noteText = inputElem.value;
  const categoryValue = category.value;
  //const currentDate = new Date().toLocaleDateString();
  console.log(categoryValue);
  // Create a new Note object with text and category
  const newNote = { text: noteText, category: categoryValue };
  // Add the new note to the notes array
  notes.push(newNote);
}

function addNoteToView() {
  // création de l'element d'affichage
  let newItem = document.createElement('li');
  const noteText = inputElem.value;
  const categoryValue = category.value;
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  newItem.innerText = `${noteText} - ${categoryValue} - ${currentDate}`;

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
  console.log('Form Event Lister');
  event.preventDefault();
  if (isValid()) {
    //instantiation d'une nouvelle note
    const newNote = new Note(null, inputElem.value, category.value);
    await NoteManager.create(newNote);
    await refreshNotes();
    updateCounter();
    resetInput();
  }
});

listElem.addEventListener('click', event => {
  console.log('event target: ', event.target.getAttribute("data-id"));
  const target = event.target;
  const id = +event.target.getAttribute("data-id");
  if (!isNaN(id)) {
    if (target.classList.contains('delete-btn')) {
      NoteManager.remove(id)
        .then(() => refreshNotes());
    } else if (target.classList.contains('update-btn')) {
      // Assuming you have a function to get the updated note from the user
      console.log("Ahora si");
      const updatedNote = getUpdatedNote(); // Implement this function
      console.log(updatedNote);
      NoteManager.update(id, updatedNote)
        .then(() => refreshNotes());

    }
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

function getUpdatedNote() {
  const noteText = inputElem.value;
  const categoryValue = category.value;
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  return { text: noteText, category: categoryValue, date: currentDate };
}

searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase(); // Convert search value to lowercase for case-insensitive comparison
  const listItems = document.querySelectorAll('#list li'); // Select all <li> elements

  listItems.forEach(listItem => {
    const noteText = listItem.innerText.toLowerCase(); // Get text content of the <li> element
    const isVisible = noteText.includes(value); // Check if the search value is included in the note text
    listItem.classList.toggle("hide", !isVisible); // Toggle the "hide" class based on visibility
  });
});
