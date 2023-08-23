import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import cx from 'classnames';
import { GithubIssueComment } from '@/services/issues.types';
import Markdown from '../Markdown/Markdown';

import './IssueComment.scss';

interface IssueCommentProps {
  comment: GithubIssueComment;
  className?: string;
}

const IssueComment = ({ comment, className }: IssueCommentProps) => {
  return (
    <Card className={cx('issue-comment', className)}>
      <Flex gap="4" align="center" justify="between">
        <Flex align="center">
          <Avatar mr="2" size="2" src={comment.user.avatar_url} radius="full" fallback={comment.user.login} />
          {comment.user.login}:{' '}
          <Text ml="1" color="gray">
            commented on{' '}
            {new Date(comment.created_at).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'long',
              year: '2-digit',
            })}
          </Text>
        </Flex>
      </Flex>
      <hr />
      <Box>
        <Markdown>{comment.body}</Markdown>
      </Box>
    </Card>
  );
};

export default IssueComment;
