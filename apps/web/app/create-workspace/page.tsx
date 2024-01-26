// ** Component Imports
import CreateWorkspaceContainer from '@/container/createworkspace-container';

// ** Provider Imports
import RocoilRootProvider from '@/components/provider/recoil-provider';
import {DialogProvider} from '@/context/DialogContext';

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <CreateWorkspaceContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
