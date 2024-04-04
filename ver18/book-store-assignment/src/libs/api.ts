import BookListResponse from "@/model/book-list-response";
import BookSearchParams from "@/model/book-search-params";
import axios, { AxiosResponse } from "axios";

const API = {
  apiInstance: axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(import.meta.env.VITE_ENV === "development" && {
        "Access-Control-Allow-Origin": "*",
      }),
    },
  }),

  API_PATH: {
    APP: {
      LOGIN: "/example/login",
    },
    BOOK: {
      GET_ALL_BOOK: "https://openlibrary.org/search.json",
    },
  },
  app: {
    login: (): Promise<AxiosResponse<void>> => {
      return API.apiInstance.post(API.API_PATH.APP.LOGIN);
    },
    getAllBooks: async (
      params: BookSearchParams
    ): Promise<AxiosResponse<BookListResponse>> => {
      return await axios.get(API.API_PATH.BOOK.GET_ALL_BOOK, { params });
    },
  },
};

API.apiInstance.defaults.withCredentials = true;

export default API;
