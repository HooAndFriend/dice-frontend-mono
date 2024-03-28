import UserDeleteModalView from './UserDeleteModal'
import { DialogProvider } from '@/src/context/DialogContext'

// ** Type Imports
import { DeleteUserInfo } from '@/src/type/user-delete'

interface PropsType {
  open: boolean
  userInfo: DeleteUserInfo
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const UserDeleteModal = ({ open, setOpen, userInfo, cancelButtonRef }: PropsType) => {
  return (
    <DialogProvider>
      <UserDeleteModalView
        open={open}
        userData={userInfo}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  )
}

export default UserDeleteModal
