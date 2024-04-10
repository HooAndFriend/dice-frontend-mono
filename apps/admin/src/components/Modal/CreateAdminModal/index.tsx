import { DialogProvider } from '@/src/context/DialogContext'
import CreateAdminModalView from './CreateAdminModal'

interface PropsType {
  handleCreateAdmin: () => void
}

const CreateAdminModal = ({ handleCreateAdmin }: PropsType) => {
  return (
    <DialogProvider>
      <CreateAdminModalView handleCreateAdmin={handleCreateAdmin} />
    </DialogProvider>
  )
}

export default CreateAdminModal
