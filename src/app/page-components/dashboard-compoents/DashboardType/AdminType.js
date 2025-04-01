import React, { useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import { useDispatch } from "react-redux";
import {
  updateBorrowStatus,
  deleteBook,
  updateBookDetails,
  addBook,
} from "@/app/store/slices/bookSlice";

function AdminType({ books }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const dispatch = useDispatch();

  const filteredBooks = books.filter((book) => {
    return (
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRejectRequest = (bookId) => {
    dispatch(updateBorrowStatus({ id: bookId, status: "available" }));
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(bookId));
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsEditing(true);
  };

  const handleUpdateBook = () => {
    dispatch(
      updateBookDetails({ id: editingBook.id, updatedBook: editingBook })
    );
    setIsEditing(false);
    setEditingBook(null);
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.genre) {
      dispatch(addBook(newBook));
      setNewBook({ title: "", author: "", genre: "" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showAddForm ? "Cancel" : "Add New Book"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Book</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Genre"
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleAddBook}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Book
          </button>
        </div>
      )}

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search books by title, author, or genre..."
        resultCount={filteredBooks.length}
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing && editingBook?.id === book.id ? (
                    <input
                      type="text"
                      value={editingBook.title}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          title: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">
                      {book.title}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing && editingBook?.id === book.id ? (
                    <input
                      type="text"
                      value={editingBook.author}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          author: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{book.author}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing && editingBook?.id === book.id ? (
                    <input
                      type="text"
                      value={editingBook.genre}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          genre: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{book.genre}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      book.userIsBorrowedStatus === "available"
                        ? "bg-green-100 text-green-800"
                        : book.userIsBorrowedStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.userIsBorrowedStatus.charAt(0).toUpperCase() +
                      book.userIsBorrowedStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {isEditing && editingBook?.id === book.id ? (
                      <>
                        <button
                          onClick={handleUpdateBook}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditingBook(null);
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditBook(book)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        {book.userIsBorrowedStatus === "pending" && (
                          <button
                            onClick={() => handleRejectRequest(book.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminType;
