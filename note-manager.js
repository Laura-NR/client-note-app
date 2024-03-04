import { Note } from './note.js'

export class NoteManager {
    static async list() {
        const response = await fetch('http://localhost:3000/notes/');
        const data = await response.json()
        console.log("Chargement: ",data);
        return data.map(obj => new Note(obj.id, obj.text, obj.category, obj.date));
    }

    static async create(note) {
        console.log(note);
        const response = await fetch('http://localhost:3000/notes/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)            
        });
        const data = await response.json();
        return data;
    }

    static async remove(id) {
        const response = await fetch('http://localhost:3000/notes/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },           
        });
    }

    static async update(note) {
        const response = await fetch('http://localhost:3000/notes/' + note.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)            
        });
        const data = await response.json();
        return data;
    }
}