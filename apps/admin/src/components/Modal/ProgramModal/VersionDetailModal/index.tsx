// ** Provider Imports
import { DialogProvider } from "@/src/context/DialogContext"
// ** Component Imports
import VersionDetailModalView from "./VersionDetailModal"


interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
  handleCreate: (title: string) => void
}

const VersionDetailModal = ({ open, cancelButtonRef, setOpen, handleCreate }: PropsType): JSX.Element => {

  return (
    <DialogProvider>
      <VersionDetailModalView
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
        handleCreate={handleCreate}
      />
    </DialogProvider>
  )

}


export default VersionDetailModal