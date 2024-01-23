// ** Component Imports
import SocialSignupContainer from "@/container/social-signup-container";

// ** Recoil Imports
import RocoilRootProvider from "@/components/provider/recoil-provider";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <SocialSignupContainer />
    </RocoilRootProvider>
  );
}
