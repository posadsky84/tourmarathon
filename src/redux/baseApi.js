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
      query: ({distanceId, returnBadges}) =>
        returnBadges ? `/distances/${distanceId}?populate=teams.members.runner.badges.race`
                     : `/distances/${distanceId}?populate=teams.members.runner`,
    }),
    getRaces: builder.query({
      query: () => '/races?populate[0]=magnet&populate[1]=distances&sort=ddate:desc',
    }),
    getRunner: builder.query({
      query: (runnerId) => `/runners/${runnerId}?populate=members.team.distance.race`,
    }),
    getMain: builder.query({
      query: () => `/races?filters[ddate][$gt]=${new Date().getFullYear()}-01-01&sort=ddate&populate[0]=distances&populate[1]=cardPicture`,
    }),
    getPageRaceBefore: builder.query({
      query: () => '/hot-block',
    }),
    getRace: builder.query({
      query: (raceId) => `/races/${raceId}?populate=distances`,
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
  useGetTeamsQuery,
  useGetRunnerQuery,
  useGetRacesQuery,
  useGetMainQuery,
  useGetPageRaceBeforeQuery,
  useGetRaceQuery,
} = api
