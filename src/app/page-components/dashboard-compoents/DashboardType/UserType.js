import React from "react";

function UserType({ books }) {
  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title}:{book.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserType;
