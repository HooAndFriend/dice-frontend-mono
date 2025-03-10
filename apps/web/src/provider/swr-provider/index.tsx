'use client'
// ** Next Imports
import { useRouter } from 'next/navigation'

// ** Recoil Imports
import { AuthState } from '@/src/app'
import { useRecoilState } from 'recoil'

// ** Service Imports
import { Get, Post } from '@/src/repository'

// ** Type Imports
import { ReissueResponse } from '@/src/type/auth'

// ** SWR Config
import { Middleware, SWRConfig, SWRHook, mutate } from 'swr'

// ** Utils Imports
import { Mutex } from 'async-mutex'

const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  const myMiddleware: Middleware = (useSWRNext: SWRHook) => {
    return (key, fetcher, config) => {
      const swr = useSWRNext(key, fetcher, config)

      return swr
    }
  }
  const router = useRouter()
  const [authState, setAuthState] = useRecoilState(AuthState)

  return (
    <SWRConfig
      value={{
        use: [myMiddleware],
        onError: async (error, key) => {
          if (error?.response?.status === 401) {
            const mutex = new Mutex()
            await mutex.waitForUnlock()

            if (!mutex.isLocked()) {
              const release = await mutex.acquire()
              try {
                const {
                  data: { accessToken },
                  statusCode,
                } = await Post<ReissueResponse>('/v1/auth/reissue', {
                  refreshToken: authState.refreshToken,
                })

                if (statusCode === 200) {
                  setAuthState({
                    ...authState,
                    accessToken,
                  })
                  mutate(key)
                } else {
                  router.push('/')
                }
              } finally {
                release()
              }
            } else {
              await mutex.waitForUnlock()

              mutate(key)
            }
          }
        },
        fetcher: (resource, init) =>
          Get(resource, {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`,
            },
            ...init,
          }),
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SwrProvider
