// ** Component Imports
import LoginContainer from "@/src/container/login-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "../src/context/DialogContext";

export default function Page(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <LoginContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
