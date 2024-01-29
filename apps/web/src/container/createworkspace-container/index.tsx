import SwrProvider from '@/components/provider/swr-provider';
import CreateWorkspaceContainerView from './createworkspace-container';

const CreateWorkspaceContainer = () => {
  return (
    <SwrProvider>
      <CreateWorkspaceContainerView />
    </SwrProvider>
  );
};

export default CreateWorkspaceContainer;