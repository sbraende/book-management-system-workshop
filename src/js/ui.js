import BookManager from "./bookManager";

class Ui {
  static toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    printedFields,
    audioFields,
    bookType
  ) {
    // Hide both containers initially
    printedBookContainer.style.display = "none";
    audioBookContainer.style.display = "none";

    // Reset values of both categories
    printedFields.forEach((field) => {
      field.value = "";
    });
    audioFields.forEach((field) => {
      field.value = "";
    });

    // Display relevant container based on user selection
    if (bookType === "printed-book") {
      printedBookContainer.style.display = "block";
    } else {
      audioBookContainer.style.display = "block";
    }
  }

  static displayAddModal(
    openAddModalButton,
    formModal,
    printedBookContainer,
    audioBookContainer
  ) {
    openAddModalButton.addEventListener("click", () => {
      formModal.classList.add("display-form");
      // Hide both containers initially
      printedBookContainer.style.display = "none";
      audioBookContainer.style.display = "none";
    });
  }

  static closeAddModal(closeAddModalButton, formModal) {
    closeAddModalButton.addEventListener("click", () => {
      formModal.classList.remove("display-form");
    });
  }

  static displayDeleteModal(bookId, bookTitle) {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteMessage = document.querySelector(".delete-modal__text");
    const confirmDeleteButton = document.querySelector(
      ".delete-modal__confirm"
    );

    deleteMessage.textContent = `Are you sure you want to delete ${bookTitle}?`;
    deleteModal.classList.add("display-modal");

    confirmDeleteButton.addEventListener("click", () => {
      BookManager.deleteBook(bookId);
      deleteModal.classList.remove("display-modal");
    });
  }

  static closeDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const cancelDeleteButton = document.querySelector(".delete-modal__cancel");

    cancelDeleteButton.addEventListener("click", () => {
      deleteModal.classList.remove("display-modal");
    });
  }

  static renderBooks(filter = "all") {
    const bookList = document.querySelector(".books__list");
    bookList.innerHTML = "";
    const booksCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );

    const filteredCollection =
      filter === "all"
        ? booksCollection
        : booksCollection.filter((book) => book.bookType === filter);

    if (filteredCollection) {
      filteredCollection.forEach((book, index, arr) => {
        // Create elements
        const bookCard = document.createElement("li");
        const bookDetailsContainer = document.createElement("div");
        const bookToolsContainer = document.createElement("div");

        const titleContainer = document.createElement("div");
        const authorContainer = document.createElement("div");
        const publisherContainer = document.createElement("div");
        const dateContainer = document.createElement("div");
        const typeContainer = document.createElement("div");
        const pagesOrNarratorContainer = document.createElement("div");
        const printTypeOrDurationContainer = document.createElement("div");

        const titleHeader = document.createElement("h3");
        const authorHeader = document.createElement("h3");
        const publisherHeader = document.createElement("h3");
        const dateHeader = document.createElement("h3");
        const typeHeader = document.createElement("h3");
        const pagesOrNarratorHeader = document.createElement("h3");
        const printTypeOrDurationHeader = document.createElement("h3");

        const title = document.createElement("span");
        const author = document.createElement("span");
        const publisher = document.createElement("span");
        const date = document.createElement("span");
        const type = document.createElement("span");
        const pagesOrNarrator = document.createElement("span");
        const printTypeOrDuration = document.createElement("span");

        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        // Append elemets
        bookList.append(bookCard);
        bookCard.append(bookDetailsContainer, bookToolsContainer);
        bookDetailsContainer.append(
          titleContainer,
          authorContainer,
          publisherContainer,
          dateContainer,
          typeContainer,
          pagesOrNarratorContainer,
          printTypeOrDurationContainer
        );

        titleContainer.append(titleHeader, title);
        authorContainer.append(authorHeader, author);
        publisherContainer.append(publisherHeader, publisher);
        dateContainer.append(dateHeader, date);
        typeContainer.append(typeHeader, type);
        pagesOrNarratorContainer.append(pagesOrNarratorHeader, pagesOrNarrator);
        printTypeOrDurationContainer.append(
          printTypeOrDurationHeader,
          printTypeOrDuration
        );

        bookToolsContainer.append(deleteButton, editButton);

        // Content on elements
        titleHeader.textContent = "Title: ";
        authorHeader.textContent = "Author: ";
        publisherHeader.textContent = "Publisher: ";
        dateHeader.textContent = "Publish date: ";
        typeHeader.textContent = "Book type: ";
        pagesOrNarratorHeader.textContent =
          book.bookType === "printed-book" ? "Pages: " : "Narrator: ";
        printTypeOrDurationHeader.textContent =
          book.bookType === "printed-book" ? "Print type: " : "Duration: ";
        deleteButton.textContent = "🗑️";
        editButton.textContent = "✒️";

        title.textContent = book.title;
        author.textContent = book.author;
        publisher.textContent = book.author;
        date.textContent = book.date;
        type.textContent = book.bookType;
        pagesOrNarrator.textContent =
          book.bookType === "printed-book" ? book.pages : book.narrator;
        printTypeOrDuration.textContent =
          book.bookType === "printed-book" ? book.printType : book.duration;

        // Classnames
        bookCard.classList.add("book__item");
        bookDetailsContainer.classList.add("book-item__details-container");
        bookToolsContainer.classList.add("book-item__tools-container");
        deleteButton.classList.add("book-item__delete-button");
        editButton.classList.add("book-item__edit-button");

        // Eventlisteners
        deleteButton.addEventListener("click", () => {
          this.displayDeleteModal(book.id, book.title);
        });
      });
    }
  }
}

export default Ui;
