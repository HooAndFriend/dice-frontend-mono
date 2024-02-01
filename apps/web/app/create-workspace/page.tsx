// ** Component Imports
import CreateWorkspaceContainer from "@/src/container/createworkspace-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <CreateWorkspaceContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
