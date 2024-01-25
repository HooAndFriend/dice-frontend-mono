"use client";

// ** React Imports
import { createContext, useContext, useRef, useState } from "react";

// ** Component Imports
import AlertDialog from "@/components/dialog/alert-dialog";
import { DialogArgs } from "@/type/component";

interface ContextProps {
  handleOpen: (dialogArgs?: DialogArgs) => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

const defaultDialogArgs: DialogArgs = {
  title: "Warning",
  buttonText: "Close",
  message: "You are Dead",
  logLevel: "warn",
};

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogArgs, setDialogArgs] = useState<DialogArgs>(defaultDialogArgs);

  const handleOpen = (dialogArgs?: DialogArgs) => {
    setDialogArgs(dialogArgs ? dialogArgs : defaultDialogArgs);
    setOpen(true);
  };

  const cancelButtonRef = useRef(null);

  return (
    <Context.Provider value={{ handleOpen }}>
      {children}
      <AlertDialog
        {...dialogArgs}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </Context.Provider>
  );
}

export function useDialog() {
  return useContext(Context);
}