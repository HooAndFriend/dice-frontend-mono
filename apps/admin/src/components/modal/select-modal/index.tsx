// ** Mui Imports
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'

interface Props {
  state: boolean
  title: string
  handleClose: () => void
  event: () => void
}

const SelectModal = ({ state, handleClose, title, event }: Props) => {
  return (
    <Dialog open={state}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1 }}>{title}</DialogTitle>
      <DialogActions sx={{ mt: -2 }}>
        <Button onClick={event}>확인</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectModal
