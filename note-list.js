export class NoteList {
    #noteElements = [];
    #domElement;

    constructor(domElement) {
        this.#domElement = domElement;
    }

    static create(note) {
        const noteElem = document.createElement('li');
        //noteElem.innerText = note.text;
        const formattedDate = note.date ? note.date.toLocaleDateString() : ""; //Format the date
        noteElem.innerHTML = `${note.text}  - ${note.category} - ${formattedDate} - <button class="delete-btn" data-id="${note.id}">🗑️</button><button class="update-btn" data-id="${note.id}">✏️</button>`;
        return noteElem;      
    }

    // mettre à jour la vue de la liste des notes
    // un tableau de note doit nous être fourni
    update(notes) {
        if (!Array.isArray(notes)) {
        console.error('vous devez fournir un tableau');
        return;
        }

        // dans la vue on purge la liste (comme des sauvages)
        this.#domElement.innerHTML = '';

        // on génère le tableau de node Elements depuis les notes fournies
        let noteElements = notes.map(note => NoteElement.create(note));

        // maintenant que la liste est vide ajouter, enfant par enfant
        noteElements.forEach(noteElem => this.#domElement.appendChild(noteElem));
    }
    

    static delete(id) {
        const noteElem = document.querySelector(`[data-id="${id}"]`);
        if (noteElem) {
            noteElem.parentElement.remove();
        }
    }

    // adaptateur, permet de faire un addEventListener fur l'élément DOM (qui implémente EventTarget) encapsulé
    addEventListener (eventType, callback) {
        this.#domElement.addEventListener(eventType, callback);
    }
}