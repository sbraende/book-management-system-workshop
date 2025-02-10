import AudioBook from "./audioBook";
import PrintedBook from "./printedBooks.js";

class BookManager {
  static booksCollection =
    JSON.parse(localStorage.getItem("books-collection")) || [];

  static addBook(
    title,
    author,
    publisher,
    date,
    bookTypeDropdown,
    pages,
    printType,
    narrator,
    duration
  ) {
    let book;
    if (bookTypeDropdown === "printed-book") {
      book = new PrintedBook(
        title,
        author,
        publisher,
        date,
        bookTypeDropdown,
        pages,
        printType
      );
    } else {
      book = new AudioBook(
        title,
        author,
        publisher,
        date,
        bookTypeDropdown,
        narrator,
        duration
      );
    }
    // Below example would do the same
    // this.booksCollection
    // BookManager.booksCollection
    // localStorage.setItem("")

    this.booksCollection.push(book);
    console.log(this.booksCollection);
  }
}

export default BookManager;
