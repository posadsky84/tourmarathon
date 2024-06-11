import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_STRAPI_URL}/api`,
  }),
  tagTypes: ['Get'],
  endpoints: (builder) => ({
    getRunners: builder.query({
      query: () => '/runners',
    }),
    getTeams: builder.query({
      query: () => '/teams?populate[0]=runners&populate[1]=runnersChildren&sort=place',
    }),
    getRaces: builder.query({
      query: () => '/races?populate=magnet&sort=ddate:desc',
    }),
    getRunner: builder.query({
      query: (runnerId) => `/runners/${runnerId}?populate[0]=teams.distance.race&populate[1]=teams.runners&populate[2]=teams.runnersChildren`,
    }),
  }),
})
export const { useGetRunnersQuery, useGetTeamsQuery, useGetRunnerQuery, useGetRacesQuery } = api
