// ** Component Imports
import SignupContainer from "@/container/signup-container";

// ** Recoil Imports
import RocoilRootProvider from "@/components/provider/recoil-provider";

export default function Signup(): JSX.Element {
  return (
    <RocoilRootProvider>
      <SignupContainer />
    </RocoilRootProvider>
  );
}
