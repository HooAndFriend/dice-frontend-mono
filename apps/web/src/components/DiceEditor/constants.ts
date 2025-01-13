import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import ImageTool from '@editorjs/image'
import Checklist from '@editorjs/checklist'
import InlineCode from '@editorjs/inline-code'

export const tools = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: 'Add a header',
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        vimeo: true,
        instagram: true,
      },
    },
  },
  table: Table,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: async (file) => {
          const formData = new FormData()
          formData.append('image', file)

          const response = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
          })

          const result = await response.json()
          return {
            success: 1,
            file: {
              url: result.url,
            },
          }
        },
      },
    },
  },
  checklist: Checklist,
  inlineCode: InlineCode,
}
