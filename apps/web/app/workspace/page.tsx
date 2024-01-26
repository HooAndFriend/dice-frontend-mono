// ** Component Imports
import WorkspaceContainer from '@/container/workspace-container';

// ** Provider Imports
import RocoilRootProvider from '@/components/provider/recoil-provider';
import {DialogProvider} from '@/context/DialogContext';

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <WorkspaceContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
