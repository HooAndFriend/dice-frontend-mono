import "./globals.css";
import type { Metadata } from "next";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "../src/context/DialogContext";

export const metadata: Metadata = {
  title: "HI-DICE",
  description: "HI-DICE",
  icons: {
    icon: "/favicon.ico",
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
          <DialogProvider>{children}</DialogProvider>
        </RocoilRootProvider>
      </body>
    </html>
  );
}
