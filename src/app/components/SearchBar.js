import React from "react";

function SearchBar({ searchQuery, setSearchQuery, placeholder, resultCount }) {
  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {searchQuery && resultCount !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Showing {resultCount} results
        </p>
      )}
    </div>
  );
}

export default SearchBar; 