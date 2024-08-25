import React from "react";
import noThumbnailImage from "../icons/no_cover_image.png";
import PropTypes from "prop-types";

const Book = ({ book, onChangeBookShelf }) => {
  const shelves = [
    {
      id: 1,
      value: "currentlyReading",
      text: "Currently Reading"
    },
    {
      id: 2,
      value: "wantToRead",
      text: "Want to Read"
    },
    {
      id: 3,
      value: "read",
      text: "Read"
    },
    {
      id: 4,
      value: "none",
      text: "None"
    },
  ];

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : noThumbnailImage
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(event) => onChangeBookShelf(book, event.target.value)}
              value={book.shelf ? book.shelf : "none"}
            >
              <option value="moveTo" disabled>
                Move to...
              </option>
              {shelves.map(item => (
                <option value={item.value} key={item.id}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title ? book.title : null}</div>
        {book.authors &&
          book.authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))}
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
};

export default Book;
