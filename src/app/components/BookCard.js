import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { updateBorrowStatus } from "@/app/store/slices/bookSlice";
import ConfirmDialog from "./ConfirmDialog";

function BookCard({ book }) {
  const dispatch = useDispatch();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleStatusChange = () => {
    if (book.userIsBorrowedStatus === "available") {
      // For requesting to borrow, no confirmation needed
      dispatch(updateBorrowStatus({ id: book.id, status: "pending" }));
    }
    if (book.userIsBorrowedStatus === "pending") {
      // For canceling request
      setDialogConfig({
        title: "Cancel Request",
        message:
          "Are you sure you want to cancel your request to borrow this book?",
        onConfirm: () => {
          dispatch(updateBorrowStatus({ id: book.id, status: "available" }));
          setShowConfirmDialog(false);
        },
      });
      setShowConfirmDialog(true);
    }
    if (book.userIsBorrowedStatus === "borrowed") {
      // For returning book
      setDialogConfig({
        title: "Return Book",
        message: "Are you sure you want to return this book?",
        onConfirm: () => {
          dispatch(updateBorrowStatus({ id: book.id, status: "available" }));
          setShowConfirmDialog(false);
        },
      });
      setShowConfirmDialog(true);
    }
  };

  const statusColors = {
    available: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    borrowed: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  const buttonTexts = {
    available: "Request to Borrow",
    pending: "Cancel Request",
    borrowed: "Return Book",
    default: "Change Status",
  };

  const getStatusColor = () =>
    statusColors[book.userIsBorrowedStatus] || statusColors.default;

  const getButtonText = () =>
    buttonTexts[book.userIsBorrowedStatus] || buttonTexts.default;

  console.log(book.title);

  return (
    <>
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
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
            >
              {book?.userIsBorrowedStatus.charAt(0).toUpperCase() +
                book?.userIsBorrowedStatus.slice(1)}
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

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={dialogConfig.onConfirm}
        title={dialogConfig.title}
        message={dialogConfig.message}
      />
    </>
  );
}

export default memo(BookCard);
