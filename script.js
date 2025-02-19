const myLibrary = []

function Book(title, author, pages, year, read) {

    if (!new.target) {
        throw Error("Must use the new operator to call the function")
    }

    this.title = title
    this.author = author
    this.pages = pages
    this.year = year
    this.read = read
}

function addBookToLibrary(title, author, pages, year, read) {
    const newBook = new Book(title, author, pages, year, read)
    myLibrary.push(newBook)
}

function booksToPage() {
    const pageLibrary = document.querySelector(".library-container");

    pageLibrary.innerHTML = ""; 

    // Add the "Add Book" button
    const addCard = document.createElement("div");
    addCard.className = "add-card book-card";
    addCard.innerHTML = `
        <svg class="card-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
        </svg>
    `;

    // Attach click event listener for opening the dialog
    const dialog = document.querySelector(".book-modal")
    addCard.addEventListener("click", () => {
        dialog.showModal();
    });

    // Create and append book cards
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <p class="book-title">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <div class="book-info">
                <p>${book.pages} pages</p>
                <p>${book.year}</p>
            </div>
        `;
        pageLibrary.appendChild(card);
    });
    pageLibrary.appendChild(addCard);
}

function handleFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    console.log(formData)
    console.log(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("year"), formData.get("read")!==null)
    addBookToLibrary(formData.get("title"), formData.get("author"), +formData.get("pages"), +formData.get("year"), formData.get("read")!==null)
    booksToPage()
    const dialog = document.querySelector(".book-modal")
    dialog.close()

}

addBookToLibrary("Test1", "John Doe", 123, 2022, false)
addBookToLibrary("Test2", "John Doe", 123, 2023, false)
addBookToLibrary("Test3", "John Doe", 123, 2024, false)
addBookToLibrary("Test4", "John Doe", 123, 2025, false)
booksToPage()