import SwrProvider from '@/components/provider/swr-provider';
import CreateWorkspaceContainer from '../createworkspace-container';

const CreateTeamContainer = () => {
  return (
    <SwrProvider>
      <CreateWorkspaceContainer />
    </SwrProvider>
  );
};

export default CreateTeamContainer;
