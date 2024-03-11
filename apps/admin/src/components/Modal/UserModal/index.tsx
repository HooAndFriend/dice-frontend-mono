import UserModalView from './UserModal'
import { DialogProvider } from '@/src/context/DialogContext'

interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const UserModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  return (
    <DialogProvider>
      <UserModalView
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  )
}

export default UserModal
