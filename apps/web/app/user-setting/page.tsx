// ** Component Imports
import UserSettingContainer from '@/container/usersetting-container';
// ** Provider Imports
import RocoilRootProvider from '@/components/provider/recoil-provider';
import {DialogProvider} from '@/context/DialogContext';

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <UserSettingContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
