// ** Next Imports
import dynamic from 'next/dynamic'

// ** React Imports
import { useState } from 'react'

// ** Quill Imports
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface PropsType {
  value: string
  name: string
  onChange: (value: string) => void
}

const QuillEditor = ({ value, onChange }: PropsType) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />
}

export default QuillEditor
