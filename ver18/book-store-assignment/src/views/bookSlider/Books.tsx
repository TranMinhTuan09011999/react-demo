import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import Pagination from "../pagination/Pagination";
import API from "../../libs/api";
import BookSearchParams from "../../model/book-search-params";
import Book from "../../model/book";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(0);

  // For the pagination
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const incrementPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const decrementPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if (page - 1 === 0) {
      return null;
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      const params: BookSearchParams = {
        q: "subject:love",
        page: page,
        limit: pageSize,
      };
      const response = await API.app.getAllBooks(params);
      setBooks([...response.docs]);
      getTotalPages(response.numFound, pageSize);
    };
    getBooks();
  }, [page, pageSize]);

  const getTotalPages = (itemSize: number, pageSize: number) => {
    console.log(Math.ceil(itemSize / pageSize));
    setTotalPages(Math.ceil(itemSize / pageSize));
  };

  const formatImageUrl = (cover_i: number) => {
    return "https://covers.openlibrary.org/b/id/" + cover_i + "-L.jpg";
  };

  return (
    <>
      <div className="mt-14 mb-12">
        <div className="container">
          {/* header */}
          <div className="flex">
            <div></div>
            <div className="text-center mb-10 max-w-[600px] mx-auto">
              <h1 className="text-3xl font-bold">Book List For You</h1>
            </div>
          </div>
          {/* Body section */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {/* Card */}
              {books.map((data) => (
                <div key={data.key} className="div space-y-3">
                  <img
                    src={formatImageUrl(data.cover_i)}
                    alt=""
                    className="h-[220px] w-[150px] object-cover rounded-md "
                  />
                  <div>
                    <h3 className="font-semibold">{data.title}</h3>
                    <p className="text-sm">
                      by <span className="font-bold">{data.author_name}</span>
                    </p>
                    <p className="text-sm font-bold">
                      {data.first_publish_year}
                    </p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>{}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              page={page}
              changePage={changePage}
              incrementPage={incrementPage}
              decrementPage={decrementPage}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;