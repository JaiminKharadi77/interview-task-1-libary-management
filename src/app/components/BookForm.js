"use client";
import { useState } from "react";
import BookStatus from "./BookStatus";

const BookForm = ({ book, onUpdate, onCancel }) => {
  const [editBook, setEditBook] = useState({
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    id: book.id,
    userIsBorrowedStatus: book.userIsBorrowedStatus,
  });

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={editBook.title}
          onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
          className="px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={editBook.author}
          onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
          className="px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={editBook.genre}
          onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
          className="px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BookStatus status={book.userIsBorrowedStatus} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              onUpdate(editBook.id, editBook);
              setEditBook({
                title: "",
                author: "",
                genre: "",
              });
              onCancel();
            }}
            className="text-green-600 hover:text-green-900"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </td>
    </>
  );
};

export default BookForm;
