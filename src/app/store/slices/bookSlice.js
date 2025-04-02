import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Literature",
      userIsBorrowedStatus: "available",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      userIsBorrowedStatus: "borrowed",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic Literature",
      userIsBorrowedStatus: "available",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      userIsBorrowedStatus: "pending",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      userIsBorrowedStatus: "available",
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      userIsBorrowedStatus: "borrowed",
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming of Age",
      userIsBorrowedStatus: "available",
    },
    {
      id: 8,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      userIsBorrowedStatus: "pending",
    },
    {
      id: 9,
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      userIsBorrowedStatus: "available",
    },
    {
      id: 10,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Philosophical Fiction",
      userIsBorrowedStatus: "borrowed",
    },
  ],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Delete a book
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },

    // Update book details
    updateBookDetails: (state, action) => {
      const { id, updatedBook } = action.payload;
      const index = state.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook };
      }
    },

    // Add a new book
    addBook: (state, action) => {
      const newBook = {
        id: state.books.length + 1,
        ...action.payload,
        userIsBorrowedStatus: "available",
      };
      state.books.push(newBook);
    },

    // Update an existing book
    updateBook: (state, action) => {
      const { id, updatedBook } = action.payload;
      const index = state.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook };
      }
    },

    // Update book borrowing status
    updateBorrowStatus: (state, action) => {
      const { id, status } = action.payload;
      state.books = state.books.map((book) =>
        book.id === id ? { ...book, userIsBorrowedStatus: status } : book
      );
    },
  },
});

export const { addBook, updateBookDetails, deleteBook, updateBorrowStatus } =
  bookSlice.actions;
export default bookSlice.reducer;
