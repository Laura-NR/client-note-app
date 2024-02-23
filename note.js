export class Note {
  constructor(id, text, author,date, category) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = date;
    this.category = category;
  }

  fullDisplay() {
    const formattedDate = this.date.toLocaleDateString();
    const display = `
      Text: ${this.text} - Author: ${this.author}
       - Date: ${formattedDate} - ${this.category}
    `;
    return display;
  }

  length() {
    return this.text.length;
  }
}
