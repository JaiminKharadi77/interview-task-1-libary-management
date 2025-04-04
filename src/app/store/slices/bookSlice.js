import { createSlice } from "@reduxjs/toolkit";
import { initialBooks } from "../../data/initialBooks";
import { BOOK_STATUS } from "../../constants/bookConstants";
import { generateBookId } from "../../utils/bookUtils";

const initialState = {
  books: initialBooks,
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
      console.log("action payload", id, updatedBook);
      const index = state.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook };
      }
    },

    // Add a new book
    addBook: (state, action) => {
      const newBook = {
        id: generateBookId(state.books),
        ...action.payload,
        userIsBorrowedStatus: BOOK_STATUS.AVAILABLE,
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
      const book = state.books.find((book) => book.id === id);
      if (book) {
        book.userIsBorrowedStatus = status;
      }
    },
  },
});

export const { deleteBook, updateBookDetails, addBook, updateBorrowStatus } =
  bookSlice.actions;
export default bookSlice.reducer;
