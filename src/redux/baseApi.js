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
      query: () => '/races?populate[0]=magnet&populate[1]=distances&sort=ddate:desc',
    }),
    getRunner: builder.query({
      query: (runnerId) => `/runners/${runnerId}?populate[0]=teams.distance.race&populate[1]=teams.runners&populate[2]=teams.runnersChildren`,
    }),
    getMain: builder.query({
      query: () => `/races?filters[ddate][$gt]=${new Date().getFullYear()}-01-01&sort=ddate&populate[0]=distances&populate[1]=cardPicture`,
    }),

  }),
})
export const { useGetRunnersQuery, useGetTeamsQuery, useGetRunnerQuery, useGetRacesQuery, useGetMainQuery } = api
