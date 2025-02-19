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

    const pageLibrary = document.querySelector(".library-container")

    const fragment = document.createDocumentFragment();

    myLibrary.forEach(book => {
        const card = document.createElement("div")
        card.className = "book-card"
        card.innerHTML = `
            <p class="book-title">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <div class="book-info">
                <p>${book.pages} pages</p>
                <p>${book.year}</p>
            </div>
        `;
        fragment.appendChild(card)
    })

    pageLibrary.insertBefore(fragment, pageLibrary.firstChild)

}

const addCard = document.querySelector(".add-card")
addCard.addEventListener("click", () => {
    console.log("CLICK")
})


addBookToLibrary("Test1", "John Doe", 123, 2022, false)
addBookToLibrary("Test2", "John Doe", 123, 2023, false)
addBookToLibrary("Test3", "John Doe", 123, 2024, false)
addBookToLibrary("Test4", "John Doe", 123, 2025, false)
booksToPage()