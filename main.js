let myLibrary = [];

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}

function add(title, author, year, pages, read) {
    let temp = new Book(title, author, year, pages, read);
    myLibrary.push(temp);
}

function clearBooks() {
    const bookBox = document.querySelector(".book-box");
    bookBox.innerHTML = "";
}

function displayBooks() {
    const bookBox = document.querySelector(".book-box");
    myLibrary.forEach((book) => {
        // Creating elements
        let bookCard = document.createElement("div");
        let cardInner = document.createElement("div");
        let cardFront = document.createElement("div");
        let cardBack = document.createElement("div");
        let title = document.createElement("h2");
        let author = document.createElement("p");
        let year = document.createElement("p");
        let pages = document.createElement("p");
        let readIndicator = document.createElement("input");
        let readLabel = document.createElement("label");
        let removeBtn = document.createElement("button");

        // Setting up card structure
        bookCard.classList.add("book-card");
        cardInner.classList.add("card-inner");
        cardFront.classList.add("card-front");
        cardBack.classList.add("card-back");
        readIndicator.setAttribute("type", "checkbox");
        readLabel.textContent = "Read? ";
        if (book.read) {
            readIndicator.checked = true;
            cardFront.classList.add("read");
        }
        readIndicator.addEventListener("click", () => {
            if (readIndicator.checked) {
                cardFront.classList.add("read");
                book.read = true;
            } else {
                cardFront.classList.remove("read");
                book.read = false;
            }
        });
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            clearBooks();
            displayBooks();
        });
        bookCard.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        readLabel.appendChild(readIndicator);

        // Setting up card data
        title.textContent = book.title;
        author.textContent = `by ${book.author}`;
        year.textContent = `Published in ${book.year}`;
        pages.textContent = `This book has ${book.pages} pages`;

        // Appending card data
        cardFront.appendChild(title);
        cardFront.appendChild(author);
        cardBack.appendChild(year);
        cardBack.appendChild(pages);
        cardBack.appendChild(readLabel);
        cardBack.appendChild(removeBtn);
        bookBox.appendChild(bookCard);
    });
}

let addBtn = document.querySelector(".add-btn");
let submitBtn = document.querySelector(".submit-btn");
let modal = document.querySelector(".modal");

addBtn.addEventListener("click", () => {
    modal.showModal();
});

submitBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const years = document.getElementById("years").value;
    const read = document.getElementById("read").checked;
    let book = new Book(title, author, pages, years, read);
    if (
        book.title !== "" &&
        book.author !== "" &&
        book.pages !== "" &&
        book.year !== ""
    ) {
        myLibrary.push(book);
        document.getElementById("book").reset();
        clearBooks();
        displayBooks();
        modal.close();
    } else {
        alert("Please enter all details of book correctly.");
    }
});

displayBooks();
