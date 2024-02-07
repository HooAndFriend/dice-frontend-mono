"use client";

// ** Component Imports
import QaConatiner from "@/src/container/qa-container";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import { DialogProvider } from "@/src/context/DialogContext";

const QaPage = () => {
  return (
    <RocoilRootProvider>
      <DialogProvider>
        <QaConatiner />
      </DialogProvider>
    </RocoilRootProvider>
  );
};

export default QaPage;
