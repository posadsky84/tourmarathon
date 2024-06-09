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
      query: () => '/teams?populate[0]=runners&populate[1]=runnersChildren&sort=place',
    }),
    getRunner: builder.query({
      query: (runnerId) => `/runners/${runnerId}?populate[0]=teams.distance.race&populate[1]=teams.runners&populate[2]=teams.runnersChildren`,
    }),
  }),
})
export const { useGetRunnersQuery, useGetTeamsQuery, useGetRunnerQuery } = api
