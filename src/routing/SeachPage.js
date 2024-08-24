import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";
import NotFound from "./NotFound";

class SearchPage extends Component {
  state = {
    books: [],
    searchResult: [],
    hasError: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((resultBooks) => {
      this.setState({
        books: resultBooks,
      });
    });
  }

  onSearch = (event) => {
    const searchQuery = event.target.value;
    if (searchQuery) {
      BooksAPI.search(searchQuery).then((resultBooks) => {
        if (!resultBooks || resultBooks.hasOwnProperty("error")) {
          this.setState({ searchResult: [], hasError: true });
        } else {
          this.setState({ searchResult: resultBooks, hasError: false });
          this.syncBookShelf();
        }
      });
    } else {
      this.setState({ searchResult: [] });
    }
  };

  syncBookShelf = () => {
    const books = this.state.books;
    const searchResult = this.state.searchResult;
    if (searchResult.length > 0) {
      books.forEach((book) => {
        searchResult.forEach((searchResultBook) => {
          if (book.id === searchResultBook.id) {
            searchResultBook.shelf = book.shelf;
          }
        });
      });
    }
    this.setState({ searchResult: searchResult });
  };

  onChangeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      var updatedBooks = this.state.books.filter(
        (resultBook) => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      this.setState({ books: updatedBooks });
    });
  };

  render() {
    const {searchResult} = this.state;
    const {hasError} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={e => this.onSearch(e)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {searchResult.length > 0 && (
            <div>
              <div>
                <h3>Search Returned {searchResult.length} books</h3>
              </div>
              <ol className="books-grid">
                {searchResult.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    onChangeBookShelf={this.onChangeBookShelf}
                  />
                ))}
              </ol>
            </div>
          )}
          {hasError && <NotFound />}
        </div>
      </div>
    );
  }
}

export default SearchPage;
