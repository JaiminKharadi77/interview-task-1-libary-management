// Filter books by status and search query
export const filterBooks = (books, status, searchQuery) => {
  return books.filter((book) => {
    const matchesStatus = status && book.userIsBorrowedStatus === status;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });
};
