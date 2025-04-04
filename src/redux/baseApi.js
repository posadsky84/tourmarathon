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
    getAllRunnersData: builder.query({
      query: () => '/allRunnersData',
    }),
    getTeams: builder.query({
      query: (raceId) =>
        `/races/${raceId}?populate[0]=magnet&populate[1]=distances.teams.members.runner.badges.race`,
      transformResponse: (response) => response.data.attributes
    }),
    getRaces: builder.query({
      query: () => '/races?populate[0]=magnet&populate[1]=distances&sort=ddate:desc',
    }),
    getRunner: builder.query({
      query: (runnerId) => `/runners/${runnerId}?populate=members.team.distance.race,members.team.members.runner`,
    }),
    getMain: builder.query({
      query: () => `/races?filters[ddate][$gt]=${new Date().getFullYear()}-01-01&sort=ddate&populate[0]=distances&populate[1]=cardPicture`,
    }),
    getMainPageInfo: builder.query({
      query: () => '/main-page',
    }),
    getPageRaceBefore: builder.query({
      query: () => '/hot-block',
    }),
    getPageAbout: builder.query({
      query: () => '/page-about',
    }),
    getRace: builder.query({
      query: (raceId) => `/races/${raceId}?populate=distances&populate[1]=magnet`,
      transformResponse: (response) => {
        const res = response.data.attributes;
        res.distances.data.sort((a,b) => a.attributes.km < b.attributes.km ? -1 : 1);
        return res;
      },
    }),

  }),
})
export const {
  useGetRunnersQuery,
  useGetAllRunnersDataQuery,
  useGetTeamsQuery,
  useGetRunnerQuery,
  useGetRacesQuery,
  useGetMainQuery,
  useGetMainPageInfoQuery,
  useGetPageRaceBeforeQuery,
  useGetPageAboutQuery,
  useGetRaceQuery,
} = api
