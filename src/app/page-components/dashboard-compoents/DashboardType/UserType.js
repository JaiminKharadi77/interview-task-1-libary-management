import React, { useState } from "react";
import BookCard from "@/app/components/BookCard";
import SearchBar from "@/app/components/SearchBar";
import { filterBooks } from "@/app/components/filterBooks";

function UserType({ books }) {
  const [searchQuery, setSearchQuery] = useState("");

  const availableBooks = filterBooks(books, "available", searchQuery);
  const pendingBooks = filterBooks(books, "pending", searchQuery);
  const borrowedBooks = filterBooks(books, "borrowed", searchQuery);

  const totalResults =
    availableBooks.length + pendingBooks.length + borrowedBooks.length;

  const BookSection = ({ title, books, statusColor }) => (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${statusColor}`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length === 0 && (
          <p className="text-gray-500">No books available in this section.</p>
        )}
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by title, author, or genre..."
        resultCount={totalResults}
      />

      {/* Book Sections */}
      {totalResults === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <>
          <BookSection
            title="Borrowed Books"
            books={borrowedBooks}
            statusColor="text-red-600"
          />
          <BookSection
            title="Available Books"
            books={availableBooks}
            statusColor="text-green-600"
          />
          <BookSection
            title="Pending Books"
            books={pendingBooks}
            statusColor="text-yellow-600"
          />
        </>
      )}
    </div>
  );
}

export default UserType;
