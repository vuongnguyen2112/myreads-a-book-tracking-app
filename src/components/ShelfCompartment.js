import React from "react";
import Book from "./Book";

const ShelfCompartment = ({ compartmentIndex, books, onChangeBookShelf }) => {
  return (
    <div>
      <div className="bookshelf-books" key={compartmentIndex}>
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onChangeBookShelf={onChangeBookShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ShelfCompartment;
