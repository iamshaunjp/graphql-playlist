/** @format */

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CREATE_BOOK, GET_AUTHORS, GET_BOOKS } from "../queries/queries";

const AddBook = () => {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [
    addBookMtd,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useMutation(CREATE_BOOK, {
    variables: {
      ...state,
    },

    /** Using refetchQueries */

    // refetchQueries: [
    //   GET_BOOKS, // DocumentNode object parsed with gql
    //   "books", // Query name
    // ],

    /** Using cache.modify */

    update(cache, { data: { addBook } }) {
      cache.modify({
        fields: {
          books(existingBooks) {
            const newBookRef = cache.writeFragment({
              data: addBook,
              // NewBook on Book random names for both
              fragment: gql`
                fragment NewBook on Book {
                  id
                  name
                  genre
                  author {
                    name
                    books{
                        id
                        name
                    }
                  }
                }
              `,
            });
            return [...existingBooks, newBookRef];
          },
        },
      });
    },
  });

  const submit = (e) => {
    e.preventDefault();
    addBookMtd();
    setState({ name: "", genre: "", authorId: "" });
  };
  console.log(loading);
  if (loading) return <p>Loading Authors...</p>;
  if (error) return <p>Error :( {error.message}</p>;
  if (mutateLoading) return <p>Submitting...</p>;
  if (mutateError) return <p>Error Submitting :( {error.message}</p>;

  return (
    <form id="add-book" onSubmit={submit}>
      <div className="field">
        <label>Book name:</label>
        <input
          required
          type="text"
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          required
          type="text"
          onChange={(e) => setState({ ...state, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          required
          onChange={(e) => setState({ ...state, authorId: e.target.value })}
        >
          <option>Select Author</option>
          {data.authors.map((author) => (
            <option value={author.id} key={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
