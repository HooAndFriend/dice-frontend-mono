import SwrProvider from '@/src/components/provider/swr-provider';
import QaContainerView from './qa-container';

const QaContainer = () => {
  return (
    <SwrProvider>
      <QaContainerView />
    </SwrProvider>
  );
};

export default QaContainer;
