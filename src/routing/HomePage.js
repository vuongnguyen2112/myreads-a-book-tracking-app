import React from "react";
import BookShelf from "../components/BookShelf";

const HomePage = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <BookShelf />
    </div>
  );
};

export default HomePage;
