"use client";
import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  updateBookDetails,
  deleteBook,
  updateBorrowStatus,
} from "../store/slices/bookSlice";
import BookForm from "./BookForm";
import BookStatus from "./BookStatus";
import ConfirmDialog from "./ConfirmDialog";
import { BOOK_STATUS } from "../constants/bookConstants";

const BookRow = ({ book }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBook(book.id));
    setShowDeleteDialog(false);
  };

  if (isEditing) {
    return (
      <tr className="hover:bg-gray-50">
        <BookForm
          book={book}
          onUpdate={(id, book) => {
            dispatch(updateBookDetails({ id, updatedBook: book }));
          }}
          onCancel={() => setIsEditing(false)}
        />
      </tr>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const toggleStatusUpdate = (status) => {
    dispatch(updateBorrowStatus({ id: book.id, status: status }));
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{book.title}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{book.author}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{book.genre}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <BookStatus status={book.userIsBorrowedStatus} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap relative">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Actions
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-1 py-1">
                <MenuItem
                  as="button"
                  onClick={() => setIsEditing(true)}
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-500 hover:text-white text-gray-900"
                >
                  Edit
                </MenuItem>
                {book.userIsBorrowedStatus === BOOK_STATUS.PENDING &&
                  user.role === "librarian" && (
                    <MenuItem
                      as="button"
                      onClick={() => toggleStatusUpdate(BOOK_STATUS.BORROWED)}
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-green-500 hover:text-white text-gray-900"
                    >
                      Approve
                    </MenuItem>
                  )}
                {book.userIsBorrowedStatus !== BOOK_STATUS.AVAILABLE && (
                  <MenuItem
                    as="button"
                    onClick={() => setShowRejectDialog(true)}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-red-500 hover:text-white text-gray-900"
                  >
                    Reject
                  </MenuItem>
                )}
                <MenuItem
                  as="button"
                  onClick={handleDeleteClick}
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-red-500 hover:text-white text-gray-900"
                >
                  Delete
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </td>
      </tr>

      {showDeleteDialog && (
        <ConfirmDialog
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this book? This action cannot be undone."
        />
      )}
      {showRejectDialog && (
        <ConfirmDialog
          onClose={() => setShowRejectDialog(false)}
          onConfirm={() => {
            toggleStatusUpdate(BOOK_STATUS.AVAILABLE);
            setShowRejectDialog(false);
          }}
          title="Confirm Reject"
          message="Are you sure you want to reject this book request?"
        />
      )}
    </>
  );
};

export default memo(BookRow);
