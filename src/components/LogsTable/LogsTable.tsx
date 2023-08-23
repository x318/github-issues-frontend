import { useState } from 'react';

import { Badge, Table } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import statsApi from '@/services/stats';
import Pagination from '../Pagination/Pagination';

import './LogsTable.scss';

const PAGE_SIZE = 20;

const BADGE_COLORS: Record<string, string> = {
  GET: 'green',
  POST: 'red',
  PATCH: 'orange',
  DELETE: 'purple',
};

const LogsTable = () => {
  const [page, setPage] = useState(1);

  const { data: logs, isLoading } = statsApi.useGetStatsQuery({ page, perPage: PAGE_SIZE });

  if (isLoading) {
    return <Skeleton height={484} />;
  }

  return (
    <>
      <Table.Root className="logs-table">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Method</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>IP</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Path</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Requested at</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {logs.data?.map((log) => (
            <>
              <Table.Row>
                <Table.RowHeaderCell>
                  {/* lib has no type exprot */}
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Badge color={(BADGE_COLORS[log.method] as any) ?? 'gray'}>{log.method}</Badge>
                </Table.RowHeaderCell>
                <Table.Cell>{log.ip}</Table.Cell>
                <Table.Cell>{log.type}</Table.Cell>
                <Table.Cell>
                  {new Date(log.time).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        pageSize={PAGE_SIZE}
        totalCount={logs.totalRecords ?? 0}
        onPageChange={(p) => setPage(p)}
      />
    </>
  );
};

export default LogsTable;
