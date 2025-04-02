import { BOOK_STATUS } from '../constants/bookConstants';

export const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Literature",
    userIsBorrowedStatus: BOOK_STATUS.AVAILABLE,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    userIsBorrowedStatus: BOOK_STATUS.BORROWED,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Literature",
    userIsBorrowedStatus: BOOK_STATUS.AVAILABLE,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    userIsBorrowedStatus: BOOK_STATUS.PENDING,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    userIsBorrowedStatus: BOOK_STATUS.AVAILABLE,
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    userIsBorrowedStatus: BOOK_STATUS.BORROWED,
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming of Age",
    userIsBorrowedStatus: BOOK_STATUS.AVAILABLE,
  },
  {
    id: 8,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    userIsBorrowedStatus: BOOK_STATUS.PENDING,
  },
  {
    id: 9,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science Fiction",
    userIsBorrowedStatus: BOOK_STATUS.AVAILABLE,
  },
  {
    id: 10,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical Fiction",
    userIsBorrowedStatus: BOOK_STATUS.BORROWED,
  },
]; 