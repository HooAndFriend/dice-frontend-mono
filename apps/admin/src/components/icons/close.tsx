import { SVGProps } from 'react'

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        fill="#939598"
        fillRule="evenodd"
        d="M2.195 2.196c.26-.26.683-.26.943 0l18.667 18.667a.667.667 0 0 1-.943.943L2.195 3.139a.667.667 0 0 1 0-.943Z"
        clipRule="evenodd"
      />
      <path
        fill="#939598"
        fillRule="evenodd"
        d="M2.195 21.805a.667.667 0 0 1 0-.942L20.862 2.196a.667.667 0 1 1 .943.942L3.138 21.805a.667.667 0 0 1-.943 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
