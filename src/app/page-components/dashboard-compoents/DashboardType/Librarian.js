import React, { useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import { useDispatch } from "react-redux";
import {
  updateBorrowStatus,
  deleteBook,
  updateBookDetails,
  addBook,
} from "@/app/store/slices/bookSlice";
import AddBookForm from "@/app/components/AddBookForm";
import BookRow from "@/app/components/BookRow";

function LibrarianType({ books }) {
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

  const handleApproveRequest = (bookId) => {
    dispatch(updateBorrowStatus({ id: bookId, status: "borrowed" }));
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

  const handleCancelEdit = () => {
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

  const handleUpdateNewBook = (updatedBook) => {
    setNewBook(updatedBook);
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
        <AddBookForm
          newBook={newBook}
          onAddBook={handleAddBook}
          onUpdateNewBook={handleUpdateNewBook}
          onCancel={() => setShowAddForm(false)}
        />
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
              <BookRow
                key={book.id}
                book={book}
                isEditing={isEditing}
                editingBook={editingBook}
                onEdit={handleEditBook}
                onReject={handleRejectRequest}
                onApprove={handleApproveRequest}
                onDelete={handleDeleteBook}
                onUpdateBook={handleUpdateBook}
                onCancelEdit={handleCancelEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LibrarianType;
