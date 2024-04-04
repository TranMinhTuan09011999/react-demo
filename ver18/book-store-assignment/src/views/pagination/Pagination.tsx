import React from "react";

interface SettingsPaginatedNumbersProps {
  totalPages: number;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
  page: number;
  changePage: (pageNumber: number) => void;
}

const PaginatedNumbers = ({
  totalPages,
  maxPageNumberLimit,
  minPageNumberLimit,
  page,
  changePage,
}: SettingsPaginatedNumbersProps) => {
  return Array.from({ length: totalPages }, (num, index) => {
    if (index < maxPageNumberLimit + 1 && index > minPageNumberLimit)
      return (
        <li>
          <a
            onClick={() => changePage(index)}
            className={`border border-gray-300 ${
              page === index
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                : "bg-white text-gray-500 hover:bg-gray-100 leading-tight"
            } py-2 px-3`}
          >
            {index}
          </a>
        </li>
      );
    else {
      return null;
    }
  });
};

interface SettingsPaginationProps {
  totalPages: number;
  page: number;
  changePage: (pageNumber: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  minPageNumberLimit: number;
  maxPageNumberLimit: number;
}

const Pagination = ({
  totalPages,
  page,
  changePage,
  incrementPage,
  decrementPage,
  minPageNumberLimit,
  maxPageNumberLimit,
}: SettingsPaginationProps) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl mx-auto mt-10">
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              onClick={() => decrementPage()}
              className={`${page === 1 ? "pointer-events-none" : ""} bg-white border
               border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg
                leading-tight py-2 px-3`}
            >
              Previous
            </a>
          </li>
          <PaginatedNumbers
            totalPages={totalPages}
            changePage={changePage}
            page={page}
            minPageNumberLimit={minPageNumberLimit}
            maxPageNumberLimit={maxPageNumberLimit}
          />
          <li>
            <a
              onClick={() => incrementPage()}
              className={`${page === totalPages - 1 ? "pointer-events-none" : ""}bg-white border
               border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg
                leading-tight py-2 px-3`}
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
