"use client";
import BookStatus from "./BookStatus";
import BookForm from "./BookForm";
import ConfirmDialog from "./ConfirmDialog";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { updateBookDetails, deleteBook } from "../store/slices/bookSlice";

const BookRow = ({ book, onReject, onDelete, onApprove }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleRejectClick = () => {
    setShowRejectDialog(true);
  };

  const handleConfirmReject = () => {
    setShowRejectDialog(false);
    onReject(book.id);
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
          <div className="">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Actions
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-black/5 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    Archive
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
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
          onConfirm={handleConfirmReject}
          title="Confirm Reject"
          message="Are you sure you want to reject this book request?"
        />
      )}
    </>
  );
};

export default BookRow;
