// ** Component Imports
import SignupContainer from "@/container/signup-container";

// ** Provider Imports
import RocoilRootProvider from "@/components/provider/recoil-provider";
import { DialogProvider } from "@/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <SignupContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
