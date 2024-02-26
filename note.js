export class Note {
  constructor(id, text,category, date, author) {
    this.id = id;
    this.text = text;
    this.category = category;
    this.date = this.parseDate(date);
    this.author = author;
  }

  parseDate(dateString) {
    const parsedDate = new Date(dateString);
    // Check if the parsedDate is valid
    if (isNaN(parsedDate.getTime())) {
        console.error(`Invalid date format: ${dateString}`);
        return null; // Return null for invalid date
    }
    return parsedDate;
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
