import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_KEY, OMDB_API_BASE_URL } from "../utils/config";
import { getShowPropsType, getShowsPropsType } from "../types";

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),

  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({
        type,
        searchQuery,
        page,
      }: getShowsPropsType) => ({
        url: "",
        method: 'GET',
        params: { apikey:API_KEY, s:searchQuery, type:type, page: page }
      }),
    }),

    getShow: builder.query({
      query: ({ id }: getShowPropsType) => ({
        url: "",
        method: 'GET',
        params: { apikey:API_KEY, i:id }
      })
    }),
  }),
});

export const { useGetShowsQuery, useGetShowQuery } = omdbApi;
