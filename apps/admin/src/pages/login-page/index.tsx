// ** React Imports
import { KeyboardEvent } from 'react'

// ** Component Imports
import LoginPageView from './login-page'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'
import { useNavigate } from 'react-router-dom'

// ** Type Imports
import { LoginParam, LoginResponse } from '@/src/type/auth'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Post } from '@/src/repository'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Recoil Imports
import { useSetRecoilState } from 'recoil'
import { AuthState, AdminState } from '@/src/app/index'

const LoginPage = () => {
  const { data, handleInput } = useInput<LoginParam>({
    email: '',
    password: '',
  })

  const setAuthState = useSetRecoilState(AuthState)
  const setAdminState = useSetRecoilState(AdminState)

  const navigate = useNavigate()

  const { handleOpen } = useDialog()

  const login = useSWRMutation(
    '/v1/auth',
    async (url: string) => await Post<LoginResponse>(url, data),
    {
      onSuccess: ({ data: { admin, token } }) => {
        setAdminState({
          email: admin.email,
          nickname: admin.nickname,
          profile: admin.profile,
          role: admin.role,
        })
        setAuthState(token)
        navigate('/dashboard')
      },
      onError: (error) => {
        console.log(error)
        handleOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      login.trigger()
    }
  }

  return (
    <LoginPageView
      data={data}
      handleInput={handleInput}
      handleLogin={login.trigger}
      handleEnter={handleEnter}
    />
  )
}

export default LoginPage
