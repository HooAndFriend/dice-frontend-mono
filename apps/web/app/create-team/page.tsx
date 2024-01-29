// ** Component Imports
import CreateTeamContainer from '@/container/createteam-container';

// ** Provider Imports
import RocoilRootProvider from '@/components/provider/recoil-provider';
import {DialogProvider} from '@/context/DialogContext';

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <CreateTeamContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
