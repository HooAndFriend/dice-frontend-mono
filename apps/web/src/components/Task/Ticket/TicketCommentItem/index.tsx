'use client'
// ** React Imports
import { useState } from 'react'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Service Imports
import { Delete, Patch } from '@/src/repository'
import useSWRMutation from 'swr/mutation'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'
import { CommentInfo } from '@/src/type/qa'

// ** Component Imports
import CommentItem from '../../Common/Comment/CommentItem'

interface PropsType {
  data: CommentInfo
  commentRefetch: () => void
}

const TicketCommentItem = ({ data, commentRefetch }: PropsType) => {
  const [content, setContent] = useState<string>(data.content)
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  const { handleOpen } = useDialog()

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const deleteComment = useSWRMutation(
    `/v1/ticket/comment/${data.ticketCommentId}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        commentRefetch()
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

  const updateComment = useSWRMutation(
    '/v1/ticket/comment',
    async (url: string) =>
      await Patch<CommonResponse<void>>(url, {
        commentId: data.ticketCommentId,
        content,
      }),
    {
      onSuccess: () => {
        commentRefetch()
        setMode('view')
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

  return (
    <CommentItem
      data={data}
      mode={mode}
      comment={content}
      setMode={setMode}
      handleComment={handleComment}
      handleUpdateComment={updateComment.trigger}
      handleDeleteComment={deleteComment.trigger}
    />
  )
}

export default TicketCommentItem
