import { ExternalLinkIcon, RadiobuttonIcon } from '@radix-ui/react-icons';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { GithubRepositoryIssue } from '@/services/issues.types';

import './IssueHeader.scss';

interface IssueHeaderProps {
  issue: GithubRepositoryIssue;
}

const IssueHeader = ({ issue }: IssueHeaderProps) => {
  const githubUrl = `https://github.com/${issue.url.split('/').slice(-4).join('/')}`;

  return (
    <Card className="issue-header">
      <Flex gap="4" align="center" justify="between">
        <Flex gap="4" align="center">
          <Heading size={{ initial: '2', sm: '4' }}>{issue.title}</Heading>
        </Flex>
        <Flex gap="2">
          <Flex align="center" gap="1">
            {issue.state === 'open' ? (
              <>
                <div className="issue-header__status issue-header__status--open">
                  <RadiobuttonIcon width={16} height={16} /> <Text size={{ initial: '1', sm: '3' }}>Open</Text>
                </div>
              </>
            ) : (
              <div className="issue-header__status issue-header__status--closed">
                <RadiobuttonIcon width={16} height={16} /> <Text size={{ initial: '1', sm: '3' }}>Closed</Text>
              </div>
            )}
          </Flex>
          <a target="_blank" href={githubUrl} className="issue-header__link" rel="noreferrer">
            Url <ExternalLinkIcon />
          </a>
        </Flex>
      </Flex>
    </Card>
  );
};

export default IssueHeader;
