import SwrProvider from '@/components/provider/swr-provider';
import WorkspaceContainerView from './workspace-container';

const WorkspaceContainer = () => {
  return (
    <SwrProvider>
      <WorkspaceContainerView />
    </SwrProvider>
  );
};

export default WorkspaceContainer;
