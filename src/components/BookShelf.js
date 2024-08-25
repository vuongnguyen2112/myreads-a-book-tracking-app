import React, { useEffect, useState } from "react";
import ShelfCompartment from "./ShelfCompartment";
import AddBook from "./AddBook";
import * as BooksAPI from "../BooksAPI";

const BookShelf = () => {
  const compartments = [
    { type: "currentlyReading", title: "Currently Reading" },
    { type: "wantToRead", title: "Want to Read" },
    { type: "read", title: "Read" },
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
    // eslint-disable-next-line
  }, []);

  const onChangeBookShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((result) => {
      book.shelf = newShelf;
      let updatedBooks = books.filter(
        (resultBook) => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      setBooks(updatedBooks);
    });
  };

  return (
    <div>
      <div className="list-books-content">
        {books.length > 0 && (
          <div>
            {compartments.map((compartment, index) => {
              const compartmentBooks = books.filter(
                (book) => book.shelf === compartment.type
              );
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{compartment.title}</h2>
                  <ShelfCompartment
                    key={index}
                    books={compartmentBooks}
                    onChangeBookShelf={onChangeBookShelf}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AddBook />
    </div>
  );
};

export default BookShelf;
