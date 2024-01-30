// ** React Imports
import { useState, createContext, useContext } from 'react'

interface ContextProps {
  handleOpen: () => void
}

const Context = createContext<ContextProps>({} as ContextProps)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return <Context.Provider value={{ handleOpen }}>{children}</Context.Provider>
}

export function useDialog() {
  return useContext(Context)
}
