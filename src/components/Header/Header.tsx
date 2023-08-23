import { Button, Heading, Text, Tooltip } from '@radix-ui/themes';
import { GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import './Header.scss';
import Skeleton from 'react-loading-skeleton';
import issuesApi from '@/services/issues';

const Header = () => {
  const { data: searchCount, isLoading } = issuesApi.useGetTotalSearchesQuery(null, {});

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__left">
          <div className="header__logo">
            <GitHubLogoIcon width={32} height={32} />
          </div>
          <Heading size={{ initial: '2', xs: '4', sm: '6' }} className="header__title">
            Github Issues Tracker
          </Heading>
        </a>
        <div className="header__stats">
          {isLoading ? (
            <Skeleton height={20} width={150} />
          ) : (
            <>
              <Tooltip content="This info displays total searches by all users">
                <Button size="1" radius="full" variant="ghost" color="gray">
                  <InfoCircledIcon width={16} height={16} />
                </Button>
              </Tooltip>
              <Text size="2" color="gray">
                <Link to="/stats">Total searches: {searchCount}</Link>
              </Text>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
