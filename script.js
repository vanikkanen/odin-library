const myLibrary = []
myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, 1960, true));
myLibrary.push(new Book("1984", "George Orwell", 328, 1949, false));
myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, true));
myLibrary.push(new Book("Pride and Prejudice", "Jane Austen", 279, 1813, false));
myLibrary.push(new Book("The Catcher in the Rye", "J.D. Salinger", 214, 1951, false));

booksToPage()

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

Book.prototype.toggleRead = function () {
    this.read = !this.read
}

function addBookToLibrary(title, author, pages, year, read) {
    const newBook = new Book(title, author, pages, year, read)
    myLibrary.push(newBook)
}

function removeFromLibrary(index) {
    myLibrary.splice(index, 1)
}

function booksToPage() {
    const pageLibrary = document.querySelector(".library-container")

    pageLibrary.innerHTML = ""

    // Add the "Add Book" button
    const addCard = document.createElement("div")
    addCard.className = "add-card book-card"
    addCard.innerHTML = `
        <svg class="card-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
        </svg>
    `

    // Attach click event listener for opening the dialog
    const dialog = document.querySelector(".book-modal")
    addCard.addEventListener("click", () => {
        dialog.showModal()
    });

    // Create and append book cards
    myLibrary.forEach((book, idx) => {
        const card = document.createElement("div")
        card.className = "book-card"

        book.read ? card.classList.add("card-read-status-read") : card.classList.add("card-read-status-not-read")

        card.innerHTML = `
            <p class="book-title">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <div class="book-info">
                <p>${book.pages} pages</p>
                <p>${book.year}</p>
            </div>
            <div class="book-card-overlay">
                <button class="delete-button" data-index="${idx}">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                    </svg>
                </button> 
                <button class="read-button" data-index="${idx}">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" />
                    </svg>
                </button>
            </div>
        `

        const deleteButton = card.querySelector(".delete-button")
        deleteButton.addEventListener("click", () => {
            removeFromLibrary(idx)
            booksToPage()
        })

        const readButton = card.querySelector(".read-button")
        book.read ? readButton.classList.add("read-status-read") : readButton.classList.add("read-status-not-read")
        readButton.addEventListener("click", () => {
            book.toggleRead()
            booksToPage()
        })

        pageLibrary.appendChild(card)
    });
    pageLibrary.appendChild(addCard)
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
