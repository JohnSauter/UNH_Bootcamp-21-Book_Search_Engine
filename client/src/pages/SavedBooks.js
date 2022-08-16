import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_DELETE_BOOK } from "../utils/mutations";
import { QUERY_GET_SINGLE_USER } from "../utils/queries";

import Auth from "../utils/auth";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  /* Define a function which deletes a book, given its ID.  */
  const [deleteBook] = useMutation(MUTATION_DELETE_BOOK, {
    refetchQueries: [{ query: QUERY_GET_SINGLE_USER }],
  });

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  /* Fetch the user's current list of saved books.  */
  const querying = useQuery(QUERY_GET_SINGLE_USER);

  // if the data isn't here yet, say so.
  if (querying.loading) {
    return <h2>Loading...</h2>;
  }

  if (querying.error) {
    return (
      <div>
        <h3>Error loading user data</h3>
        <h3>{querying?.user_error.message}</h3>
      </div>
    );
  }

  const userData = querying.data.getSingleUser;

  // create a function that accepts the book's mongo _id value as
  // param and deletes the book from the database
  const handleDeleteBook = async (deleted_bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { updated_user_data } = await deleteBook({
        variables: { unique_id: deleted_bookId },
      });
      console.log(updated_user_data);

      // Upon success, remove the book's id from localStorage.
      removeBookId(deleted_bookId);

      /* Also delete it from from our local list,
       * which will cause this component to be refreshed.
       */
      const new_book_ids = savedBookIds.filter(
        (bookId) => bookId !== deleted_bookId
      );
      setSavedBookIds(new_book_ids);
    } catch (err) {
      console.error(err);
    }
  };

  /* Present the list of books.  */
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book._id} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <p>
                    <a href={book.previewLink} rel="noreferrer" target="_blank">
                      Google preview
                    </a>
                  </p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.unique_id)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
