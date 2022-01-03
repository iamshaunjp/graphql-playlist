/** @format */

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book, idx) => (
          <li key={idx} onClick={() => setSelectedBook(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default BookList;
