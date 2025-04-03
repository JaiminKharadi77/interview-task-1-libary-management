import React, { useState } from "react";
import BookCard from "@/app/components/BookCard";
import SearchBar from "@/app/components/SearchBar";
import { filterBooks } from "@/app/components/filterBooks";

const BookSection = ({ title, books, color, searchQuery }) => (
  <div className="mb-12">
    <h2 className={`text-2xl font-bold mb-6 text-${color}-500`}>
      {title}
    </h2>
    {books.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          {`No ${title.toLowerCase()} found${
            searchQuery ? ` matching "${searchQuery}"` : ""
          }`}
        </p>
      </div>
    )}
  </div>
);

function UserType({ books }) {
  const [searchQuery, setSearchQuery] = useState("");

  const bookCategories = [
    {
      title: "Borrowed Books",
      type: "borrowed",
      color: "red",
    },
    {
      title: "Available Books",
      type: "available",
      color: "green",
    },
    {
      title: "Pending Books",
      type: "pending",
      color: "yellow",
    },
  ];

  const filteredBooks = bookCategories.reduce((acc, category) => {
    acc[category.type] = filterBooks(books, category.type, searchQuery);
    return acc;
  }, {});

  const totalResults = Object.values(filteredBooks).reduce(
    (sum, books) => sum + books.length,
    0
  );

  return (
    <div className="p-6">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by title, author, or genre..."
        resultCount={totalResults}
      />
      {bookCategories.map((category) => (
        <BookSection
          key={category.type}
          title={category.title}
          books={filteredBooks[category.type]}
          color={category.color}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

export default UserType;
