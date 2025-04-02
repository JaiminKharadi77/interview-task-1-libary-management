export const BOOK_STATUS = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  BORROWED: 'borrowed',
};

export const STATUS_COLORS = {
  [BOOK_STATUS.AVAILABLE]: 'bg-green-100 text-green-800',
  [BOOK_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [BOOK_STATUS.BORROWED]: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
};

export const BUTTON_TEXTS = {
  [BOOK_STATUS.AVAILABLE]: 'Request to Borrow',
  [BOOK_STATUS.PENDING]: 'Cancel Request',
  [BOOK_STATUS.BORROWED]: 'Return Book',
  default: 'Change Status',
};

export const DIALOG_MESSAGES = {
  DELETE: {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this book? This action cannot be undone.',
  },
  REJECT: {
    title: 'Confirm Reject',
    message: 'Are you sure you want to reject this book request?',
  },
  CANCEL_REQUEST: {
    title: 'Cancel Request',
    message: 'Are you sure you want to cancel your request to borrow this book?',
  },
  RETURN: {
    title: 'Return Book',
    message: 'Are you sure you want to return this book?',
  },
}; 