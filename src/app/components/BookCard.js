import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { updateBorrowStatus } from "@/app/store/slices/bookSlice";
import ConfirmDialog from "./ConfirmDialog";
import { BOOK_STATUS, DIALOG_MESSAGES } from "../constants/bookConstants";
import {
  getStatusColor,
  getButtonText,
  capitalizeFirstLetter,
} from "../utils/bookUtils";

function BookCard({ book, key }) {
  const dispatch = useDispatch();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleStatusChange = () => {
    if (book.userIsBorrowedStatus === BOOK_STATUS.AVAILABLE) {
      dispatch(
        updateBorrowStatus({ id: book.id, status: BOOK_STATUS.PENDING })
      );
      return;
    }

    if (book.userIsBorrowedStatus === BOOK_STATUS.PENDING) {
      setDialogConfig({
        title: DIALOG_MESSAGES.CANCEL_REQUEST.title,
        message: DIALOG_MESSAGES.CANCEL_REQUEST.message,
        onConfirm: () => {
          dispatch(
            updateBorrowStatus({ id: book.id, status: BOOK_STATUS.AVAILABLE })
          );
          setShowConfirmDialog(false);
        },
      });
      setShowConfirmDialog(true);
      return;
    }

    if (book.userIsBorrowedStatus === BOOK_STATUS.BORROWED) {
      setDialogConfig({
        title: DIALOG_MESSAGES.RETURN.title,
        message: DIALOG_MESSAGES.RETURN.message,
        onConfirm: () => {
          dispatch(
            updateBorrowStatus({ id: book.id, status: BOOK_STATUS.AVAILABLE })
          );
          setShowConfirmDialog(false);
        },
      });
      setShowConfirmDialog(true);
    }
  };

  console.log(book.title);

  return (
    <>
      <div
        key={key}
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
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                book?.userIsBorrowedStatus
              )}`}
            >
              {capitalizeFirstLetter(book?.userIsBorrowedStatus)}
            </span>
            <button
              onClick={handleStatusChange}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              {getButtonText(book?.userIsBorrowedStatus)}
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
