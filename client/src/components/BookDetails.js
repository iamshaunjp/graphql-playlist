/** @format */

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data, refetch } = useQuery(GET_BOOK, {
    variables: {
      id: `${bookId}`,
    },
  });

  if (loading) return <p>Loading Book Details...</p>;
  if (error) return <p>No book Selected</p>;
  const book = data.book;
  refetch()
  return (
    <div id="book-details">
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>All books by author:</p>
      <ul className="other-books">
        {book.author.books.map((item, idx) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p></p>
    </div>
  );
};

export default BookDetails;
