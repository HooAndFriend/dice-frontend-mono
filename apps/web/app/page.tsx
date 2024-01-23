// ** Component Imports
import LoginContainer from "@/container/login-container";

// ** Recoil Imports
import RocoilRootProvider from "@/components/provider/recoil-provider";

export default function Page(): JSX.Element {
  return (
    <RocoilRootProvider>
      <LoginContainer />
    </RocoilRootProvider>
  );
}
