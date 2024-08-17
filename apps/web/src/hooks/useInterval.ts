// useInterval.js
import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay === null) return

    const timer = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(timer)
  }, [delay])
}

export default useInterval
