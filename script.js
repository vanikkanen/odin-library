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

