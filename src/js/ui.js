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
}

export default Ui;
