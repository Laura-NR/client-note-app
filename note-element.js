export class NoteElement {
    static create(note) {
        const noteElem = document.createElement('li');
        //noteElem.innerText = note.text;
        noteElem.innerHTML = `${note.text}  - ${note.category} - <button data-id="${note.id}">X</button>`;
        return noteElem;         
    }

    static delete(id) {
        const noteElem = document.querySelector(`[data-id="${id}"]`);
        if (noteElem) {
            noteElem.parentElement.remove();
        }
    }
}