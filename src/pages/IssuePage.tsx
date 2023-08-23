import { Box, Flex } from '@radix-ui/themes';
import { useParams } from 'react-router-dom';
import { GetIssueQuery } from '@/services/issues.types';
import issuesApi from '@/services/issues';
import LayoutBase from '@/layouts/LayoutBase';
import { IssueComment, IssueHeader } from '@/components';

import './IssuePage.scss';

function IssuePage() {
  const params = useParams();
  const { data } = issuesApi.useGetIssueQuery(params as unknown as GetIssueQuery);

  if (!data) return;

  return (
    <LayoutBase className="issue-page">
      <IssueHeader issue={data.issue} />
      <Box mt="4">
        <IssueComment comment={data.issue} className="issue-page__root-issue" />
        <Flex direction="column" mt="4" ml="4" gap="3">
          {data?.comments.map((comment, idx) => <IssueComment key={idx} comment={comment} />)}
        </Flex>
      </Box>
    </LayoutBase>
  );
}

export default IssuePage;
