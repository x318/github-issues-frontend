import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedResponse } from '@/types/api.types';
import { GetIssueQuery, GetIssuesQuery, GithubIssueComment, GithubRepositoryIssue } from './issues.types';

const issuesApi = createApi({
  reducerPath: 'issuesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/github' }),
  endpoints: (builder) => ({
    getIssues: builder.query<PaginatedResponse<GithubRepositoryIssue>, GetIssuesQuery>({
      query: ({ user, repo, page, perPage }) => ({ url: `issues/${user}/${repo}`, params: { page, perPage } }),
    }),
    getIssue: builder.query<{ issue: GithubRepositoryIssue; comments: GithubIssueComment[] }, GetIssueQuery>({
      query: ({ user, repo, id }) => ({ url: `issues/${user}/${repo}/${id}` }),
    }),
    getTotalSearches: builder.query<number, void>({
      query: () => '/searches',
    }),
  }),
});

export default issuesApi;
