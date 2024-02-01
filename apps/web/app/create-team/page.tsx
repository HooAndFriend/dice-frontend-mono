// ** Component Imports
import CreateTeamContainer from "@/src/container/createteam-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <CreateTeamContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
