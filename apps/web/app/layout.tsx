import "./globals.css";
import type { Metadata } from "next";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "../src/context/DialogContext";
import SwrProvider from "@/src/components/provider/swr-provider";

export const metadata: Metadata = {
  title: "HI-DICE",
  description: "HI-DICE",
  icons: {
    icon: "/ico/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <SwrProvider>
          <RocoilRootProvider>
            <DialogProvider>{children}</DialogProvider>
          </RocoilRootProvider>
        </SwrProvider>
      </body>
    </html>
  );
}
