/** @format */

import React from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { gql, InMemoryCache } from "@apollo/client";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo client setup

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook/>
      </div>
    </ApolloProvider>
  );
};

export default App;
