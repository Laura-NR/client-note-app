import { Note } from './note.js';
import { NoteManager } from './note-manager.js';
import { NoteList } from './note-list.js';

// le modèle
let notes = [];
const minChars = 6;

const inputElem = document.getElementById('my-input');
const listElem = document.getElementById('list');

const errorMsg = document.getElementById('error-msg');
const form = document.getElementById('myForm');
const category = document.getElementById('category');
const counter = document.getElementById('count');
const searchInput = document.getElementById('search');

async function updateCounter() {
  notes = await NoteManager.list();
  counter.innerText = notes.length;
}
updateCounter();

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

listElem.addEventListener('click', async (event) => {
  console.log('event target: ', event.target.getAttribute("data-id"));
  const target = event.target;
  const id = +event.target.getAttribute("data-id");
  if (!isNaN(id)) {
    if (target.classList.contains('delete-btn')) {
      await NoteManager.remove(id);
    } else if (target.classList.contains('update-btn')) {
      //on filter sur les élements qui ont l'id correspondant
      //on doit donc faire un [0] pour récupérer l'élement
      const noteToUpdate = notes.filter(note => note.id === id)[0];
      //on demande la saisi de la nouvelle valeur pour ce chemps
      noteToUpdate.text = window.prompt('Nouvelle valeur pour le chemps text', noteToUpdate.text);
      // const test = await NoteManager.update(noteToUpdate);
      NoteManager.update(noteToUpdate)
      .then(rersponse => refreshNotes())
    
    }
    refreshNotes();
  }
})

document.querySelector('#error-msg span').innerText = minChars;

async function refreshNotes() {
  notes = await NoteManager.list();
  let noteElements = notes.map(note => NoteList.create(note));
  listElem.innerHTML = '';
  noteElements.forEach(noteElem => listElem.appendChild(noteElem));
}

refreshNotes();

searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase(); // Convert search value to lowercase for case-insensitive comparison
  const listItems = document.querySelectorAll('#list li'); // Select all <li> elements

  listItems.forEach(listItem => {
    const noteText = listItem.innerText.toLowerCase(); // Get text content of the <li> element
    const isVisible = noteText.includes(value); // Check if the search value is included in the note text
    listItem.classList.toggle("hide", !isVisible); // Toggle the "hide" class based on visibility
  });
});
