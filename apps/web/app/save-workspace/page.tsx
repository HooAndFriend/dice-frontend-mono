// ** Component Imports
import SaveWorkspaceContainer from "@/src/container/save-workspace-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <SaveWorkspaceContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
