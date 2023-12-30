import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_KEY_URL}`,
    // baseUrl: "http://localhost:5001/api/v1",
    prepareHeaders: (headers, { getState }) => {
      /// Get the JWT token from localStorage
      const token = localStorage.getItem("token");

      // If the token exists, add it to the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Book", "Genre", "Year"],
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        url: "/createBook",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book", "Genre", "Year"],
    }),
    updateBook: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/bookUpdate/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Book", "Genre", "Year"],
    }),
    getBooks: builder.query({
      query: () => {
        return {
          url: `/books`,
        };
      },
      providesTags: ["Book"],
    }),
    getGenreList: builder.query({
      query: () => {
        return {
          url: `/genreList`,
        };
      },
      providesTags: ["Book"],
    }),
    getBookListByGenre: builder.query({
      query: (args) => {
        const { genre } = args;
        return {
          url: `/booksByGenre/${genre}`,
        };
      },
      providesTags: ["Book"],
    }),
    getBookListByYear: builder.query({
      query: (args) => {
        const { year } = args;
        
        return {
          url: `/booksByYear/${year}`,
        };
      },
      providesTags: ["Book"],
    }),
    getYearList: builder.query({
      query: () => {
        return {
          url: `/yearList`,
        };
      },
      providesTags: ["Book"],
    }),
    getSingleBook: builder.query({
      query: (args) => {
        const { id } = args;
        return { url: `/bookDetails/${id}` };
      },
      providesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/bookDelete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useGetGenreListQuery,
  useGetSingleBookQuery,
  useGetYearListQuery,
  useGetBookListByGenreQuery,
  useGetBookListByYearQuery
} = bookApi;
