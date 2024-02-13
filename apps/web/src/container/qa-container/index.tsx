import SwrProvider from '@/src/components/provider/swr-provider';
import QaContainerView from './qa-container';
import {useState} from 'react';

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCreateIssueOpen = () => {
    setOpen(cur => !cur);
  };
  return (
    <SwrProvider>
      <QaContainerView
        openCreateIssue={open}
        handleCreateIssueOpen={handleCreateIssueOpen}
      />
    </SwrProvider>
  );
};

export default QaContainer;
