import { IssueList, SearchForm } from '@/components';
import LayoutBase from '@/layouts/LayoutBase';

function HomePage() {
  return (
    <LayoutBase>
      <SearchForm />
      <IssueList />
    </LayoutBase>
  );
}

export default HomePage;
