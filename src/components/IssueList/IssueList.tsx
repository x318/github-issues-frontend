import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '@radix-ui/themes';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Skeleton from 'react-loading-skeleton';
import { useScrollContainer } from 'react-indiana-drag-scroll';
import { type RootState } from '@/store';

import issuesApi from '@/services/issues';

import './IssueList.scss';
import { setPage } from '@/store/issuesSlice';
import { ApiError } from '@/types/api.types';
import IssueListItem from './IssueListItem';
import Pagination from '../Pagination/Pagination';

const PAGE_SIZE = 30;

const IssueList = () => {
  const dispatch = useDispatch();
  const { search, page } = useSelector((state: RootState) => state.issues);
  const [refetch, { data: issues, isFetching, isUninitialized, error }] = issuesApi.useLazyGetIssuesQuery();
  const errorMessage = (error as ApiError)?.data?.message;

  const scrollContainer = useScrollContainer();

  useEffect(() => {
    if (search) {
      const [user, repo] = search.split('/');
      const request = refetch({
        user,
        repo,
        page,
        perPage: PAGE_SIZE,
      });

      return () => {
        request.abort();
      };
    }
  }, [search, page]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [search]);

  if (errorMessage) {
    return (
      <Flex mt="2" align="center" justify="center" direction="column" className="issue-list__initial">
        <Text size="5" weight="bold" color="gray">
          <Flex align="center" direction="column" gap="1">
            {errorMessage} 🧐
          </Flex>
        </Text>
      </Flex>
    );
  }

  if (isUninitialized) {
    return (
      <Flex mt="2" align="center" justify="center" direction="column" className="issue-list__initial">
        <Text size="5" weight="bold" color="gray">
          <Flex align="center" direction="column" gap="1">
            <ArrowUpIcon width={32} height={32} />
            Please enter query above
          </Flex>
        </Text>
      </Flex>
    );
  }

  return (
    <div className="issue-list__container">
      <Flex ref={scrollContainer.ref} mt="2" gap="2" direction="column" className="issue-list">
        {!isFetching ? (
          issues?.data.map((issue) => <IssueListItem key={issue.id} issue={issue} />)
        ) : (
          <Skeleton className="issue-list__skeleton" />
        )}
      </Flex>
      <Flex mt="2" justify="center">
        <Pagination
          currentPage={page}
          pageSize={PAGE_SIZE}
          totalCount={issues?.totalRecords ?? 0}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      </Flex>
    </div>
  );
};

export default IssueList;
