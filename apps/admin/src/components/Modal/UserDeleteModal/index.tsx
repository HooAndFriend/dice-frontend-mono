import UserDeleteModalView from './UserDeleteModal'
import { DialogProvider } from '@/src/context/DialogContext'

interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const UserDeleteModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  return (
    <DialogProvider>
      <UserDeleteModalView
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  )
}

export default UserDeleteModal
