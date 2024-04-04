import { useCallback, useEffect, useState } from "react";

interface SearchFieldProps {
  searchText: string;
  onEnter: (
    value: string,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  onSearchClick: (value: string) => void;
}

const ENTER_KEY = "Enter";

const SearchField = ({
  searchText,
  onEnter,
  onSearchClick,
}: SearchFieldProps) => {
  const [value, setValue] = useState<string>(searchText);

  useEffect(() => {
    setValue(searchText);
  }, [searchText, setValue]);

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
      const isEnterPressed = event.key === ENTER_KEY;
      if (isEnterPressed && typeof onEnter === "function") {
        const value = event.currentTarget.value;
        onEnter(value, event);
      }
    },
    [onEnter]
  );

  const onSearchClickHandler = useCallback(() => {
    if (typeof onSearchClick === "function") {
      onSearchClick(value);
    }
  }, [onSearchClick, value]);

  return (
    <div className="relative">
      <input
        className="appearance-none border-none pl-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        onKeyDown={onKeyDownHandler}
        placeholder="Search By Name..."
      />
      <div className="absolute right-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onSearchClickHandler}
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

SearchField.defaultProps = {
  searchText: "",
  onEnter: null,
  onSearchClick: null,
};

export default SearchField;
