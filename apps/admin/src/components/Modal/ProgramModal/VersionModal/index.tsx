// ** Provider Imports
import { DialogProvider } from "@/src/context/DialogContext"

// ** Component Imports
import VersionModalView from "./VersionModal"


interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const VersionModal = ({ open, cancelButtonRef, setOpen }: PropsType): JSX.Element => {

  return (
    <DialogProvider>
      <VersionModalView
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
      />
    </DialogProvider>
  )

}


export default VersionModal