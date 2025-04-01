import BookStatus from './BookStatus';

const BookForm = ({ book, onUpdate, onCancel, isEditing }) => (
  <>
    <td className="px-6 py-4 whitespace-nowrap">
      <input
        type="text"
        value={book.title}
        onChange={(e) => onUpdate({ ...book, title: e.target.value })}
        className="px-2 py-1 border rounded"
      />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <input
        type="text"
        value={book.author}
        onChange={(e) => onUpdate({ ...book, author: e.target.value })}
        className="px-2 py-1 border rounded"
      />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <input
        type="text"
        value={book.genre}
        onChange={(e) => onUpdate({ ...book, genre: e.target.value })}
        className="px-2 py-1 border rounded"
      />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <BookStatus status={book.userIsBorrowedStatus} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex space-x-2">
        <button
          onClick={onUpdate}
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

export default BookForm; 