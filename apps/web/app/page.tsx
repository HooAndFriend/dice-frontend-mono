// ** Component Imports
import LoginContainer from "@/container/login-container";

// ** Provider Imports
import RocoilRootProvider from "@/components/provider/recoil-provider";
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
