import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://twoj-backend-api.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Załóżmy, że token jest przechowywany w stanie Redux
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUsers: builder.query({
      query: () => 'users',
    }),
    // Dodaj więcej endpointów według potrzeb
  }),
});

export const { useLoginMutation, useGetUsersQuery } = api;