import SwrProvider from "@/src/components/provider/swr-provider";
import CreateWorkspaceContainer from "../createworkspace-container";

const CreateTeamContainer = () => {
  return (
    <SwrProvider>
      <CreateWorkspaceContainer />
    </SwrProvider>
  );
};

export default CreateTeamContainer;
