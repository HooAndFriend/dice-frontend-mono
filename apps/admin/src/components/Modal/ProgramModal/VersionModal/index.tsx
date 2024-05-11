// ** Provider Imports
import { DialogProvider } from "@/src/context/DialogContext"

// ** Component Imports
import VersionModalView from "./VersionModal"


interface PropsType {
  open: boolean
  title: string
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const VersionModal = ({ open, title, cancelButtonRef, setOpen }: PropsType): JSX.Element => {

  return (
    <DialogProvider>
      <VersionModalView
        open={open}
        title={title}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
      />
    </DialogProvider>
  )

}


export default VersionModal