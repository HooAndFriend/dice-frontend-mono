// ** Component Imports
import SocialSignupContainer from "@/src/container/social-signup-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <SocialSignupContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
