/** @format */

import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      age
    }
  }
`;

const GET_BOOK = gql`
  query GetBooks($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const CREATE_BOOK = gql`
  mutation AddTodo($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export { GET_BOOKS, GET_AUTHORS, CREATE_BOOK, GET_BOOK };
