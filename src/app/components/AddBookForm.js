const AddBookForm = ({ newBook, onAddBook, onUpdateNewBook, onCancel }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-6">
    <h3 className="text-lg font-semibold mb-4">Add New Book</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={(e) => onUpdateNewBook({ ...newBook, title: e.target.value })}
        className="px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={(e) =>
          onUpdateNewBook({ ...newBook, author: e.target.value })
        }
        className="px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Genre"
        value={newBook.genre}
        onChange={(e) => onUpdateNewBook({ ...newBook, genre: e.target.value })}
        className="px-3 py-2 border rounded-md"
      />
    </div>
    <div className="flex space-x-2 mt-4">
      <button
        onClick={onAddBook}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add Book
      </button>
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default AddBookForm; 