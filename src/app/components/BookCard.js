import React from "react";
import { useDispatch } from "react-redux";
import { updateBorrowStatus } from "@/app/store/slices/bookSlice";

function BookCard({ book }) {
  const dispatch = useDispatch();

  const handleStatusChange = () => {
    const newStatus = book.userIsBorrowedStatus === "available" ? "pending" : "available";
    dispatch(updateBorrowStatus({ id: book.id, status: newStatus }));
  };

  const getStatusColor = () => {
    switch (book.userIsBorrowedStatus) {
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "borrowed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getButtonText = () => {
    switch (book.userIsBorrowedStatus) {
      case "available":
        return "Request to Borrow";
      case "pending":
        return "Cancel Request";
      case "borrowed":
        return "Return Book";
      default:
        return "Change Status";
    }
  };

  return (
    <div
      key={book?.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {book?.title}
        </h3>
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {book?.genre}
          </span>
        </div>
        {book?.author && (
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Author:</span> {book?.author}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {book?.userIsBorrowedStatus.charAt(0).toUpperCase() + book?.userIsBorrowedStatus.slice(1)}
          </span>
          <button
            onClick={handleStatusChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
