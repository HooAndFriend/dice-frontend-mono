'use client'

// ** Next Imports
import { usePathname, useRouter } from 'next/navigation'

// ** React Imports
import { useEffect, useMemo, useState } from 'react'

// ** Component Imports
import BoardContainer from '@/src/container/board-container'
import IndexContainerView from '@/src/container/board-container/index-container'

// ** Type Imports
import { OutputData } from '@editorjs/editorjs'
import { CommonResponse } from '@/src/type/common'
import { BoardDetail, GetBoardResponse } from '@/src/type/board'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Delete, Get, Put } from '@/src/repository'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'
import useSWR, { mutate } from 'swr'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

const BoardPage = () => {
  const {
    data: board,
    handleInput,
    setData: setBoard,
  } = useInput<BoardDetail>({
    content: null,
    title: '',
    createdDate: null,
    createdId: '',
    boardId: 0,
    isDeleted: false,
    modifiedDate: null,
    modifiedId: '',
    orderId: 0,
    children: [],
    parent: null,
    createdUser: {
      userId: 0,
      profile: '',
      nickname: '',
    },
  })
  const [content, setContent] = useState<OutputData>()
  const [readOnly, setReadOnly] = useState<boolean>(true)

  const router = useRouter()
  const pathname = usePathname()

  const { uuid } = useRecoilValue(WorkspaceState)
  const { handleOpen } = useDialog()

  const boardId = useMemo(
    () => +pathname.split('/')[pathname.split('/').length - 1],
    [pathname],
  )

  const handleSave = () => {
    updateBoard.trigger()
  }

  const { data, mutate: boardRefetch } = useSWR(
    `/v1/board/${boardId}`,
    async (url) => {
      if (!boardId) return
      return Get<GetBoardResponse>(url)
    },
    {
      onSuccess: ({ data }) => {
        setBoard(data)
        setContent(data.content)
      },
    },
  )

  const updateBoard = useSWRMutation(
    '/v1/board',
    async (url: string) => {
      return await Put<CommonResponse<void>>(url, {
        boardId,
        title: board.title,
        content,
      })
    },
    {
      onSuccess: ({ data }) => {
        setReadOnly(true)
      },
      onError: (error) => {
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

  const deleteBoard = useSWRMutation(
    '/v1/board/',
    async (url: string) => await Delete<CommonResponse<void>>(url + boardId),
    {
      onSuccess: ({ data }) => {
        router.push(`/${uuid}/dashboard/board`)
        mutate('/v1/board')
      },
      onError: (error) => {
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

  useEffect(() => {
    setReadOnly(true)
  }, [boardId])

  if (!boardId || !board) return <IndexContainerView />

  return (
    <BoardContainer
      content={content}
      readOnly={readOnly}
      board={board}
      setReadOnly={setReadOnly}
      setContent={setContent}
      handleSave={handleSave}
      handleDelete={deleteBoard.trigger}
    />
  )
}

export default BoardPage
