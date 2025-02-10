import AudioBook from "./audioBook";
import PrintedBook from "./printedBooks.js";
import Ui from "./ui.js";

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

    BookManager.booksCollection.push(book);
    BookManager.storeBooks(BookManager.booksCollection);
  }

  static storeBooks = (collection) => {
    localStorage.setItem("books-collection", JSON.stringify(collection));
  };

  static deleteBook(id) {
    // const booksCollection = JSON.parse(
    //   localStorage.getItem("books-collection")
    // );
    // const filteredBook = booksCollection.filter((book) => book.id !== id);
    // BookManager.storeBooks(filteredBook);

    BookManager.booksCollection = BookManager.booksCollection.filter(
      (book) => book.id !== id
    );
    BookManager.storeBooks(BookManager.booksCollection);
    Ui.renderBooks();
  }
}

export default BookManager;
