import { DialogProvider } from "@/src/context/DialogContext"
import ProgramModalView from "./ProgramModal"


interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const ProgramModal = ({open, cancelButtonRef, setOpen}: PropsType) : JSX.Element => {
  console.log("open ProgramModal")

  return (
    <DialogProvider>
      <ProgramModalView
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
      />
    </DialogProvider>
  )

}


export default ProgramModal