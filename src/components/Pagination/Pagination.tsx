import cx from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { DOTS, usePagination } from '@/components/Pagination/usePagination';

import './Pagination.scss';
import { Button, Flex } from '@radix-ui/themes';

interface PaginationProps {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalCount, siblingCount, currentPage, className, pageSize, onPageChange } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1] as number;

  return (
    <Flex gap="4" className={cx('pagination', className)}>
      <Flex gap="2" className="pagination__pages">
        {paginationRange.map((page, idx) => {
          if (page === DOTS) {
            return (
              <Button key={`dots-${idx}`} disabled variant="outline" className="pagination__pages-dots" tabIndex={-1}>
                &#8230;
              </Button>
            );
          }

          return (
            <Button
              key={page}
              className={cx('pagination__pages-page', {
                active: currentPage === page,
              })}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          );
        })}
      </Flex>
      <Flex gap="2" className="pagination__controls">
        {currentPage > 1 && (
          <Button className="pagination__controls-control" onClick={onPrevious}>
            <ArrowLeftIcon /> Back
          </Button>
        )}
        {currentPage < lastPage && (
          <Button className="pagination__controls-control" onClick={onNext}>
            Next
            <ArrowRightIcon />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Pagination;
