// ** Component Imports
import SaveTeamContainer from "@/src/container/save-team-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <SaveTeamContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
