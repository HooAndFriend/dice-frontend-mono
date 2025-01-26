import React from 'react'
import { OutputData, BlockToolData } from '@editorjs/editorjs'
import { safeParseJson } from '@/src/utils/json'

interface EditorJSViewerProps {
  data: any
}

const EditorJSViewer: React.FC<EditorJSViewerProps> = ({ data }) => {
  const renderBlock = (block: BlockToolData) => {
    const data = safeParseJson(block.data)
    switch (block.type) {
      case 'header':
        return React.createElement(`h${data.level}`, {}, data.text)
      case 'paragraph':
        return <p>{data.text}</p>
      case 'list':
        const ListTag = data.style === 'ordered' ? 'ol' : 'ul'
        return (
          <ListTag>
            {data.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        )
      case 'image':
        return (
          <img
            src={data.url}
            alt={data.caption}
            className="h-auto max-w-full"
          />
        )
      case 'code':
        return (
          <pre>
            <code>{data.code}</code>
          </pre>
        )
      case 'quote':
        return <blockquote>{data.text}</blockquote>
      default:
        return <p>Unsupported block type: {block.type}</p>
    }
  }

  return (
    <div>
      {data?.blocks?.map((block, index) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}
    </div>
  )
}

export default EditorJSViewer
