import { useState, createContext, useContext } from 'react'
import { Alert } from '@/components/Alert'

interface ContextProps {
  onError(title: string, contents: string): void
}

const Context = createContext<ContextProps>({} as ContextProps)

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [alertContents, setAlertContents] = useState({
    title: '',
    contents: '',
  })

  const onClose = () => {
    setOpen(false)
  }

  const onError = (title: string, contents: string) => {
    setAlertContents({ title, contents })
    setOpen(true)
  }

  return (
    <Context.Provider value={{ onError }}>
      <Alert open={open} {...alertContents} type="alert" onClose={onClose} />
      {children}
    </Context.Provider>
  )
}

export function useError() {
  return useContext(Context)
}
