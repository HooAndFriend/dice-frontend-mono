// ** Component Imports
import TeamSettingContainer from '@/container/teamsetting-container';

// ** Provider Imports
import RocoilRootProvider from '@/components/provider/recoil-provider';
import {DialogProvider} from '@/context/DialogContext';

export default function teamSetting() {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <TeamSettingContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
