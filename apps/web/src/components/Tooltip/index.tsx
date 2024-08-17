'use client'

import { useState } from 'react'

const Tooltip = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      {isHovered && text && (
        <div className="absolute z-10 w-32 p-2 text-xs text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded-[6px] shadow-lg opacity-100 pointer-events-none bottom-full left-1/2">
          {text}
        </div>
      )}
    </div>
  )
}
export default Tooltip
