import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import './IssueListItem.scss';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { GithubRepositoryIssue } from '@/services/issues.types';

const IssueListItem = ({ issue }: { issue: GithubRepositoryIssue }) => {
  const baseLink = new URL(issue.repository_url).pathname.split('/').slice(-2).join('/');
  return (
    <a href={`${baseLink}/${issue.number}`}>
      <Card className="issue-list-item">
        <Flex align="center" justify="between" gap="1">
          <Flex gap="3" align="center">
            <Avatar size="3" src={issue.user.avatar_url} radius="full" fallback={issue.user.login} />
            <Box className="issue-list-item__info">
              <Text as="div" size="2" weight="bold">
                {issue.title}
              </Text>
              <Text as="div" size="2" color="gray">
                #{issue.id} opened on{' '}
                {new Date(issue.created_at).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: '2-digit',
                })}{' '}
                by {issue.user.login}
              </Text>
            </Box>
          </Flex>
          {issue.comments > 0 && (
            <Box>
              <ChatBubbleIcon /> {issue.comments}
            </Box>
          )}
        </Flex>
      </Card>
    </a>
  );
};

export default IssueListItem;
