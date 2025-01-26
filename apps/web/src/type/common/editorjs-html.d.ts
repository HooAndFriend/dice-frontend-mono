declare module 'editorjs-html' {
  interface EditorJSHTML {
    parse(data: any): string[];
  }

  const edjsHTML: () => EditorJSHTML;
  export default edjsHTML;
}
