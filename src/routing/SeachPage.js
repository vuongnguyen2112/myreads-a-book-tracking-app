import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";
import NotFound from "../components/NotFound";

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [hasError, setHasError] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((resultBooks) => {
      setBooks(resultBooks);
    });
  }, []);

  useEffect(() => {
    try {
      if (query) {
        BooksAPI.search(query).then((resultBooks) => {
          if (!resultBooks || resultBooks.hasOwnProperty("error")) {
            setSearchResult([]);
            setHasError(true);
          } else {
            setSearchResult(resultBooks);
            setHasError(false);
            syncBookShelf();
          }
        });
      }
    } catch (error) {
      setSearchResult([]);
      setHasError(true);
    }
    // eslint-disable-next-line
  }, [query]);

  const onSearch = (event) => {
    setQuery(event.target.value);
  };

  const syncBookShelf = () => {
    if (searchResult.length > 0) {
      books.forEach((book) => {
        searchResult.forEach((searchResultBook) => {
          if (book.id === searchResultBook.id) {
            searchResultBook.shelf = book.shelf;
          }
        });
      });
      setSearchResult(searchResult);
    }
  };

  const onChangeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      var updatedBooks = books?.filter(
        (resultBook) => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      setBooks(updatedBooks);
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search"></Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => onSearch(e)}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResult?.length > 0 && (
          <div>
            <div>
              <h3>Search Returned {searchResult?.length} books</h3>
            </div>
            <ol className="books-grid">
              {searchResult?.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onChangeBookShelf={(book, shelf) =>
                    onChangeBookShelf(book, shelf)
                  }
                />
              ))}
            </ol>
          </div>
        )}
        {hasError && <NotFound />}
      </div>
    </div>
  );
};

export default SearchPage;
