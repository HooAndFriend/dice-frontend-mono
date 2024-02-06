// ** Component Imports
import QaContainer from '@/src/container/qa-container';

// ** Provider Imports
import RocoilRootProvider from '@/src/components/provider/recoil-provider';
import {DialogProvider} from '@/src/context/DialogContext';

export default function Qa(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <QaContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
