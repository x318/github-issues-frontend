import cx from 'classnames';
import { Header } from '@/components';

interface LayoutBaseProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutBase = ({ children, className }: LayoutBaseProps) => {
  return (
    <div className={cx('page', className)}>
      <Header />
      <main className="page__main">
        <div className="width-container">{children}</div>
      </main>
    </div>
  );
};

export default LayoutBase;
