import { BOOK_STATUS } from "../constants/bookConstants";

const BookStatus = ({ status }) => {
  const statusStyles = {
    [BOOK_STATUS.AVAILABLE]: "bg-green-100 text-green-800",
    [BOOK_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
    [BOOK_STATUS.BORROWED]: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        statusStyles[status] || statusStyles[BOOK_STATUS.AVAILABLE]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default BookStatus; 