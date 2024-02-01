// ** Component Imports
import SignupContainer from "@/src/container/signup-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <SignupContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
