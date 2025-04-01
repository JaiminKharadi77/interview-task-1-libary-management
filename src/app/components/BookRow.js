import BookStatus from "./BookStatus";
import BookForm from "./BookForm";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Actions
            </Menu.Button>
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
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onEdit(book)}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                {book.userIsBorrowedStatus === "pending" && onApprove && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onApprove(book.id)}
                          className={`${
                            active ? "bg-green-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Approve
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onReject(book.id)}
                          className={`${
                            active ? "bg-red-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Reject
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onDelete(book.id)}
                      className={`${
                        active ? "bg-red-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </td>
    </tr>
  );
};

export default BookRow;
