// ** React Imports
import { createContext, useContext, useRef, useState } from 'react'

// ** Component Imports
import AlertDialog from '@/src/components/Dialog/AlertDialog'
import { DialogArgs } from '@/src/type/component'

interface ContextProps {
  handleOpen: (dialogArgs?: DialogArgs) => void
}

const Context = createContext<ContextProps>({} as ContextProps)

const defaultDialogArgs: DialogArgs = {
  title: 'Warning',
  buttonText: 'Close',
  comfirmButtonText: 'Send',
  message: 'You are Dead',
  logLevel: 'warn',
  type: 'alert',
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false)
  const [dialogArgs, setDialogArgs] = useState<DialogArgs>(defaultDialogArgs)

  const handleOpen = (dialogArgs?: DialogArgs) => {
    setDialogArgs(dialogArgs ? dialogArgs : defaultDialogArgs)
    setOpen(true)
  }

  const cancelButtonRef = useRef(null)

  return (
    <Context.Provider value={{ handleOpen }}>
      {children}
      <AlertDialog
        {...dialogArgs}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        comfirmButtonText={dialogArgs.comfirmButtonText}
        type={dialogArgs.type}
      />
    </Context.Provider>
  )
}

export function useDialog() {
  return useContext(Context)
}
