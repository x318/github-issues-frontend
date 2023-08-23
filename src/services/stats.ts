import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedRequest, PaginatedResponse } from '@/types/api.types';
import { Log } from './stats.types';

const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/stats' }),
  endpoints: (builder) => ({
    getStats: builder.query<PaginatedResponse<Log>, PaginatedRequest>({
      query: (query) => ({ url: '', params: query }),
    }),
  }),
});

export default statsApi;
