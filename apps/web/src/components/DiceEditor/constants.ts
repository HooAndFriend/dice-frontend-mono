import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import ColorPlugin from "editorjs-text-color-plugin";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import AttachesTool from "@egg-/editor-js-attaches";
import Quote from "@egg-/editor-js-quote";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
// import { uploadFile } from "services/editor";
import Alert from "editorjs-alert";

export const tools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      preserveBlank: true,
      placeholder: "Please enter text.",
    },
    toolbox: {
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.125 5H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.125 10H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.125 15H11.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a title",
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
    toolbox: {
      title: "Title Type A",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.125 4.375V13.75" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.25 9.0625H3.125" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.25 4.375V13.75" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.3125 9.6875L17.1875 8.4375V15.625" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  headerLv2: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a title",
      levels: [1, 2, 3],
      defaultLevel: 2,
    },
    toolbox: {
      title: "Title Type B",
      icon: `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 3.5V11" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 7.25H2.5" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 3.5V11" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.1187 7.41898C12.2536 7.10065 12.4942 6.83865 12.7999 6.6773C13.1057 6.51595 13.4578 6.46517 13.7966 6.53353C14.1355 6.60189 14.4404 6.78521 14.6596 7.05247C14.8789 7.31973 14.9992 7.65453 15 8.00023C15.0013 8.29891 14.912 8.59095 14.7437 8.83773L12 12.5002H15" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
`,
    },
  },
  headerLv3: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a title",
      levels: [1, 2, 3],
      defaultLevel: 3,
    },
    toolbox: {
      title: "Title Type C",
      icon: `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.875 2.625V8.25" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 5.4375H1.875" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 2.625V8.25" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 5.0625H11.25L9.9375 6.9375C10.1533 6.93752 10.3658 6.99076 10.5562 7.09251C10.7465 7.19427 10.9088 7.34139 11.0287 7.52086C11.1486 7.70032 11.2224 7.90659 11.2436 8.12139C11.2647 8.33618 11.2326 8.55288 11.15 8.75228C11.0674 8.95169 10.9369 9.12765 10.7701 9.26457C10.6032 9.4015 10.4052 9.49516 10.1935 9.53728C9.9818 9.57939 9.76299 9.56864 9.55645 9.506C9.34991 9.44335 9.162 9.33074 9.00937 9.17812" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
    toolbox: {
      title: "To-do list",
      icon: `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.1875 5.0625L7.3125 12.9375L3.375 9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
    toolbox: {
      title: "Bulleted list",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.875 5H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.875 10H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.875 15H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.4375 5.9375C3.95527 5.9375 4.375 5.51777 4.375 5C4.375 4.48223 3.95527 4.0625 3.4375 4.0625C2.91973 4.0625 2.5 4.48223 2.5 5C2.5 5.51777 2.91973 5.9375 3.4375 5.9375Z" fill="black"/>
      <path d="M3.4375 10.9375C3.95527 10.9375 4.375 10.5178 4.375 10C4.375 9.48223 3.95527 9.0625 3.4375 9.0625C2.91973 9.0625 2.5 9.48223 2.5 10C2.5 10.5178 2.91973 10.9375 3.4375 10.9375Z" fill="black"/>
      <path d="M3.4375 15.9375C3.95527 15.9375 4.375 15.5178 4.375 15C4.375 14.4822 3.95527 14.0625 3.4375 14.0625C2.91973 14.0625 2.5 14.4822 2.5 15C2.5 15.5178 2.91973 15.9375 3.4375 15.9375Z" fill="black"/>
      </svg>
      `,
    },
  },
  numberList: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "ordered",
    },
    toolbox: {
      title: "Numbered list",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.125 10H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.125 5H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.125 15H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.125 4.6875L4.375 4.0625V8.4375" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.21094 11.9215C3.26853 11.7789 3.35555 11.65 3.46632 11.5433C3.57708 11.4366 3.70911 11.3545 3.85377 11.3023C3.99843 11.2501 4.15248 11.2289 4.30586 11.2403C4.45923 11.2516 4.60849 11.2952 4.74389 11.3682C4.87928 11.4411 4.99777 11.5418 5.09162 11.6636C5.18547 11.7855 5.25256 11.9258 5.28853 12.0753C5.32449 12.2248 5.32852 12.3803 5.30034 12.5314C5.27216 12.6826 5.21242 12.8262 5.125 12.9527L3.125 15.6246H5.3125" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  table: {
    class: Table,
    toolbox: {
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 4.375H17.5V15C17.5 15.1658 17.4342 15.3247 17.3169 15.4419C17.1997 15.5592 17.0408 15.625 16.875 15.625H3.125C2.95924 15.625 2.80027 15.5592 2.68306 15.4419C2.56585 15.3247 2.5 15.1658 2.5 15V4.375Z" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.5 8.125H17.5" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.5 11.875H17.5" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.875 8.125V15.625" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    toolbox: {
      title: "Quotation",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.4375 11.25H3.125C2.95924 11.25 2.80027 11.1842 2.68306 11.0669C2.56585 10.9497 2.5 10.7908 2.5 10.625V5.625C2.5 5.45924 2.56585 5.30027 2.68306 5.18306C2.80027 5.06585 2.95924 5 3.125 5H7.8125C7.97826 5 8.13723 5.06585 8.25444 5.18306C8.37165 5.30027 8.4375 5.45924 8.4375 5.625V12.5C8.4375 13.3288 8.10826 14.1237 7.52221 14.7097C6.93616 15.2958 6.1413 15.625 5.3125 15.625" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.5 11.25H12.1875C12.0217 11.25 11.8628 11.1842 11.7456 11.0669C11.6283 10.9497 11.5625 10.7908 11.5625 10.625V5.625C11.5625 5.45924 11.6283 5.30027 11.7456 5.18306C11.8628 5.06585 12.0217 5 12.1875 5H16.875C17.0408 5 17.1997 5.06585 17.3169 5.18306C17.4342 5.30027 17.5 5.45924 17.5 5.625V12.5C17.5 13.3288 17.1708 14.1237 16.5847 14.7097C15.9987 15.2958 15.2038 15.625 14.375 15.625" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  delimiter: {
    class: Delimiter,
    toolbox: {
      title: "Contour",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.125 10H16.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  callout: {
    class: Warning,
    inlineToolbar: true,
    config: {
      messagePlaceholder: "Please enter text",
    },
    toolbox: {
      title: "Callout",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4.375V15.625" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.75 6.875V4.375H16.25V6.875" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.5 15.625H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  alert: {
    class: Alert,
  },
  image: {
    class: ImageTool,
    toolbox: {
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.25 3.125H3.75C3.40482 3.125 3.125 3.40482 3.125 3.75V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V3.75C16.875 3.40482 16.5952 3.125 16.25 3.125Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.875 12.4999L13.5703 9.19524C13.5122 9.13619 13.4428 9.08929 13.3664 9.05728C13.2899 9.02527 13.2079 9.00879 13.125 9.00879C13.0421 9.00879 12.9601 9.02527 12.8836 9.05728C12.8072 9.08929 12.7378 9.13619 12.6797 9.19524L9.19531 12.6796C9.13716 12.7387 9.06784 12.7856 8.99139 12.8176C8.91494 12.8496 8.83288 12.8661 8.75 12.8661C8.66712 12.8661 8.58506 12.8496 8.50861 12.8176C8.43216 12.7856 8.36284 12.7387 8.30469 12.6796L6.69531 11.0702C6.63716 11.0112 6.56784 10.9643 6.49139 10.9323C6.41494 10.9003 6.33288 10.8838 6.25 10.8838C6.16712 10.8838 6.08506 10.9003 6.00861 10.9323C5.93216 10.9643 5.86284 11.0112 5.80469 11.0702L3.125 13.7499" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.8125 8.125C8.33027 8.125 8.75 7.70527 8.75 7.1875C8.75 6.66973 8.33027 6.25 7.8125 6.25C7.29473 6.25 6.875 6.66973 6.875 7.1875C6.875 7.70527 7.29473 8.125 7.8125 8.125Z" fill="black"/>
      </svg>
      `,
    },
    config: {
      endpoints: {
        byFile: `${process.env.REACT_APP_API_URL}/uploads/editor/image`, // Your backend file uploader endpoint
      },
    },
  },
  video: {
    class: ImageTool,
    toolbox: {
      title: "Video",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8203 9.46904L6.57812 2.59404C6.48349 2.53566 6.37499 2.50359 6.26382 2.50113C6.15265 2.49867 6.04284 2.52591 5.94571 2.58005C5.84859 2.63419 5.76766 2.71326 5.71128 2.8091C5.65491 2.90494 5.62512 3.01409 5.625 3.12529V16.8753C5.62512 16.9865 5.65491 17.0956 5.71128 17.1915C5.76766 17.2873 5.84859 17.3664 5.94571 17.4205C6.04284 17.4747 6.15265 17.5019 6.26382 17.4994C6.37499 17.497 6.48349 17.4649 6.57812 17.4065L17.8203 10.5315C17.9126 10.4769 17.9891 10.3992 18.0423 10.3061C18.0954 10.2129 18.1233 10.1075 18.1233 10.0003C18.1233 9.89304 18.0954 9.78765 18.0423 9.69449C17.9891 9.60133 17.9126 9.52363 17.8203 9.46904V9.46904Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
    config: {
      field: "video",
      types: "video/*",
      buttonContent: `<svg class="video"></svg> Select a Video`,
      endpoints: {
        byFile: `${process.env.REACT_APP_API_URL}/uploads/editor/video`, // Your backend file uploader endpoint
      },
    },
  },
  linkTool: {
    class: LinkTool,
    toolbox: {
      title: "Bookmark",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 17.5L10 14.375L5 17.5V3.75C5 3.58424 5.06585 3.42527 5.18306 3.30806C5.30027 3.19085 5.45924 3.125 5.625 3.125H14.375C14.5408 3.125 14.6997 3.19085 14.8169 3.30806C14.9342 3.42527 15 3.58424 15 3.75V17.5Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
    config: {
      endpoint: `${process.env.REACT_APP_API_URL}/uploads/link`,
    },
  },
  attaches: {
    class: AttachesTool,
    toolbox: {
      title: "File",
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.625 17.5H4.375C4.20924 17.5 4.05027 17.4342 3.93306 17.3169C3.81585 17.1997 3.75 17.0408 3.75 16.875V3.125C3.75 2.95924 3.81585 2.80027 3.93306 2.68306C4.05027 2.56585 4.20924 2.5 4.375 2.5H11.875L16.25 6.875V16.875C16.25 17.0408 16.1842 17.1997 16.0669 17.3169C15.9497 17.4342 15.7908 17.5 15.625 17.5Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.875 2.5V6.875H16.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
    config: {
      uploader: {
        uploadByFile(file: File) {
          // return uploadFile(file).then((response) => {
          //   return {
          //     success: 1,
          //     file: {
          //       url: response.location,
          //       size: response.size,
          //       title: response.originalname,
          //       fileName: response.originalname,
          //       contentType: response.contentType,
          //       mimetype: response.mimetype,
          //       extension: (response.contentType || response.mimetype).split(
          //         "/",
          //       )[1],
          //     },
          //   };
          // });
        },
      },
    },
  },
  embed: Embed,
  Color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        "#EC7878",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#0070FF",
        "#03A9F4",
        "#00BCD4",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFF",
      ],
      defaultColor: "#FF1300",
      type: "text",
      customPicker: true, // add a button to allow selecting any colour
    },
  },
  Marker: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      defaultColor: "#FFBF00",
      type: "marker",
      icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
    },
  },
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
