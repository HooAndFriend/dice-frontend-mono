import { DialogProvider, useDialog } from '@/src/context/DialogContext'
import CreateAdminModalView from './CreateAdminModal'
import useInput from '@/src/hooks/useInput'
import { CreateAdminParams, CreateAdminResponse } from '@/src/type/admin'
import useSWRMutation from 'swr/mutation'
import { Post } from '@/src/repository'

interface PropsType {
  handleCreateAdmin: () => void
}

const CreateAdminModal = ({ handleCreateAdmin }: PropsType) => {
  const { handleOpen } = useDialog()
  const { data, handleInput, handleSelect } = useInput<CreateAdminParams>({
    email: '',
    phone: '',
    password: '11',
    role: '',
    nickname: '',
    profile: '',
  })

  const createAdmin = useSWRMutation(
    '/v1/admin',
    async (url: string) =>
      await Post<CreateAdminResponse>(url, {
        ...data,
      })
        .then((res) => {
          console.log(res)
          alert('등록이 완료되었습니다')
        })
        .catch((error) => {
          console.log(error)
        }),
  )

  const addAdmin = () => {
    console.log(data)
    if (data.email == '') {
      handleOpen({
        title: 'Error',
        message: 'Enter email',
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })

      return
    }
    if (data.nickname == '') {
      handleOpen({
        title: 'Error',
        message: 'Enter nickname',
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })

      return
    }
    if (data.phone == '') {
      handleOpen({
        title: 'Error',
        message: 'Enter phone',
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })

      return
    }
    if (data.role == '') {
      handleOpen({
        title: 'Error',
        message: 'Enter role',
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })

      return
    }

    createAdmin.trigger()
  }
  return (
    <DialogProvider>
      <CreateAdminModalView
        handleSelect={handleSelect}
        addAdmin={addAdmin}
        handleInput={handleInput}
        handleCreateAdmin={handleCreateAdmin}
      />
    </DialogProvider>
  )
}

export default CreateAdminModal
