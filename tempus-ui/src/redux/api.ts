import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Client } from 'src/types/Client';
import { TimeEntry } from 'src/types/TimeEntry';

export const tempusApi = createApi({
  reducerPath: 'tempus',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3123/dev',
  }),
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    getTime: builder.query<{ [date: string]: TimeEntry[] }, void>({
      query: () => '/time',
    }),
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: ['Client']
    }),
    updateClient: builder.mutation<Client, Partial<Client> & Pick<Client, '_id'>>({
      query: ({ _id, ...patch }) => ({
        url: `/clients/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Client']
    })
  }),
});

export const { useGetTimeQuery, useGetClientsQuery, useUpdateClientMutation } = tempusApi;
