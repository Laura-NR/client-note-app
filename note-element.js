export class NoteElement {
    static create(note) {
        const noteElem = document.createElement('li');
        //noteElem.innerText = note.text;
        const formattedDate = note.date ? note.date.toLocaleDateString() : ""; //Format the date
        noteElem.innerHTML = `${note.text}  - ${note.category} - ${formattedDate} - <button data-id="${note.id}">X</button>`;
        return noteElem;         
    }

    static delete(id) {
        const noteElem = document.querySelector(`[data-id="${id}"]`);
        if (noteElem) {
            noteElem.parentElement.remove();
        }
    }
}