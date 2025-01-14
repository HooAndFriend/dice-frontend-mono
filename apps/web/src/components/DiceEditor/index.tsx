import { memo, useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { tools } from './constants'
import './editor.css'
import { safeParseJson } from '@/src/utils/json'

interface PropsType {
  boardId: number
  content: OutputData
  readOnly: boolean
  setContent: (content: OutputData) => void
}

const DiceEditor = ({ boardId, content, setContent, readOnly }: PropsType) => {
  const editorRef = useRef<EditorJS | null>(null)
  const editorHolderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editorHolderRef.current) return

    editorRef.current = new EditorJS({
      holder: editorHolderRef.current.id,
      tools,
      readOnly,
      minHeight: 30,
      data: {
        ...content,
        blocks: content?.blocks.map((block) => ({
          ...block,
          data: safeParseJson(block.data),
        })),
      },
      autofocus: true,
      placeholder: 'Let`s write an awesome story!',
      onChange: (api) => {
        if (!api.readOnly.isEnabled) {
          api.saver.save().then((newContent) => {
            setContent(newContent)
          })
        }
      },
    })

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [boardId, content, readOnly, setContent])

  return (
    <div
      ref={editorHolderRef}
      className="w-full h-[750px] py-4 px-16 overflow-x-hidden overflow-y-scroll flex"
      id={`editorjs-${boardId}`}
    />
  )
}

export default memo(DiceEditor)
