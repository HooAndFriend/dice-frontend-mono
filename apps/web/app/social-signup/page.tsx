// ** Component Imports
import SocialSignupContainer from "@/container/social-signup-container";

// ** Provider Imports
import RocoilRootProvider from "@/components/provider/recoil-provider";
import { DialogProvider } from "@/context/DialogContext";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <SocialSignupContainer />
      </DialogProvider>
    </RocoilRootProvider>
  );
}
