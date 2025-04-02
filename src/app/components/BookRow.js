import BookStatus from "./BookStatus";
import BookForm from "./BookForm";
import ConfirmDialog from "./ConfirmDialog";
import {
  Menu,
  Transition,
  MenuItem,
  MenuItems,
  MenuButton,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { DIALOG_MESSAGES } from "../constants/bookConstants";

const BookRow = ({
  book,
  isEditing,
  editingBook,
  onEdit,
  onReject,
  onDelete,
  onUpdateBook,
  onCancelEdit,
  onApprove,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleDeleteClick = () => setShowDeleteDialog(true);
  const handleRejectClick = () => setShowRejectDialog(true);

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete(book.id);
  };

  const handleConfirmReject = () => {
    setShowRejectDialog(false);
    onReject(book.id);
  };

  if (isEditing && editingBook?.id === book.id) {
    return (
      <tr key={book.id} className="hover:bg-gray-50">
        <BookForm
          book={editingBook}
          onUpdate={onEdit}
          onCancel={onCancelEdit}
          onUpdateBook={onUpdateBook}
          isEditing={isEditing}
        />
      </tr>
    );
  }

  return (
    <>
      <tr key={book.id} className="hover:bg-gray-50">
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
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <BookActionsMenu
            book={book}
            onEdit={onEdit}
            onApprove={onApprove}
            onReject={handleRejectClick}
            onDelete={handleDeleteClick}
          />
        </td>
      </tr>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title={DIALOG_MESSAGES.DELETE.title}
        message={DIALOG_MESSAGES.DELETE.message}
      />

      <ConfirmDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={handleConfirmReject}
        title={DIALOG_MESSAGES.REJECT.title}
        message={DIALOG_MESSAGES.REJECT.message}
      />
    </>
  );
};

const BookActionsMenu = ({ book, onEdit, onApprove, onReject, onDelete }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <MenuButton className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Actions
      </MenuButton>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-1 py-1">
          <MenuItem
            as="button"
            onClick={() => onEdit(book)}
            className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-500 hover:text-white text-gray-900"
          >
            Edit
          </MenuItem>
          {book.userIsBorrowedStatus === "pending" && onApprove && (
            <MenuItem
              as="button"
              onClick={() => onApprove(book.id)}
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-green-500 hover:text-white text-gray-900"
            >
              Approve
            </MenuItem>
          )}
          {book.userIsBorrowedStatus !== "available" && (
            <MenuItem
              as="button"
              onClick={onReject}
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-red-500 hover:text-white text-gray-900"
            >
              Reject
            </MenuItem>
          )}
          <MenuItem
            as="button"
            onClick={onDelete}
            className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-red-500 hover:text-white text-gray-900"
          >
            Delete
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
);

export default BookRow;
