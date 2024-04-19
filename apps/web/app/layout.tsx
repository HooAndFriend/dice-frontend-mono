import "./globals.css";
import type { Metadata } from "next";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/Provider/recoil-provider";
import { DialogProvider } from "../src/context/DialogContext";
import SwrProvider from "@/src/components/Provider/swr-provider";

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
        <RocoilRootProvider>
          <SwrProvider>
            <DialogProvider>{children}</DialogProvider>
          </SwrProvider>
        </RocoilRootProvider>
      </body>
    </html>
  );
}
