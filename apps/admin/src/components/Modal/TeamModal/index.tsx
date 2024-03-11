import TeamModalView from './TeamModal'
import { DialogProvider } from '@/src/context/DialogContext'

interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const TeamModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  return (
    <DialogProvider>
      <TeamModalView
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  )
}

export default TeamModal
