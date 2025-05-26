const [searchTerm, setSearchTerm] = useState("");
<input
  type="text"
  placeholder="Search books..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
const filteredBooks = books.filter((book) =>
  book.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

{loading ? (
    <Spinner />
  ) : showType === "table" ? (
    <BooksTable books={filteredBooks} />
  ) : (
    <BooksCard books={filteredBooks} />
  )}
  