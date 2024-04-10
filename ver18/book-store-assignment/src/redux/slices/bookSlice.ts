import API from "@/libs/api";
import BookListResponse from "@/types/api/book-list-response";
import BookSearchParams from "@/types/api/book-search-params";
import { BookEntities } from "@/types/api/bookEntities";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {
    docs: [],
    numFound: 0,
  },
  error: null,
} satisfies BookEntities as BookEntities;

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        if (action.payload) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const getAllBooks = createAsyncThunk<
  BookListResponse,
  BookSearchParams,
  {
    rejectValue: ValidationErrors;
  }
>("book/getAllBooks", async (params: BookSearchParams, { rejectWithValue }) => {
  try {
    const response = await API.app.getAllBooks(params);
    console.log("response: ", response);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    } else {
      throw err;
    }
  }
});
export default bookSlice.reducer;
