import Book from "./book";

interface BookListResponse {
  docs: Book[];
  numFound: number;
}

export default BookListResponse;
