import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api',
  }),
  tagTypes: ['Get'],
  endpoints: (builder) => ({
    getRunners: builder.query({
      query: () => '/runners',
    }),
    getTeams: builder.query({
      query: () => '/teams?populate=deep&sort=place',
    }),
  }),
})
export const { useGetRunnersQuery, useGetTeamsQuery } = api
